var Person = require("../models/person")

// Persons list
module.exports.list = () => {
    return Person.find().sort({nome:1})
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.getPerson = id => {
    return Person.findOne({_id:id})
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.addPerson = p => {
    return Person.create(p)
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.updatePerson = p => {
    return Person.updateOne({_id:p._id}, p)
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}

module.exports.deletePerson = id => {
    return Person.deleteOne({_id:id})
            .then(resp => {
                return resp
            })
            .catch(err => {
                return err
            })
}