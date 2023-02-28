import json
import bisect


def carrega_dados(mapa):
    nomes_cidades = dict()  # cod cidade -> nome cidade
    distritos = dict()  # distrito -> [cod cidade]
    origens = dict()  # origem -> [cod cidade destino]
    destinos = dict()  # destino -> [cod cidade origem]

    ligacoes = mapa["ligações"]
    cidades = mapa["cidades"]
    cidades.sort(key=lambda x : x["nome"])  # cidades ordenadas alfabeticamente

    # preencher nomes_cidades e distritos
    for c in cidades:
        nomes_cidades[c["id"]] = c["nome"]

        if c["distrito"] not in distritos:
            distritos[c["distrito"]] = list()

        distritos[c["distrito"]].append(c)

    # preencher origens e destinos
    for l in ligacoes:
        if l["destino"] not in origens:
            origens[l["destino"]] = list() 

        bisect.insort(origens[l["destino"]], (l["origem"], l["distância"]), key=lambda c : nomes_cidades[c[0]])

        if l["origem"] not in destinos:
            destinos[l['origem']] = list()

        bisect.insort(destinos[l['origem']], (l["destino"], l["distância"]), key=lambda c : nomes_cidades[c[0]])

    return nomes_cidades, distritos, origens, destinos, cidades


def gera_pag_cidade(c, origs, dests, nomes_cidades):
    html = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Mapa Virtual</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <center>
                <h1>Mapa Virtual</h1>
                <hr width="80%"/>
            </center>
            <table style="width:100%">
                <tr>
                    <td>
    """

    html += f"""
                        <h2>{c["nome"]}</h2>
                        <p><b>População: </b>{c["população"]}</p>
                        <p><b>Descrição: </b>{c["descrição"]}</p>
                        <p><b>Distrito: </b>{c["distrito"]}</p>
                        <table style="width:100%">
                            <td valign="top">
                                <center><p><b>Origens:</b></p></center>
                                <ul style="margin-left:35%">
    """

    if c["id"] in origs:
        for orig in origs[c["id"]]:
            html += f"""
                                    <li><a href="{orig[0]}">{nomes_cidades[orig[0]]}</a> - {orig[1]} km</li>
            """
    
    html += f"""
                                </ul>
                            </td>
                            <td valign="top" width="50%">
                                <center><p><b>Destinos:</b></p></center>
                                <ul style="margin-left:35%">
    """

    if c["id"] in dests:
        for dest in dests[c["id"]]:
            html += f"""
                                    <li><a href="{dest[0]}">{nomes_cidades[dest[0]]}</a> - {dest[1]} km</li>
            """

    html += f"""
                                </ul>
                            </td>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
    </html>           
    """

    with open(f"paginas/{c['id']}.html", "w") as file:
        file.write(html)


def gera_index(distritos):
    distritos_ord = list(distritos.keys())
    distritos_ord.sort()  # distritos ordenados alfabeticamente

    html = """
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
                <hr width="80%"/>
            </center>
            <table>
                <tr>
                    <td>
                        <h2>Índice</h2>
                        <ul>
    """

    for d in distritos_ord:
        html += f"""
                            <li>
                                <h3>{d}</h3>
                                <ul>
        """
        
        for c in distritos[d]:
            html += f"""
                                    <li><a href="{c["id"]}">{c["nome"]}</a></li>
            """

        html += """
                                </ul>
                            </li> 
                            <br>
        """
    
    html += """
                        </ul>
                    </td>
                </tr>
            </table>
        </body>
    </html>
    """

    with open(f"paginas/index.html", "w") as file:
        file.write(html)


def main():
    # carregar dados para memória
    mapa = json.load(open("mapa.json"))
    nomes_cidades, distritos, origens, destinos, cidades = carrega_dados(mapa)

    #gerar a página index.html
    gera_index(distritos)

    #gerar as páginas das cidades
    for c in cidades:
        gera_pag_cidade(c, origens, destinos, nomes_cidades)


if __name__ == '__main__':
    main()