//Importando o modelo de tabelas
const TaskModel = require('../model/TaskModel');
//Importando o Fns para decobrir a primeira e última hora do dia
const {
  startOfDay,
  endOfDay, 
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear} = require('date-fns');

const current = new Date();

class TaskController {
  //Função de criação de dados no banco de dados
  async create(req, res) {
    //Resgatando do corpo da requisição e tranformando no modelo de dados
    const task = new TaskModel(req.body);
    await task
          .save()
          .then(response => {
            return res.status(200).json(response);
          })
          .catch(error => {
            return res.status(500).json(error);
          });
  }
  //Função de atualização de dados por id da tarefa no banco de dados
  async update(req, res) {
    await TaskModel.findByIdAndUpdate({'_id': req.params.id}, req.body, {new: true})
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }
  //Função de exibição de todos os dados do usuário por seu respectivo dispositivo
  async all(req, res) {
    await TaskModel.find({ macaddress: { '$in': req.params.macaddress }})
      .sort('when')
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }
  //Função de exibição de uma task específica id
  async show(req, res) {
    await TaskModel.findById(req.params.id)
    .then(response => {
      if (response)
        return res.status(200).json(response); 
      else
        return res.status(404).json({ error: 'Tarefa não localizada!'}); 
    })
    .catch(error => {
      return res.status(500).json(error)
    });
  }
  //Função de remoção de uma task específica id
  async delete(req, res) {
    await TaskModel.deleteOne({ '_id':  req.params.id})
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }
  //Função de atualização de status de uma task específica id
  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      {'_id': req.params.id},
      {'done': req.params.done},
      {new: true})
      .then(response => {
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }
  //Função de exibição de tasks atrasadas do usuário por seu respectivo dispositivo
  async late(req, res) {
    await TaskModel.find({
      'when': {'$lt': current},
      'macaddress': {'$in': req.params.macaddress}
    })
    .sort('when')
    .then(response => {
       return res.status(200).json(response);
    })
    .catch(error => {
       return res.status(500).json(error);
     });
  }
  //Função de exibição de tasks atrasadas do usuário por seu respectivo dispositivo
  async today(req, res) {
    await TaskModel.find({
      'macaddress': {'$in': req.params.macaddress},
      'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)}
    })
    .sort('when')
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }
  //Função de exibição de tasks por semana do usuário por seu respectivo dispositivo
  async week(req, res) {
    await TaskModel.find({
      'macaddress': {'$in': req.params.macaddress},
      'when': {'$gte': startOfWeek(current), '$lte': endOfWeek(current)}
    })
    .sort('when')
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }
  //Função de exibição de tasks por mês do usuário por seu respectivo dispositivo
  async month(req, res) {
    await TaskModel.find({
      'macaddress': {'$in': req.params.macaddress},
      'when': {'$gte': startOfMonth(current), '$lte': endOfMonth(current)}
    })
    .sort('when')
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }
  //Função de exibição de tasks por ano do usuário por seu respectivo dispositivo
  async year(req, res) {
    await TaskModel.find({
      'macaddress': {'$in': req.params.macaddress},
      'when': {'$gte': startOfYear(current), '$lte': endOfYear(current)}
    })
    .sort('when')
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    });
  }

}

module.exports = new TaskController();