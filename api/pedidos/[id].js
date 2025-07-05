import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const { data, error } = await supabase
      .from("pedidos")
      .update(req.body)
      .eq("id", id)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    return res.status(200).json(data[0]);
  }

  return res.status(405).json({ message: "Método não permitido" });
}
