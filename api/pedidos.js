let pedidos = [];
let idAtual = 1;

export default function handler(req, res) {
  if (req.method === "GET") {
    // Listar todos os pedidos
    res.status(200).json(pedidos);
  } else if (req.method === "POST") {
    // Criar um novo pedido
    const novoPedido = { id: idAtual++, status: "Em preparo", ...req.body };
    pedidos.push(novoPedido);
    res.status(201).json(novoPedido);
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
}