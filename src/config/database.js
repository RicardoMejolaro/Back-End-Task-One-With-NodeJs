const mongoose = require('mongoose');

//Conectando com o banco de dados
const url = 'mongodb://localhost:27017/todo';
mongoose.connect(url);

//Exportando a conexão
module.exports = mongoose;