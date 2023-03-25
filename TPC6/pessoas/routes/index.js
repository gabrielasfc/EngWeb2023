var express = require('express');
var router = express.Router();
var Person = require('../controllers/person')

/* GET home page. */
router.get('/persons', function(req, res) {
  Person.list()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(520).json({err: err, msg: "Error obtaining persons list."}))
})

router.get('/persons/:id', (req, res) => {
  Person.getPerson(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(521).json({err: err, msg: "Error obtaining person."}))
})

router.post('/persons', (req, res) => {
  Person.addPerson(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(522).json({err: err, msg: "Error inserting person."}))
})

router.put('/persons/:id', (req, res) => {
  Person.updatePerson(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(523).json({err: err, msg: "Error updating person."}))
})

router.delete('/persons/:id', (req, res) => {
  Person.deletePerson(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(524).json({err: err, msg: "Error deleting person."}))
})

module.exports = router;
