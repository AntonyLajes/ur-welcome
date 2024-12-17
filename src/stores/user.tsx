import { create } from "zustand"
import { User } from "../data/local/database/models/user-model"

type UseUserType = {
    userLogged: User | undefined,
    setUserLogged: (user: User | undefined) => void
}

export const useUser = create<UseUserType>((set) => ({
    userLogged: undefined,
    setUserLogged(user) {
        set({
            userLogged: user
        })
    },
}))