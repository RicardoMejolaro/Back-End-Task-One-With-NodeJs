//Importando os campos do model
const TaskModel = require('../model/TaskModel');
//Importando o Date fns "isPast" para validar datas passadas
const { isPast } = require('date-fns');

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress) 
  //Validando se os campos obrigatórios estão preenchidos
    return res.status(400).json({ error: 'Macadress é obrigatório!'});
  else if (!type)
    return res.status(400).json({ error: 'Tipo é obrigatório!'});
  else if (!title)
    return res.status(400).json({ error: 'Título é obrigatório!'});
  else if (!description)
    return res.status(400).json({ error: 'Descrição é obrigatória!'});
  else if (!when)
    return res.status(400).json({ error: 'Data e/ou hora são obrigatórios!'});
  //Validando se a data e hora informada pelo usuário é passado 
  else if (isPast(new Date(when)))
    return res.status(400).json({ error: 'Escolha uma data e hora futura!'});
  else {
    let exists;
    /*Validação de update de tarefas no mesmo dia e horário para o mesmo dispositivo, e id
    o que não pode ocorrer, assim verifica pelo id e substitui se for o caso */
    if (req.params.id) {
      exists = await TaskModel.
                    findOne(
                      {
                        '_id': { '$ne': req.params.id },
                        'when': { '$eq': new Date(when) },
                        'macaddress': { '$in': macaddress }
                      });      
    } else {
    /*Validação de cadastro de tarefas no mesmo dia e horário para o mesmo dispositivo,
    o que não pode ocorrer*/
      exists = await TaskModel.
                    findOne(
                      {
                        'when': {'$eq': new Date(when)},
                        'macaddress': {'$in': macaddress}
                      });      
    }
    if (exists) {
      return res.status(400).json({ error: 'Já existe uma tarefa neste dia e horário!'});
    }
    next();
  }  
}

module.exports = TaskValidation;