import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://oetureonznkfcumdmact.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldHVyZW9uem5rZmN1bWRtYWN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0NTgyODUsImV4cCI6MjA3NTAzNDI4NX0.VFWkkGOXp_Anrqa_I1p4h8BZ3b4IvO9AxeCCBfX76z8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
