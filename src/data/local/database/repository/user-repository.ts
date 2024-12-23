import { database, userDatabase } from "../config";

import { UserRepositoryUseCase } from "./user-repository-use-case";

import { User } from "../models/user-model";
import { SignUpDTO } from "./dto/SignUpDTO";
import { Q } from "@nozbe/watermelondb";
import { FieldError } from "../utils/FieldError";
import { SignInDTO } from "./dto/SignInDTO";
import { UserNotFoundError } from "../utils/UserNotFoundError";


export class UserRepository implements UserRepositoryUseCase {

    async insert(user: SignUpDTO): Promise<void> {

        const emailsExists = await this.selectByEmail(user.email)
        if (emailsExists) {
            throw new FieldError('Este email já está em uso.', "email")
        }

        try {
            await database.write(async () => {
                await userDatabase.create(_ => {
                    _.name = user.name,
                        _.email = user.email,
                        _.password = user.password
                })
            })
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async updatePicProfile(user: User, picUri: string): Promise<void | User> {
        try {
            await database.write(async () => {
                await user.update(_ => {
                    _.picUri = picUri
                })
            })
        } catch (error) {
            throw error
        }
    }

    async selectAll(): Promise<User[] | void> {
        try {
            const users = await userDatabase.query().fetch()
            return users
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async selectByEmail(email: string): Promise<User | void> {
        try {
            const storedUser = await userDatabase.query(Q.where('email', email)).fetch()
            return storedUser[0]
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async selectById(id: string): Promise<User | void> {
        try {
            const storedUser = await userDatabase.find(id)
            return storedUser
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async login(user: SignInDTO): Promise<User> {
        try {
            const storedUser = await this.selectByEmail(user.email)
            if (!storedUser) {
                throw new UserNotFoundError()
            }

            if (storedUser.password != user.password) {
                throw new UserNotFoundError()
            }

            return storedUser
        } catch (error: any) {
            throw error
        }
    }

}