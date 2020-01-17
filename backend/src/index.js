const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const routes = require('./routes');
const { setupWebSocket } = require('./websocket.js');

const app = express();

const server = http.Server(app);
setupWebSocket(server);

const dbString = `<INSIRA A LINHA DO BANCO AQUI>`;

if (dbString.startsWith('<')){
  let redStr = "\x1b[31m";
  console.error(redStr + "ERRO! Você não configurou o MongoDB ainda!");
  console.error(redStr + "Adicione o Cluster padrão, o Usuário do banco e adicione a linha de conexão em 'Clusters > Connect > Connect Your Application' no arquivo index.js!");
  return;
}

mongoose.connect(dbString,  {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
      useCreateIndex: true
    });

app.use(cors());
app.use(express.json());
app.use('/api', routes);
server.listen(3333);