//Importando o express
const express = require('express');
//Router para controlar as rotas
const router = express.Router();

//Importando o TaskController para importar as funções CRUD
const TaskController = require('../controller/TaskController');
const TaskValidation = require('../middlewares/TaskValidation');

//Rota de criação de uma nova Task C
router.post('/', TaskValidation, TaskController.create);
//Rotas de exibição de todas as Tasks R
router.get('/filter/all/:macaddress', TaskController.all);
//Rotas de exibição de única Task R
router.get('/:id', TaskController.show);
//Rotas de exibição de todas as Tasks atrasadas R
router.get('/filter/late/:macaddress', TaskController.late);
//Rotas de exibição de todas as Tasks do dia corrente R
router.get('/filter/today/:macaddress', TaskController.today);
//Rotas de exibição de todas as Tasks da semana corrente R
router.get('/filter/week/:macaddress', TaskController.week);
//Rotas de exibição de todas as Tasks do mês corrente R
router.get('/filter/month/:macaddress', TaskController.month);
//Rotas de exibição de todas as Tasks do ano corrente R
router.get('/filter/year/:macaddress', TaskController.year);
//Rota de alteração de uma nova Task U
router.put('/:id', TaskValidation, TaskController.update);
//Rota de alteração de status de um Tarefa U
router.put('/:id/:done', TaskController.done);
//Rota de exclusão de uma determinada Task D
router.delete('/:id', TaskController.delete);

module.exports = router;
