import { SignUpDTO } from "../repository/dto/SignUpDTO";

export class FieldError extends Error{
    field: keyof SignUpDTO

    constructor (message: string, field: keyof SignUpDTO){
        super(message)
        this.field = field

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, FieldError);
        }
    }

}