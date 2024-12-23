import { User } from "../models/user-model";
import { SignInDTO } from "./dto/SignInDTO";
import { SignUpDTO } from "./dto/SignUpDTO";

export interface UserRepositoryUseCase {

    insert(user: SignUpDTO): Promise<string | void>
    updatePicProfile(user: User, picUri: string): Promise<void | User>
    selectAll(): Promise<User[] | void>
    selectByEmail(email: string): Promise<User | void>
    selectById(id: string): Promise<User | void>
    login(user: SignInDTO): Promise<User | void>

}