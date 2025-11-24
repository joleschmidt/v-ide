export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          byot_accepted: boolean | null
          byot_required: boolean | null
          check_in_date: string
          check_out_date: string
          created_at: string | null
          exact_coordinates_revealed: boolean | null
          id: string
          incident_details: string | null
          incident_reported: boolean | null
          landowner_id: string
          landowner_payout: number
          landowner_rating: number | null
          leave_no_trace_accepted: boolean | null
          liability_accepted: boolean | null
          operator_id: string
          operator_rating: number | null
          platform_fee: number
          sector_id: string
          status: string
          stripe_payment_intent_id: string | null
          total_amount: number
          updated_at: string | null
          waiver_ip_address: unknown
          waiver_signed_at: string | null
        }
        Insert: {
          byot_accepted?: boolean | null
          byot_required?: boolean | null
          check_in_date: string
          check_out_date: string
          created_at?: string | null
          exact_coordinates_revealed?: boolean | null
          id?: string
          incident_details?: string | null
          incident_reported?: boolean | null
          landowner_id: string
          landowner_payout: number
          landowner_rating?: number | null
          leave_no_trace_accepted?: boolean | null
          liability_accepted?: boolean | null
          operator_id: string
          operator_rating?: number | null
          platform_fee: number
          sector_id: string
          status?: string
          stripe_payment_intent_id?: string | null
          total_amount: number
          updated_at?: string | null
          waiver_ip_address?: unknown
          waiver_signed_at?: string | null
        }
        Update: {
          byot_accepted?: boolean | null
          byot_required?: boolean | null
          check_in_date?: string
          check_out_date?: string
          created_at?: string | null
          exact_coordinates_revealed?: boolean | null
          id?: string
          incident_details?: string | null
          incident_reported?: boolean | null
          landowner_id?: string
          landowner_payout?: number
          landowner_rating?: number | null
          leave_no_trace_accepted?: boolean | null
          liability_accepted?: boolean | null
          operator_id?: string
          operator_rating?: number | null
          platform_fee?: number
          sector_id?: string
          status?: string
          stripe_payment_intent_id?: string | null
          total_amount?: number
          updated_at?: string | null
          waiver_ip_address?: unknown
          waiver_signed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_landowner_id_fkey"
            columns: ["landowner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      incidents: {
        Row: {
          booking_id: string
          created_at: string | null
          description: string
          id: string
          reported_by: string
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          description: string
          id?: string
          reported_by: string
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          description?: string
          id?: string
          reported_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "incidents_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidents_reported_by_fkey"
            columns: ["reported_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reputation_badges: {
        Row: {
          badge_description: string | null
          badge_name: string
          badge_type: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_description?: string | null
          badge_name: string
          badge_type: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_description?: string | null
          badge_name?: string
          badge_type?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reputation_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          blocked_dates: string[] | null
          byot_mandatory: boolean | null
          created_at: string | null
          description: string
          exact_lat: number
          exact_lng: number
          fire_permission: string
          fuzzy_lat: number
          fuzzy_lng: number
          fuzzy_radius_km: number | null
          has_toilet: boolean | null
          id: string
          images: string[] | null
          is_active: boolean | null
          landowner_id: string
          max_operators: number | null
          name: string
          price_per_night: number
          updated_at: string | null
          water_availability: string
          wilderness_level: number
        }
        Insert: {
          blocked_dates?: string[] | null
          byot_mandatory?: boolean | null
          created_at?: string | null
          description: string
          exact_lat: number
          exact_lng: number
          fire_permission: string
          fuzzy_lat: number
          fuzzy_lng: number
          fuzzy_radius_km?: number | null
          has_toilet?: boolean | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          landowner_id: string
          max_operators?: number | null
          name: string
          price_per_night: number
          updated_at?: string | null
          water_availability: string
          wilderness_level: number
        }
        Update: {
          blocked_dates?: string[] | null
          byot_mandatory?: boolean | null
          created_at?: string | null
          description?: string
          exact_lat?: number
          exact_lng?: number
          fire_permission?: string
          fuzzy_lat?: number
          fuzzy_lng?: number
          fuzzy_radius_km?: number | null
          has_toilet?: boolean | null
          id?: string
          images?: string[] | null
          is_active?: boolean | null
          landowner_id?: string
          max_operators?: number | null
          name?: string
          price_per_night?: number
          updated_at?: string | null
          water_availability?: string
          wilderness_level?: number
        }
        Relationships: [
          {
            foreignKeyName: "sectors_landowner_id_fkey"
            columns: ["landowner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          completed_trips: number | null
          created_at: string | null
          display_name: string
          email: string
          id: string
          is_banned: boolean | null
          is_verified: boolean | null
          last_login_at: string | null
          reputation_score: number | null
          role: string
          total_earnings: number | null
          total_sectors: number | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          completed_trips?: number | null
          created_at?: string | null
          display_name: string
          email: string
          id?: string
          is_banned?: boolean | null
          is_verified?: boolean | null
          last_login_at?: string | null
          reputation_score?: number | null
          role?: string
          total_earnings?: number | null
          total_sectors?: number | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          completed_trips?: number | null
          created_at?: string | null
          display_name?: string
          email?: string
          id?: string
          is_banned?: boolean | null
          is_verified?: boolean | null
          last_login_at?: string | null
          reputation_score?: number | null
          role?: string
          total_earnings?: number | null
          total_sectors?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
  | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
  ? R
  : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
    DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
    DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R
    }
  ? R
  : never
  : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Insert: infer I
  }
  ? I
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Insert: infer I
  }
  ? I
  : never
  : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
  | keyof DefaultSchema["Tables"]
  | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
    Update: infer U
  }
  ? U
  : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
    Update: infer U
  }
  ? U
  : never
  : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
  | keyof DefaultSchema["Enums"]
  | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
  | keyof DefaultSchema["CompositeTypes"]
  | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
  ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
