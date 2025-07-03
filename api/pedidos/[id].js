let pedidos = [];
let idAtual = 1;

// Compartilhar estado entre chamadas (temporário em dev)
globalThis._pedidos ||= { pedidos, idAtual };
pedidos = globalThis._pedidos.pedidos;
idAtual = globalThis._pedidos.idAtual;

export default function handler(req, res) {
  const id = parseInt(req.query.id);

  if (req.method === "POST") {
    const { itens, mesa, observacoes, valorTotal, timestamp, cliente } = req.body;

    // Proteção contra dados inválidos
    if (!Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ error: "Itens do pedido inválidos ou vazios" });
    }

    const novoPedido = {
      id: idAtual++,
      itens,
      mesa,
      observacoes,
      valorTotal,
      timestamp,
      cliente,
      status: "Em preparo",
    };

    pedidos.push(novoPedido);
    return res.status(201).json({ message: "Pedido criado com sucesso", pedido: novoPedido });
  }

  else if (req.method === "PUT") {
    const index = pedidos.findIndex((p) => p.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    pedidos[index] = { ...pedidos[index], ...req.body };
    return res.status(200).json(pedidos[index]);
  }

  else if (req.method === "GET") {
    return res.status(200).json(pedidos);
  }

  else {
    return res.status(405).json({ message: "Método não permitido" });
  }
}
