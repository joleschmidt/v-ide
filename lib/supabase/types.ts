// Placeholder for Supabase generated types
// Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > lib/supabase/types.ts

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          role: 'OPERATOR' | 'LANDOWNER' | 'BOTH';
          display_name: string;
          avatar_url: string | null;
          bio: string | null;
          reputation_score: number;
          completed_trips: number;
          total_sectors: number | null;
          total_earnings: number | null;
          is_verified: boolean;
          is_banned: boolean;
          created_at: string;
          last_login_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      sectors: {
        Row: {
          id: string;
          landowner_id: string;
          name: string;
          description: string;
          images: string[];
          exact_lat: number;
          exact_lng: number;
          fuzzy_lat: number;
          fuzzy_lng: number;
          fuzzy_radius_km: number;
          wilderness_level: number;
          fire_permission: 'NO_FIRE' | 'GAS_ONLY' | 'FIRE_BOWL' | 'OPEN_FIRE';
          water_availability: 'NONE' | 'NATURAL_SOURCE' | 'PROVIDED';
          has_toilet: boolean;
          byot_mandatory: boolean;
          max_operators: number;
          is_active: boolean;
          blocked_dates: string[];
          price_per_night: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['sectors']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['sectors']['Insert']>;
      };
      bookings: {
        Row: {
          id: string;
          operator_id: string;
          landowner_id: string;
          sector_id: string;
          check_in_date: string;
          check_out_date: string;
          waiver_signed_at: string | null;
          waiver_ip_address: string | null;
          liability_accepted: boolean;
          leave_no_trace_accepted: boolean;
          byot_accepted: boolean;
          byot_required: boolean;
          total_amount: number;
          platform_fee: number;
          landowner_payout: number;
          stripe_payment_intent_id: string | null;
          status: 'PENDING_WAIVER' | 'PENDING_PAYMENT' | 'CONFIRMED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
          exact_coordinates_revealed: boolean;
          operator_rating: number | null;
          landowner_rating: number | null;
          incident_reported: boolean;
          incident_details: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bookings']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
    };
  };
};

