
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'

// Carrega as variáveis de ambiente
dotenv.config()

const supabaseUrl = 'https://xwmgjuyuadzpzhpkhsca.supabase.co'
const supabaseKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Variáveis de ambiente não encontradas:', {
    url: !!supabaseUrl,
    key: !!supabaseKey
  })
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseKey)