let pedidos = [];
let idAtual = 1;

// Compartilhar estado entre chamadas (em memória)
globalThis._pedidos ||= { pedidos, idAtual };
pedidos = globalThis._pedidos.pedidos;
idAtual = globalThis._pedidos.idAtual;

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const index = pedidos.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }

    pedidos[index] = { ...pedidos[index], ...req.body };
    return res.status(200).json(pedidos[index]);
  }

  res.status(405).json({ message: "Método não permitido" });
}
