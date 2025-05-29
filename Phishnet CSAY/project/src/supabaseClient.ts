import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofioguseharqdtsjxatb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9maW9ndXNlaGFycWR0c2p4YXRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTMwMDYsImV4cCI6MjA2MDgyOTAwNn0.b8SnBOhAJ1kObxrdWdoSkosljQqNGCTnXBeKCCr6ab0';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
