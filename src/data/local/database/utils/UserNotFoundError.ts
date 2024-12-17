export class UserNotFoundError extends Error {

    constructor(message: string = "Usuário não encontrado. Verifique o email e senha."){
        super(message)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, UserNotFoundError)
        }
    }

}