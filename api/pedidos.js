import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REAL_SUPABASE_URL,
  process.env.REAL_SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const pedido = {
        ...req.body,
        status: "Em preparo",
      };

      const { data, error } = await supabase.from("pedidos").insert([pedido]);

      if (error) {
        console.error("❌ Erro ao inserir no Supabase:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(201).json(data[0]);
    }

    if (req.method === "GET") {
      const { data, error } = await supabase.from("pedidos").select("*");

      if (error) {
        console.error("❌ Erro ao buscar pedidos:", error);
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json(data);
    }

    return res.status(405).json({ message: "Método não permitido" });

  } catch (err) {
    console.error("💥 Erro inesperado:", err);
    return res.status(500).json({ error: "Erro interno no servidor", details: err.message });
  }
}
