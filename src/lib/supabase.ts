import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ultxcflwihcuyftabcvs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsdHhjZmx3aWhjdXlmdGFiY3ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNzc5NzcsImV4cCI6MjEwMTk1Mzk3N30.cbDJz0gM5Miw6db777m1dqU-_GMxPl8gG6dh-TNujM0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
