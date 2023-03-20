var express = require('express');
var router = express.Router();
var Task = require("../controllers/task")

router.get('/', (req, res, next) =>{
  var date = new Date().toISOString().substring(0,16)
  
  Task.getTasks()
    .then(tasks => {
      res.render("tasks", {tasks: tasks, to_edit: null, d: date})
    })
    .catch(err => {
      res.render("error", {error: err, message: "Erro na obtenção da lista de tarefas!"})
    })
})

router.get('/edit/:id', (req, res, next) => {
  var date = new Date().toISOString().substring(0,16)

  Task.getTasks()
    .then(tasks => {
      Task.getTask(req.params.id)
        .then(task => {
          res.render("tasks", {tasks: tasks, to_edit: task, d: date})
        })
        .catch(err => {
          res.render("error", {error: err, message: "Erro na obtenção da tarefa a editar!"})
        })
    })
    .catch(err => {
      res.render("error", {error: err, message: "Erro na obtenção da lista de tarefas!"})
    })
})

router.get('/done/:id', (req, res, next) => {
  var date = new Date().toISOString().substring(0,16)

  Task.getTask(req.params.id)
    .then(task => {
      task.done = "true"

      Task.updateTask(task)
        .then(task => {
         res.redirect("/")
        })
        .catch(err => {
          res.render("error", {error: err, message: "Erro a marcar a tarefa como concluída!"})
        })
    })
    .catch(err => {
      res.render("error", {error: err, message: "Erro na obtenção da tarefa a marcar como concluída!"})
    })
})

router.get('/delete/:id', (req, res, next) => {
  var date = new Date().toISOString().substring(0,16)

  Task.deleteTask(req.params.id)
    .then(task => {
      res.redirect("/")
    })
    .catch(err => {
      res.render("error", {error: err, message: "Erro na remoção da tarefa!"})
    })
})

router.post('/insert', (req, res, next) => {
  var date = new Date().toISOString().substring(0,16)

  Task.addTask(req.body)
    .then(task => {
      res.redirect("/")
    })
    .catch(err => {
      res.render("error", {error: err, message: "Erro na inserção da tarefa!"})
    })
})

router.post('/edit', (req, res, next) => {
  var date = new Date().toISOString().substring(0,16)

  Task.updateTask(req.body)
    .then(task => {
      res.redirect("/")
    })
    .catch(err => {
      res.render("error", {error: err, message: "Erro na atualização da tarefa!"})
    })
})

module.exports = router;
