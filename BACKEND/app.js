const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const pedidosRouter = require("./routes/Route_Pedidos");
const formularioRouter = require("./routes/Route_Formulario");
const menuRouter = require("./routes/Route_Menu");

// Middleware padrão
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Rotas da API
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/pedidos", pedidosRouter);
app.use("/formulario", formularioRouter);
app.use("/menu", menuRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

app.use((err, req, res, next) => {
  console.error("Erro:", err);

  res.status(err.status || 500).json({
    mensagem: err.message || "Erro interno no servidor",
  });
});

module.exports = app;
