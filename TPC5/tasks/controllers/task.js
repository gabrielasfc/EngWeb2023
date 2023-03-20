var axios = require('axios')

module.exports.getTasks = () => {
    return axios.get("http://localhost:3000/tasks")
            .then(resp => {
                var tasks = resp.data

                return axios.get("http://localhost:3000/users")
                        .then(resp => {
                            var users = resp.data

                            var users_dict = {}
                            for (let user of users){
                                users_dict[user.id] = user    
                            }

                            for (let task of tasks){
                                task.who = users_dict[task.who].name
                            }

                            return tasks
                        })
                        .catch(err => {
                            return err
                        })
            })
            .catch(err => {
                return err
            })             
}

module.exports.getTask = id => {
    return axios.get("http://localhost:3000/tasks/" + id)
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return err
            })
}

module.exports.addTask = task => {
    return axios.post("http://localhost:3000/tasks", task)
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return err
            })
}

module.exports.updateTask = task => {
    return axios.put("http://localhost:3000/tasks/" + task.id, task)
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return err
            })
}

module.exports.deleteTask = id => {
    return axios.delete("http://localhost:3000/tasks/" + id)
            .then(resp => {
                return resp.data
            })
            .catch(err => {
                return err
            })
}