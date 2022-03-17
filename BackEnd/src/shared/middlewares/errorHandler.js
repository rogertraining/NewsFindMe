import { AppError } from "../error/AppError.js";
import error_messages from "../constants/error_messages.js";

const { SERVER_INTERNAL_ERROR } = error_messages

export function errorHandler(error, request, response, next) {
  console.log(error )
  if (error instanceof AppError) {
    return response.status(error.status).send({ message: error.message })
  }

  return response.status(500).send({ message: SERVER_INTERNAL_ERROR })
}