import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xwmgjuyuadzpzhpkhsca.supabase.co' // Substitua pelo seu URL
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey)
