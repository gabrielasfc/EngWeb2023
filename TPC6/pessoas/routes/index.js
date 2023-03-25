var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')

/* GET home page. */
router.get('/people', function(req, res) {
  Person.list()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(520).json({err: err, msg: "Error obtaining persons list."}))
})

router.get('/people/:id', (req, res) => {
  Person.getPerson(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(521).json({err: err, msg: "Error obtaining person."}))
})

router.post('/people', (req, res) => {
  Person.addPerson(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(522).json({err: err, msg: "Error inserting person."}))
})

router.put('/people/:id', (req, res) => {
  Person.updatePerson(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(523).json({err: err, msg: "Error updating person."}))
})

router.delete('/people/:id', (req, res) => {
  Person.deletePerson(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(524).json({err: err, msg: "Error deleting person."}))
})

module.exports = router;
