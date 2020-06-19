const express = require('express');
//importando o cors para deixar a api disponível para frontend e terceiros
const cors = require('cors');
//inicializar o servidor
const server = express();
server.use(cors());
//Informando o servidor que os dados serão em formato Json
server.use(express.json());



//Importando as Rotas
const TaskRoutes = require('../src/routes/TaskRoutes');
//Injetando o arquivo de rotas na API
server.use('/task', TaskRoutes);

server.listen(3001, () => {
  console.log("Api online");
});