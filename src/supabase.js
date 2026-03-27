import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fbscpdfywjlgzhtxxagm.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZic2NwZGZ5d2psZ3podHh4YWdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1Nzk3NDMsImV4cCI6MjA5MDE1NTc0M30.BHy5BESS0DXmkPUf2X1tzC5QDSU_rlgS8XlvrBcTQ2I'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
