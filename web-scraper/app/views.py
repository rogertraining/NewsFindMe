from app import app
import json
import requests
from bs4 import BeautifulSoup
from flask import jsonify, request
from flask_cors import  CORS, cross_origin

app.config['JSON_SORT_KEYS'] = False
app.config['JSON_AS_ASCII'] = False
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/noticias', methods=['POST'])
@cross_origin()
def home():
    cria_arquivo_vazio()
    noticias = scraper('div', 'feed-post-body', 'img', 'bstn-fd-picture-image', 'a', 'feed-post-link gui-color-primary gui-color-hover', 'a', 'feed-post-link gui-color-primary gui-color-hover', 'span', 'feed-post-datetime')

    return noticias

def cria_arquivo_vazio():
    with open(r'noticias.json', 'w') as arquivo_vazio:
            arquivo_vazio.write('')

def retorna_preferencias():
    preferencias_json = request.get_json()
    preferencias = preferencias_json['Escolhas']
    return preferencias

def scraper(tag, classe, tag_img, classe_img, tag_tittle, classe_tittle, tag_link, classe_link, tag_data, classe_data):
    preferencia = retorna_preferencias()
    indice = 0
    ultima_pagina = 5
    num = 0
    dicionario = {"Notícia 0": {'Tittle': 'teste'}}
    while indice < len(preferencia):
        for i in range(1, ultima_pagina):
            url_pag = f'https://g1.globo.com/{preferencia[indice]}/index/feed/pagina-{i}.ghtml'
            site = requests.get(url_pag)
            soup = BeautifulSoup(site.content, 'html.parser')
            noticias_g1 = soup.find_all(f'{tag}', class_=f'{classe}')

            with open(r'noticias.json', 'w', newline='', encoding='UTF-8') as arquivo:
                for noticia in noticias_g1:
                    num += 1
                    titulo = noticia.find(f'{tag_tittle}', class_=f'{classe_tittle}').get_text().strip()
                    titulo = titulo.replace('\n', '')
                    classe_noticia = noticia.find(f'{tag_link}', class_=f'{classe_link}')
                    link_noticia = classe_noticia.get('href')
                    classe_date = noticia.find(f'{tag_data}', class_=f'{classe_data}').get_text().strip()
                    data = classe_date.replace('-', '')

                    try:
                        link_imagem = noticia.find(f'{tag_img}', class_=f'{classe_img}').get('src')
                    except:
                        link_imagem = '0'

                    if dicionario[f'Notícia {num - 1}']['Tittle'] == titulo:
                        continue
                    else:
                        dicionario.update({f'Notícia {num} - {preferencia}':{'Tittle': titulo, 'Notice': link_noticia, 'Image': link_imagem, 'Date': data}})
                json.dump(dicionario, arquivo, indent=4, ensure_ascii=False)

        indice += 1

    return jsonify(dicionario), 200
"""                     if num == 1:
                        dicionario.update({f'Notícia {num}':{'Tittle': titulo, 'Notice': link_noticia, 'Image': link_imagem, 'Date': data}}) """