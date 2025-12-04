const express = require("express");
const app = express();

app.use(express.json());

const pedidosRoutes = require("./routes/Route_Pedidos");
const formularioRoutes = require("./routes/Route_Formulario");
const menuRoutes = require("./routes/Route_Menu");
const inicialRoutes = require("./routes/Route_Inicial");

app.use("/pedidos", pedidosRoutes);
app.use("/formulario", formularioRoutes);
app.use("/menu", menuRoutes);
app.use("/inicial", inicialRoutes);

module.exports = app;
