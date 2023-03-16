var http = require("http")
var axios = require("axios")
var templates = require("./templates")
var static = require("./static.js")
const { parse } = require("querystring");

// Aux functions
function collectRequestBodyData(request, callback){
    if(request.headers["content-type"] === "application/x-www-form-urlencoded"){
        let body = "";
        request.on("data", chunk => {
            body += chunk.toString();
        });
        request.on("end", () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

function getTasks(){
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

                            already_done = []
                            to_do = []

                            for (let task of tasks){
                                if (task.done == "false"){
                                    to_do.push(task)
                                }
                                else already_done.push(task)
                            }

                            return [to_do, already_done]
                        })
                        .catch(err => {
                            console.log(err)
                        })
            })
            .catch(err => {
                console.log(err)
            })             
}

// Server creation
var tasksServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if (static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch (req.method){
            case "GET":
                // GET /tasks --------------------------------------------------------------------
                if(req.url == "/"){
                    getTasks()
                        .then(tasks => {
                            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                            res.write(templates.genPage(tasks[0], tasks[1], null, d))
                            res.end()
                        })
                        .catch(err => {
                            console.log(err)
                        })   
                }
                // GET /edit/:id --------------------------------------------------------------------
                else if(/\/edit\/.*$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]

                    getTasks()
                        .then(tasks => {
                            axios.get("http://localhost:3000/tasks/" + idTask)
                                .then(resp => {
                                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                                    res.write(templates.genPage(tasks[0], tasks[1], resp.data, d))
                                    res.end()
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        })
                        .catch(err => {
                            res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"})
                            res.end("<p>Unable to edit task " + idTask + "</p>")
                        })
                }
                // GET /done/:id --------------------------------------------------------------------
                else if(/\/done\/.*$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]

                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then(resp => {
                            var task = resp.data
                            task["done"] = "true"

                            axios.put("http://localhost:3000/tasks/" + idTask, task)
                                .then(resp => {
                                    getTasks()
                                        .then(tasks => {
                                            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                                            res.write(templates.genPage(tasks[0], tasks[1], null, d))
                                            res.end()
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        }) 
                                })
                                .catch(err => {
                                    res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"})
                                    res.end("<p>Unable to update task " + idTask + "status</p>")
                                })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
                // GET /delete/:id --------------------------------------------------------------------
                else if (/\/delete\/.*$/i.test(req.url)){
                    var idTask = req.url.split("/")[2]

                    axios.delete("http://localhost:3000/tasks/" + idTask)
                        .then(resp => {
                            getTasks()
                                .then(tasks => {
                                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                                    res.write(templates.genPage(tasks[0], tasks[1], null, d))
                                    res.end()
                                })
                                .catch(err => {
                                    console.log(err)
                                }) 
                        })
                        .catch(err => {
                            res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"})
                            res.end("<p>Unable to delete task " + idTask + "</p>")
                        })
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                    res.end("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                }
                break
            case "POST":
                if (req.url == "/insert"){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.post("http://localhost:3000/tasks", result)
                                .then(resp => {
                                    getTasks()
                                        .then(tasks => {
                                            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                                            res.write(templates.genPage(tasks[0], tasks[1], null, d))
                                            res.end()
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        }) 
                                })
                                .catch(err => {
                                    res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"})
                                    res.end("<p>Unable to insert task</p>")
                                })
                        }
                        else{
                            res.writeHead(201, {"Content-Type": "text/html; charset=utf-8"})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    })
                }
                else if (/\/edit\/.*$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if (result){
                            axios.put("http://localhost:3000/tasks/" + result.id, result)
                                .then(resp => {
                                    getTasks()
                                        .then(tasks => {
                                            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                                            res.write(templates.genPage(tasks[0], tasks[1], null, d))
                                            res.end()
                                        })
                                        .catch(err => {
                                            console.log(err)
                                        })  
                                })
                                .catch(err => {
                                    res.writeHead(500, {"Content-Type": "text/html; charset=utf-8"})
                                    res.end("<p>Unable to edit task " + result.id + "</p>")  
                                })
                        }
                        else{
                            res.writeHead(201, {"Content-Type": "text/html; charset=utf-8"})
                            res.end("<p>Unable to collect data from body...</p>")
                        }
                    });
                }
                else{
                    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                    res.write("<p>Unsupported POST request: " + req.url + "</p>")
                    res.end("<p><a href="/">Return</a></p>")
                }
                break

            default: 
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>" + req.method + " unsupported in this server.</p>")
        }
    }
    
}).listen(7777);

console.log("Servidor à escuta na porta 7777...")
