import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://iispxvwyhnoulauvpotu.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlpc3B4dnd5aG5vdWxhdXZwb3R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2Mzk2MjgsImV4cCI6MjA4NjIxNTYyOH0.xaLf9LEUzAUPxUSvzR-p7Z57cp5YMf1uC1NwQiWRd2M";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;