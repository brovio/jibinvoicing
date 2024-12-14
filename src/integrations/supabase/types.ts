export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "brovio-clients": {
        Row: {
          address: string | null
          clientid: number
          company: string
          contact_name: string
          created_at: string
          currency: string | null
          email: string
          notes: string | null
          phone: string | null
          rate: number | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          clientid?: number
          company: string
          contact_name: string
          created_at?: string
          currency?: string | null
          email: string
          notes?: string | null
          phone?: string | null
          rate?: number | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          clientid?: number
          company?: string
          contact_name?: string
          created_at?: string
          currency?: string | null
          email?: string
          notes?: string | null
          phone?: string | null
          rate?: number | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      "brovio-timesheets": {
        Row: {
          break: boolean | null
          break_type: string | null
          client: string
          date: string
          entry_type: string | null
          flag_reason: string | null
          hours: number
          project: string
          staff_name: string | null
          status: string | null
          task: string
          time: string | null
          tsid: number
        }
        Insert: {
          break?: boolean | null
          break_type?: string | null
          client: string
          date: string
          entry_type?: string | null
          flag_reason?: string | null
          hours: number
          project: string
          staff_name?: string | null
          status?: string | null
          task: string
          time?: string | null
          tsid?: number
        }
        Update: {
          break?: boolean | null
          break_type?: string | null
          client?: string
          date?: string
          entry_type?: string | null
          flag_reason?: string | null
          hours?: number
          project?: string
          staff_name?: string | null
          status?: string | null
          task?: string
          time?: string | null
          tsid?: number
        }
        Relationships: []
      }
      imported_timesheets: {
        Row: {
          activity: string | null
          client: string
          created_at: string | null
          date: string
          duration: string
          flag_reason: string | null
          flagged: boolean | null
          full_name: string
          notes: string | null
          time: string | null
          timesheet_id: number
          updated_at: string | null
        }
        Insert: {
          activity?: string | null
          client: string
          created_at?: string | null
          date: string
          duration: string
          flag_reason?: string | null
          flagged?: boolean | null
          full_name: string
          notes?: string | null
          time?: string | null
          timesheet_id?: number
          updated_at?: string | null
        }
        Update: {
          activity?: string | null
          client?: string
          created_at?: string | null
          date?: string
          duration?: string
          flag_reason?: string | null
          flagged?: boolean | null
          full_name?: string
          notes?: string | null
          time?: string | null
          timesheet_id?: number
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

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
