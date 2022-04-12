from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import json

app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = False
app.config['JSON_AS_ASCII'] = False

@app.route('/noticias', methods=['POST'])
def home():
    noticias2 = scraper('https://g1.globo.com/','div', 'feed-post-body', 'img', 'bstn-fd-picture-image', 'src', 'a', 'feed-post-link gui-color-primary gui-color-hover', 'a', 'feed-post-link gui-color-primary gui-color-hover', 'span', 'feed-post-datetime', '/index/feed/pagina-', '.ghtml')

    return noticias2

def retorna_preferencias():
    preferencias_json = request.get_json()
    preferencias = preferencias_json['Escolhas']
    return preferencias

dicionario = {}

def scraper(prefixo, tag, classe, tag_img, classe_img, ref_img, tag_tittle, classe_tittle, tag_link, classe_link, tag_data, classe_data, sufixo='', sufixo_final=''):
    preferencia = retorna_preferencias()
    indice = 0
    ultima_pagina = 2
    num = 0
    while indice < len(preferencia):
            for i in range(1, ultima_pagina):
                url_pag = f'{prefixo}{preferencia[indice]}{sufixo}{i}{sufixo_final}'
                site = requests.get(url_pag)
                soup = BeautifulSoup(site.content, 'html.parser')
                noticias_g1 = soup.find_all(f'{tag}', class_=f'{classe}')

                with open(r'./templates/noticias.json', 'w', newline='', encoding='UTF-8') as arquivo:
                    for noticia in noticias_g1:
                        num += 1
                        titulo = noticia.find(f'{tag_tittle}', class_=f'{classe_tittle}').get_text().strip()
                        titulo = titulo.replace('\n', '')
                        classe_noticia = noticia.find(f'{tag_link}', class_=f'{classe_link}')
                        link_noticia = classe_noticia.get('href')
                        classe_date = noticia.find(f'{tag_data}', class_=f'{classe_data}').get_text().strip()
                        data = classe_date.replace('-', '')

                        try:
                            link_imagem = noticia.find(f'{tag_img}', class_=f'{classe_img}').get(f'{ref_img}')
                        except:
                            link_imagem = '0'
                        
                        dicionario.update({f'Notícia {num}':{'Tittle': titulo, 'Notice': link_noticia, 'Image': link_imagem, 'Date': data}})
                    json.dump(dicionario, arquivo, indent=4, ensure_ascii=False)

            indice += 1

    return jsonify(dicionario)

if __name__ == "__main__":
    app.run(debug=True)