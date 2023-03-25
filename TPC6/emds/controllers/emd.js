var Exame = require("../models/emd")

// Exame list
module.exports.list = () => {
    return Exame
            .find().sort({dataEMD:-1})
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.getExame = id => {
    return Exame.findOne({_id:id})
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.addExame = e => {
    return Exame.create(e)
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.updateExame = e => {
    return Exame.updateOne({_id:e._id}, e)
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.deleteExame = id => {
    return Exame.deleteOne({_id:id})
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.getModalidades = () => {
    return Exame.distinct("modalidade").sort()
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.countAptos = () => {
    return Exame.find({resultado:true}).count()
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.getAtletas = () => {
    return Exame.distinct("nome").sort()
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}