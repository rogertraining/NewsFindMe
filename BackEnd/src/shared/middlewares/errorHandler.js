import { AppError } from "../error/AppError.js";
import error_messages from "../constants/error_messages.js";
import { CelebrateError } from "celebrate";

const { SERVER_INTERNAL_ERROR } = error_messages

export function errorHandler(error, request, response, next) {
  if (error instanceof AppError) {
    return response.status(error.status).send({ message: error.message })
  }

  if (error instanceof CelebrateError) {
    const validation = {}

    for (const [, joiError] of error.details.entries()) {
      Object.assign(validation, { 
        message: joiError.message 
      })
    }

    const { message } = validation

    return response.status(400).send( { message } )
  }
  console.log(error)
  return response.status(500).send({ message: SERVER_INTERNAL_ERROR })
}