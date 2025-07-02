// pages/api/pedidos.js
import { createClient } from "@supabase/supabase-js";

// Criar cliente com chave secreta do Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const pedido = req.body;

    const { data, error } = await supabase.from("pedidos").insert([pedido]);

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ data });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("pedidos").select("*");

    if (error) {
      console.error("Erro ao buscar pedidos:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  res.status(405).json({ error: "Método não permitido" });
}
