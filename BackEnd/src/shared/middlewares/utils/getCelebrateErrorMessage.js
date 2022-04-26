/*
  Função que serve pra pegar a mensagem do erro do CelebrateError
  Os detalhes do erro do CelebrateError é um Map, essa função itera
  ele e extrai a mensagem do erro.
*/
export function getCelebrateErrorMessage(error) {
  const validation = {}
  
  for (const [, joiError] of error.details.entries()) {
    Object.assign(validation, { 
      message: joiError.message 
    })
  }

  const { message } = validation

  return message
}