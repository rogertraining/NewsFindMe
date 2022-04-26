import { AppError } from "../error/AppError.js";
import error_messages from "../constants/error_messages.js";
import { CelebrateError } from "celebrate";
import { getCelebrateErrorMessage } from "./utils/getCelebrateErrorMessage.js";
import Prisma from "@prisma/client";

const { SERVER_INTERNAL_ERROR } = error_messages
const { 
  PrismaClientKnownRequestError, 
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
  PrismaClientRustPanicError,
  PrismaClientValidationError
} = Prisma

export function errorHandler(error, request, response, next) {
  switch(true) {
    case error instanceof AppError:
      return response.status(error.status).send({ message: error.message }) 

    case error instanceof CelebrateError: {
      const message = getCelebrateErrorMessage(error)
      return response.status(400).send( { message } )
    }

    case error instanceof PrismaClientKnownRequestError:
      return response.status(400).send({ 
        errorCode: error.code,
        message: error.message 
      });

    case error instanceof PrismaClientUnknownRequestError:
      return response.status(400).send({ 
        errorCode: error.code,
        message: error.message 
      });

    case error instanceof PrismaClientValidationError:
      console.log(error);
      const newlines_matches_regex = /\\n/gm
      const newstring = error.message.replaceAll(newlines_matches_regex, "\\n")
      console.log(newlines_matches_regex.exec(JSON.stringify(newstring)))
      const errokkk = JSON.stringify({ errorCode: error.code, message: error.message })
      
      return response.status(400).json(error.message).send();

    case error instanceof PrismaClientInitializationError:
      return response.status(400).send({ 
        errorCode: error.code,
        message: error.message 
      });

    case error instanceof PrismaClientRustPanicError:
      return response.status(400).send({ 
        errorCode: error.code,
        message: error.message 
      });

    default: {
      console.log(error)
      return response.status(500).send({ message: SERVER_INTERNAL_ERROR })
    }
  }
}