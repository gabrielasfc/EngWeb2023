var express = require('express');
var router = express.Router();
var Exame = require("../controllers/emd")

/* GET home page. */
router.get('/emds', (req, res) => {
  if (req.query.status === 'apto') {
    Exame.countAptos()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(526).json({err: err, msg: "Não consegui obter o número de aptos."}));
  }
  else{
    Exame.list()
      .then(data => res.status(200).json(data))
      .catch(err => res.status(520).json({err: err, msg: "Não consegui obter a lista de exames."}));
  }
})

router.get('/emds/modalidades', (req, res) => {
  Exame.getModalidades()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(525).json({err: err, msg: "Não consegui obter a lista de modalidades."}))
})

router.get('/emds/aptos', (req, res) => {
  Exame.countAptos()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(526).json({err: err, msg: "Não consegui obter o número de aptos."}))
})

router.get('/emds/atletas', (req, res) => {
  Exame.getAtletas()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(527).json({err: err, msg: "Não consegui obter a lista de atletas."}))
})

router.get('/emds/:id', (req, res) => {
  Exame.getExame(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(521).json({err: err, msg: "Não consegui obter o exame."}))
})

router.post('/emds', (req, res) => {
  Exame.addExame(req.body)
    .then(data => res.status(201).json(data))
    .catch(err => res.status(522).json({err: err, msg: "Não consegui inserir o exame."}))
})

router.put('/emds/:id', (req, res) => {
  Exame.updateExame(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(523).json({err: err, msg: "Não consegui alterar o exame."}))
})

router.delete('/emds/:id', (req, res) => {
  Exame.deleteExame(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(524).json({err: err, msg: "Não consegui apagar o exame."}))
})

module.exports = router;
