import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  
  // First try to get session to refresh it
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Then get user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("Auth error in GET /api/saved-sectors:", {
      hasSession: !!session,
      hasUser: !!user,
      userError: userError?.message,
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("saved_sectors")
    .select("sector_id")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const savedSectorIds = data?.map((item) => item.sector_id) || [];
  return NextResponse.json({ savedSectorIds });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  
  // First try to get session to refresh it
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Then get user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("Auth error in POST /api/saved-sectors:", {
      hasSession: !!session,
      hasUser: !!user,
      userError: userError?.message,
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sectorId } = body;

  if (!sectorId) {
    return NextResponse.json({ error: "Sector ID required" }, { status: 400 });
  }

  // Verify sector exists
  const { data: sectorExists } = await supabase
    .from("sectors")
    .select("id")
    .eq("id", sectorId)
    .single();

  if (!sectorExists) {
    return NextResponse.json(
      { error: "Sector not found" },
      { status: 404 }
    );
  }

  const { data, error } = await supabase
    .from("saved_sectors")
    .insert({
      user_id: user.id,
      sector_id: sectorId,
    })
    .select()
    .single();

  if (error) {
    // If already saved (unique constraint violation), return success
    if (error.code === "23505") {
      // Fetch the existing record
      const { data: existing } = await supabase
        .from("saved_sectors")
        .select()
        .eq("user_id", user.id)
        .eq("sector_id", sectorId)
        .single();
      return NextResponse.json({ success: true, data: existing });
    }
    
    // Table doesn't exist - migration not run
    if (error.code === "42P01") {
      console.error("Table 'saved_sectors' does not exist. Please run migration 003_saved_sectors.sql");
      return NextResponse.json(
      { error: "Database migration required. Please contact support." },
      { status: 500 }
    );
    }
    
    // Foreign key violation - sector doesn't exist
    if (error.code === "23503") {
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404 }
      );
    }
    
    console.error("Error saving sector:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      sectorId,
      userId: user.id,
    });
    return NextResponse.json(
      { error: error.message || "Failed to save sector" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, data });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  
  // First try to get session to refresh it
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  // Then get user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    console.error("Auth error in DELETE /api/saved-sectors:", {
      hasSession: !!session,
      hasUser: !!user,
      userError: userError?.message,
    });
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const sectorId = searchParams.get("sectorId");

  if (!sectorId) {
    return NextResponse.json({ error: "Sector ID required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("saved_sectors")
    .delete()
    .eq("user_id", user.id)
    .eq("sector_id", sectorId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

