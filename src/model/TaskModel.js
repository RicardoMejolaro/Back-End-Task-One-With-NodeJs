//Importnado a conexão com o banco de dados
const mongoose = require('../config/database');
const Schema = mongoose.Schema;
 
//Criando o Schema "tabela do banco e determinados dados"   
const TaskSchema = new Schema({
  macaddress: {type: String, required: true},
  type: {type: Number, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  when: {type: Date, required: true},
  done: {type: Boolean, default: false},
  created: {type: Date, default: Date.now()}
});

//Exportando o modelo de "tabela"
module.exports = mongoose.model('Task', TaskSchema);
