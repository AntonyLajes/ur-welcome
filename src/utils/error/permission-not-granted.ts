export default class PermissionNotGrantedError extends Error {
    constructor(message: string){
        super(message)
        Error.captureStackTrace(this, PermissionNotGrantedError)
    }

}