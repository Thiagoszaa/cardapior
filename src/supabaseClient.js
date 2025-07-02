import { createClient } from '@supabase/supabase-js'



const supabaseUrl = 'https://xwmgjuyuadzpzhpkhsca.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Variáveis de ambiente não encontradas:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  })
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseKey)