import { User } from "../models/user-model";
import { SignInDTO } from "./dto/SignInDTO";
import { SignUpDTO } from "./dto/SignUpDTO";

export interface UserRepositoryUseCase {

    insert(user: SignUpDTO): Promise<string | void>
    selectAll(): Promise<User[] | void>
    selectByEmail(email: string): Promise<User | void>
    login(user: SignInDTO): Promise<User | void>

}