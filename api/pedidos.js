let pedidos = [];
let idAtual = 1;

export default function handler(req, res) {
  if (req.method === "GET") {
    // Retorna todos pedidos
    res.status(200).json(pedidos);
  } 
  else if (req.method === "POST") {
    // Cria novo pedido
    const pedido = { id: idAtual++, status: "Em preparo", ...req.body };
    pedidos.push(pedido);
    res.status(201).json(pedido);
  } 
  else if (req.method === "PUT") {
    // Atualiza um pedido (id e dados no body)
    const { id, ...dados } = req.body;
    const index = pedidos.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ error: "Pedido não encontrado" });
      return;
    }

    pedidos[index] = { ...pedidos[index], ...dados };
    res.status(200).json(pedidos[index]);
  } 
  else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
