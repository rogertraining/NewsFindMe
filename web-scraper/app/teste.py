dic = {"Notícia 1" : {"Tittle": 'Teste', 'Notice': 'Teste1'}, "Notícia 2": {'Tittle': 'Teste2', "Notice": "Teste3"}, "Notícia 3" : {"Tittle": 'Teste', 'Notice': 'Teste1'}}
print(dic)
dic2 = {}
for key, value in dic.items():
    if value not in dic2.values():
        dic2[key] = value
print(dic2)