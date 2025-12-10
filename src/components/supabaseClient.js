import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://fsqiamrehzppifjahhdl.supabase.co' 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzcWlhbXJlaHpwcGlmamFoaGRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxODE2MDAsImV4cCI6MjA3OTc1NzYwMH0.sJ0ph7YNUp64qsZl0PLKQFPs7dUc8Xx_A4S_sp6odH4'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Key is missing!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)