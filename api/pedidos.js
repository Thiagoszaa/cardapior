import { createClient } from "@supabase/supabase-js";

// Cria cliente Supabase com variáveis de ambiente (configure na Vercel!)
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_SERVICE_ROLE_KEY,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const pedido = {
      ...req.body,
      status: "Em preparo", // você pode armazenar o status no banco
    };

    // Tenta inserir no Supabase
    const { data, error } = await supabase.from("pedidos").insert([pedido]);

    if (error) {
      console.error("Erro ao inserir pedido no Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data[0]); // retorna o primeiro inserido
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("pedidos").select("*");

    if (error) {
      console.error("Erro ao buscar pedidos:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  return res.status(405).json({ message: "Método não permitido" });
}
