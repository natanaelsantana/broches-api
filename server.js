const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectando ao banco de dados
mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado ao banco de dados MongoDB');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados', err);
  });

// Configurando as rotas
const brochesRouter = require('./routes/broches');
app.use('/api/broches', brochesRouter);

// Iniciando o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
