exports.genMainPage = function(people, d) {
    var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>Pessoas</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>Lista de Pessoas</h1>
                    </header>
                
                    <div class="w3-container">
                        <table class="w3-table-all">
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Idade</th>
                                <th>Sexo</th>
                                <th>Cidade</th>
                            </tr>
    `

    for (let person of people){
        pagHTML += `
                            <tr>
                                <td>${person.id}</td>
                                <td><a href="/pessoas/${person.id}">${person.nome}</a></td>
                                <td>${person.idade}</td>
                                <td>${person.sexo}</td>
                                <td>${person.morada.cidade}</td>
                            </tr>
        `
    }

    pagHTML += `
                        </table>
                    </div>

                    <footer class="w3-container w3-purple">
                        <h5>Gerado em EngWeb2023 ${d}</h5>
                    </footer>
                
                 </div>
            </body>
        </html>
    `

    return pagHTML
}

exports.genPersonPage = function(person, d){
    var pagHTML = `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <title>${person.nome}</title>
                <link rel="stylesheet" type="text/css" href="w3.css"/>
            </head>
            <body>
                <div class="w3-card-4">
                    <header class="w3-container w3-purple">
                        <h1>${person.nome}</h1>
                    </header>
                
                    <div class="w3-container">
                    <p><b>ID:</b> ${person.id}</p>
                    <p><b>Nome:</b> ${person.nome}</p>
                    <p><b>Idade:</b> ${person.idade}</p>
                    <p><b>Sexo:</b> ${person.sexo}</p>
                    <p><b>Cidade:</b> ${person.morada.cidade}</p>
                    </div>

                    <footer class="w3-container w3-purple">
                        <h5>Gerado em EngWeb2023 ${d}</h5>
                    </footer>
                 </div>
            </body>
        </html>
    `

    return pagHTML
}

exports.sexDistr = function(people){
    distr = {}

    for (let person of people){
        if (person.sexo in distr){
            distr[person.sexo] += 1
        }
        else distr[person.sexo] = 1
    }

    return distr
}

exports.genSexDistrPage = function(distr, d){
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Distribuição por Sexo</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Distribuição por Sexo</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Sexo</th>
                            <th>Frequência</th>
                        </tr>
    `

    for(let sex in distr){
        pagHTML += `
                        <tr>
                            <td>${sex}</td>
                            <td><a href="/sexo/${sex}">${distr[sex]}</a></td>
                        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return pagHTML
}

exports.sportDistr = function(people){
    distr = {}

    for (person of people){
        for (sport of person.desportos){
            if (sport in distr){
                distr[sport] += 1
            }
            else distr[sport] = 1
        }
    }

    return distr
}

exports.genSportDistrPage = function(distr, d){
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Distribuição por Desporto</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Distribuição por Desporto</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Desporto</th>
                            <th>Frequência</th>
                        </tr>
    `

    for (let sport in distr){
        pagHTML += `
                        <tr>
                            <td>${sport}</td>
                            <td><a href="/desporto/${sport}">${distr[sport]}</a></td>
                        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return pagHTML
}

exports.jobDistr = function(people){
    distr = {};

    for (let person of people){
        if (person.profissao in distr){
            distr[person.profissao] += 1
        }
        else distr[person.profissao] = 1
    }

    let orderedJobs = [];

    for (let prof in distr) {
        orderedJobs.push([prof, distr[prof]]);
    }

    orderedJobs.sort((a, b) => {
        return b[1] - a[1];
    });

    return orderedJobs;
}

exports.genProfissaoDistrPage = function(distr, d){
    pagHTML =`
    <!DOCTYPE html>

    <html>
        <head>
            <meta charset="UTF-8"/>
            <title>Top 10 de Profissões</title>
            <link rel="stylesheet" type="text/css" href="w3.css"/>
        </head>

        <body>
            <div class="w3-card-4">

                <header class="w3-container w3-purple">
                    <h1>Top 10 de Profissões</h1>
                </header>
                
                <div class="w3-container">
                    <table class="w3-table-all">
                        <tr>
                            <th>Profissão</th>
                            <th>Frequência</th>
                        </tr>
    `

    for (let i=0; i < 10; i++){
        pagHTML += `
                        <tr>
                            <td>${distr[i][0]}</td>
                            <td><a href="/profissao/${distr[i][0]}">${distr[i][1]}</a></td>
                        </tr>
        `
    }

    pagHTML += `
                    </table>
                </div>

                <footer class="w3-container w3-purple">
                    <h5>Gerado em EngWeb2023 ${d}</h5>
                </footer>
            </div>
        </body>
    </html>
    `

    return pagHTML
}
