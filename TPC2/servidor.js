var http = require("http")
var url = require("url")
var fs = require("fs")


http.createServer(function(req, res) {
    console.log(req.method + " " + req.url)

    var request = url.parse(req.url, true).pathname

    if (request === "/") {
        fs.readFile("./paginas/index.html", function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    
            if (err) {
                res.write("ERRO : Na leitura do ficheiro :: " + err)
            }
            else {
                res.write(data)
            }
    
            res.end()
        })
    }

    else if ((request = request.substring(1)).match(new RegExp("^c([1-9][0-9]?|100)$"))) {
        fs.readFile("./paginas/" + request + ".html", function(err, data) {
            res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'})
    
            if (err) {
                res.write("ERROR : Reading file " + err)
            }
            else {
                res.write(data)
            }
    
            res.end()
        })
    }

    else {
        res.write("<pre>ERRO: Path inválido</pre>")
        res.end()
    }
}).listen(7777)


console.log("Servidor à escuta na porta 7777...")