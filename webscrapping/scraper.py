from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
app.config['JSON_AS_ASCII'] = False

@app.route('/')
def home():
    num = 0
    indice = 0
    ultima_pagina = 2
    dicionario = {}
    
    with open(r'/home/guilhermep/webscrapping/templates/preferencias.json', encoding='utf-8') as arquivo_preferencias:
        preferencia = json.load(arquivo_preferencias)
        preferencia = preferencia["Escolhas"]

    with open(r'/home/guilhermep/webscrapping/templates/noticias.json', 'w') as arquivo_vazio:
            arquivo_vazio.write('')

    while indice < len(preferencia):
        for i in range(1, ultima_pagina):
            url_pag = f'https://g1.globo.com/{preferencia[indice]}/index/feed/pagina-{i}.ghtml'
            site = requests.get(url_pag)
            soup = BeautifulSoup(site.content, 'html.parser')
            noticias = soup.find_all('div', class_='feed-post-body')

            with open(r'/home/guilhermep/webscrapping/templates/noticias.json', 'w', newline='', encoding='UTF-8') as arquivo:
                for noticia in noticias:
                    num += 1
                    titulo = noticia.find('a', class_='feed-post-link gui-color-primary gui-color-hover').get_text().strip()
                    titulo = titulo.replace('\n', '')
                    classe_noticia = noticia.find('a', class_='feed-post-link gui-color-primary gui-color-hover')
                    link_noticia = classe_noticia.get('href')

                    try:
                        link_imagem = noticia.find('img', class_='bstn-fd-picture-image').get('src')
                    except:
                        link_imagem = '0'
                    
                    dicionario.update({f'Notícia {num}':{'Tittle': titulo, 'Notice': link_noticia, 'Image': link_imagem}})
                json.dump(dicionario, arquivo, indent=4, ensure_ascii=False)

        indice += 1

    return jsonify(dicionario)

if __name__ == "__main__":
    app.run(debug=True)

"""
- Documentação flask
- Metodo 1:
    via linha de comando
- Ganhar linha de comando dos microsserviços, para criar a estrutura de pastas do projeto
Via linha de comando, fazer o upload no microsserviço flask do conteúdo(Se houver uma estrutura de pastas, um arquivo compactado deve ser usado no upload)
- Gerar uma imagem do container docker (Flask) em execução após as configurações e validação
- Metodo 2:
    via interface gráfica
- Interface gráfica para upload flask

"""