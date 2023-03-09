var http = require("http")
var axios = require("axios")
var genpages = require("./genPages")
var fs = require("fs")

http.createServer(function(req, res){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if (req.url.match(/w3\.css$/)){
        fs.readFile("w3.css", function(err, data){
            if (err){
                res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na leitura do ficheiro: " + err + "</p>")
            }
            else{
                res.writeHead(200, {"Content-Type": "text/css"})
                res.end(data)
            }
        })
    }
    else if (req.url == "/"){
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
        res.write(genpages.genMenuPage(d))
        res.end()
    }
    else if (req.url == "/pessoas"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genMainPage(resp.data, d))
                res.end()
             })
            .catch(err => { 
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url.match(/\/pessoas\/p\d+/)) {
        axios.get("http://localhost:3000/pessoas/" + req.url.substring(9))
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genPersonPage(resp.data, d))
                res.end()
             })
            .catch(err => { 
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url == "/pessoasOrdenadas"){
        axios.get("http://localhost:3000/pessoas?_sort=nome")
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genMainPage(resp.data, d))
                res.end()
             })
            .catch(err => { 
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url == "/sexo"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genSexDistrPage(genpages.sexDistr(resp.data), d))
                res.end()
             })
            .catch(err => { 
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url.match(/\/sexo\/[A-Za-z]+/)){
        axios.get("http://localhost:3000/pessoas?sexo=" + req.url.substring(6))
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genMainPage(resp.data, d))
                res.end()
            })
            .catch(err => {
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url == "/desporto"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genSportDistrPage(genpages.sportDistr(resp.data), d))
                res.end()
             })
            .catch(err => { 
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url.match(/\/desporto\/[A-Za-z]+/)){
        axios.get("http://localhost:3000/pessoas?desportos_like=" + req.url.substring(10))
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genMainPage(resp.data, d))
                res.end()
            })
            .catch(err => {
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url == "/profissao"){
        axios.get("http://localhost:3000/pessoas")
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genProfissaoDistrPage(genpages.jobDistr(resp.data), d))
                res.end()
             })
            .catch(err => { 
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else if (req.url.match(/\/profissao\/\w+/)){
        axios.get("http://localhost:3000/pessoas?profissao=" + req.url.substring(11))
            .then(function(resp){
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.write(genpages.genMainPage(resp.data, d))
                res.end()
            })
            .catch(err => {
                console.log("Erro: " + err)
                res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
                res.end("<p>Erro na obtenção de dados: " + err + "</p>")
            })
    }
    else {
        res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"})
        res.end("<p>Operação não suportada: " + req.url + "</p>")
    }

}).listen(7777)

console.log("Servidor à escuta na porta 7777...")