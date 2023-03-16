var axios = require("axios")

// Student list
module.exports.list = () => {
    return axios.get("http://localhost:3000/alunos?_sort=nome")
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return err
            })
}

module.exports.getAluno = id => {
    return axios.get("http://localhost:3000/alunos/" + id)
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return err
            })   
}