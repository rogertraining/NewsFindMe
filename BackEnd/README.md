# Atribuição de Funções pra essa sprint:

## Funcionalidade
  O client da aplicação deve ser capaz de passar um json com os dados pertinentes ao cadastro do usuário e ter de volta a confirmação da criação do mesmo.

### Natan
  [x] - Implementação da rota e do Handler que irá receber a requisição e devolver a resposta do cadastro de usuário

  [] - Implementação da funcionalidade de atualização do usuário junto com os testes.
    
    Detalhes da implementacao:
    
    [] - Ter uma rota que aceite o método PATCH do protocolo HTTP
    
    [] - Definir que essa rota vai ter atributo params chamado id ("/:id")

    [] - Chamar a função de atualização do usuário (update(id))
    
    [] - Retornar alguma coisa na resposta

  [] - Implementação da funcionalidade de pegar todos os dados dos usuários com paginação junto com os testes

### Matheus
  [x] - Implementação do Service que irá implementar as regras de negócio pro cadastro de usuário

  [] - Implementação da funcionalidade de remoção do usuário junto com os testes.
  
    Detalhes da implementacao:
      
      [] - Ter uma rota que aceite o método DELETE do protocolo HTTP
      
      [] - Definir que essa rota vai ter atributo params chamado id ("/:id")

      [] - Chamar a função de atualização do usuário (delete(id))
      
      [] - Retornar alguma coisa na resposta

### Jonathan
  [x] - Implementação do método do repository que irá salvar o usuário em memória
  
  [x] - Configuração do Query Builder e Banco de Dados

  [x] - Criação do Dockerfile pra subir o container

  [] - Implementação dos repositories com banco de dados

  [x] - Implementação do método do repository que vai deletar o usuário em memória


