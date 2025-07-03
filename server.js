const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

let pedidos = [];
let idAtual = 1;

// Listar todos os pedidos
app.get("/pedidos", (req, res) => {
  res.json(pedidos);
});

// Criar um novo pedido
app.post("/pedidos", (req, res) => {
  const pedido = { id: idAtual++, status: "Em preparo", ...req.body };
  pedidos.push(pedido);
  res.status(201).json(pedido);
});

// Atualizar o status do pedido
app.put("/pedidos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = pedidos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }

  pedidos[index] = { ...pedidos[index], ...req.body };
  res.json(pedidos[index]);
});


