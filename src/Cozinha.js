import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Chip,
  Button,
} from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled, keyframes } from "@mui/system";
import { useSearchParams } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const AnimatedListItem = styled(ListItem)(({ theme }) => ({
  animation: `${fadeIn} 0.5s ease-in-out`,
}));

const Cozinha = () => {
  const [pedidos, setPedidos] = useState([]);
  const [searchParams] = useSearchParams();
  const mesaSelecionada = searchParams.get("mesa");

  const carregarPedidos = async () => {
  try {
    const response = await fetch("/api/pedidos");
    const data = await response.json();
    setPedidos(data);
  } catch (error) {
    console.error("Erro ao carregar pedidos:", error);
  }
};


  useEffect(() => {
    carregarPedidos();
    const interval = setInterval(carregarPedidos, 5000); // Atualiza a cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const marcarComoPronto = async (id) => {
  try {
    await fetch(`/api/pedidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "Pronto" }),
    });
    carregarPedidos();
  } catch (error) {
    console.error("Erro ao marcar como pronto:", error);
  }
};




 const pedidosMesa = pedidos.filter(
  (pedido) =>
    pedido.status === "Em preparo" &&
    (!mesaSelecionada || pedido.mesa === Number(mesaSelecionada))
);


  return (
    <Box
      sx={{
        padding: "20px",
        background: "#1e1e1e",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#ffb74d" }}>
        <RestaurantIcon sx={{ verticalAlign: "middle", mr: 1 }} />
        Pedidos na Cozinha {mesaSelecionada ? `- Mesa ${mesaSelecionada}` : ""}
      </Typography>
      {pedidosMesa.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          Nenhum pedido no momento.
        </Typography>
      ) : (
        <List>
          {pedidosMesa.map((pedido) => (
            <AnimatedListItem key={pedido.id}>
              <Paper
                elevation={3}
                sx={{
                  padding: "16px",
                  width: "100%",
                  background: "#333",
                  borderRadius: "12px",
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="h6" sx={{ color: "#ffb74d" }}>
                    <LocalDiningIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Mesa {pedido.mesa}
                  </Typography>
                  <Chip
                    label={pedido.status}
                    color={pedido.status === "Em preparo" ? "warning" : "success"}
                    icon={pedido.status === "Pronto" ? <CheckCircleIcon /> : null}
                  />
                </Box>

                {/* Dados do Cliente */}
                {pedido.cliente && (
                  <Box sx={{ mt: 2, p: 2, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "8px" }}>
                    <Typography variant="subtitle2" sx={{ color: "#ffb74d", mb: 1 }}>
                      Dados do Cliente:
                    </Typography>
                    <Typography variant="body2"><strong>Nome:</strong> {pedido.cliente.nome}</Typography>
                    <Typography variant="body2"><strong>Telefone:</strong> {pedido.cliente.telefone}</Typography>
                    <Typography variant="body2"><strong>Endereço:</strong> {pedido.cliente.rua}, {pedido.cliente.numero} - {pedido.cliente.setor}</Typography>
                    {pedido.cliente.complemento && (
                      <Typography variant="body2"><strong>Complemento:</strong> {pedido.cliente.complemento}</Typography>
                    )}
                  </Box>
                )}

                {/* Itens */}
<List>
  {pedido.itens.map((item, i) => (
    <ListItem key={i} sx={{ pl: 0 }}>
      <ListItemIcon>
        <RestaurantIcon sx={{ color: "#ffb74d" }} />
      </ListItemIcon>
      <ListItemText
        primary={`${item.nome} - ${item.quantidade}x`}
        secondary={
          <>
            <div>
              Adicionais:
              {item.adicionais.length > 0 ? (
                item.adicionais.map((adicional, idx) => (
                  <div key={idx}>
                    - {adicional.nome}: R$ {adicional.preco.toFixed(2)}
                  </div>
                ))
              ) : (
                <div>- Nenhum</div>
              )}
            </div>
            <div style={{ marginTop: 4 }}>
              Total: R$ {item.precoTotal.toFixed(2)}
            </div>
          </>
        }
        primaryTypographyProps={{ sx: { color: "white" } }}
        secondaryTypographyProps={{ sx: { color: "#aaa" } }}
      />
    </ListItem>
  ))}
</List>



                {/* Total */}
                <Box sx={{ mt: 1, pt: 1, borderTop: "1px solid #555" }}>
                  <Typography variant="body1" sx={{ textAlign: "right", color: "#ffb74d" }}>
                    <strong>Total:</strong> R$ {pedido.valorTotal.toFixed(2)}
                  </Typography>
                </Box>

                {/* Observações */}
                {pedido.observacoes && (
                  <Box sx={{ mt: 1, borderTop: "1px solid #555", pt: 1 }}>
                    <Typography variant="body2" sx={{ color: "#ffb74d", fontStyle: "italic" }}>
                      <strong>Observações:</strong> {pedido.observacoes}
                    </Typography>
                  </Box>
                )}

                {/* Botão "Pronto" */}
                {pedido.status === "Em preparo" && (
                  <Box sx={{ textAlign: "right", mt: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<CheckCircleIcon />}
                      onClick={() => marcarComoPronto(pedido.id)}
                    >
                      Marcar como Pronto
                    </Button>
                  </Box>
                )}
              </Paper>
            </AnimatedListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Cozinha;