import json

def ordCidade(c):
    return c["nome"]  #chave de ordenação

f = open("mapa.json")
mapa = json.load(f)

cidades = mapa["cidades"]
cidades.sort(key=ordCidade)

ligacoes = mapa["ligações"]

nomes_cidades = dict()
for c in cidades:
    nomes_cidades[c["id"]] = c["nome"]

origens = dict()
destinos = dict()

for l in ligacoes:
    if l["destino"] not in origens:
        origens[l["destino"]] = list() 
    origens[l["destino"]].append((l["origem"], l["distância"]))

    if l["origem"] not in destinos:
        destinos[l['origem']] = list()
    destinos[l["origem"]].append((l["destino"], l["distância"]))


pagHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Mapa Virtual</title>
        <meta charset="utf-8"/>
        <style>
        td {
            padding-right: 10px;
            vertical-align: top;
        }
        </style>
    </head>
    <body>
        <center>
            <h1>Mapa Virtual</h1>
        </center>
        <table>
            <tr>
                <!-- Índice -->
                <a name="indice"/>
                <td valign="top">
                    <h3>Índice</h3>
                    <ul>
"""

for c in cidades:
    pagHTML += f"""
                    <li><a href="#{c["id"]}">{c["nome"]}</a></li>
    """

pagHTML += """
                    </ul>
                </td>
                <!-- Conteúdo -->
                <td>
"""

for c in cidades:
    pagHTML += f"""
                    <a name="{c['id']}"/>
                    <h3>{c['nome']}</h3>
                    <p><b>População: </b>{c["população"]}</p>
                    <p><b>Descrição: </b>{c["descrição"]}</p>
                    <p><b>Distrito: </b>{c["distrito"]}</p>
                    <table>
                        <td>
                            <p><b>Origens:</b></p>
                            <ul>
    """

    if c["id"] in origens:
        for orig in origens[c["id"]]:
            pagHTML += f"""
                                    <li><a href="#{orig[0]}">{nomes_cidades[orig[0]]}</a> - {orig[1]} km</li>
            """

    pagHTML += f"""
                            </ul>
                        </td>
                        <td>
                            <p><b>Destinos:</b></p>
                            <ul>
    """

    if c["id"] in destinos:
        for dest in destinos[c["id"]]:
            pagHTML += f"""
                                <li><a href="#{dest[0]}">{nomes_cidades[dest[0]]}</a> - {dest[1]} km</li>
            """

    pagHTML += f"""
                            </ul>    
                        </td>
                    </table>
                    <address>[<a href="#indice">Voltar ao Índice]</adress>
                    <center>
                        <hr width="80%"/>
                    </center>
    """


pagHTML += """
                </td>
            </tr>
        </table>
    </body>
</html>
"""

print(pagHTML)