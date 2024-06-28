'use client'

import {createContext} from 'react'

import useAuth from '../hooks/useAuth'

interface ContextProps {
    authenticated: any;
    register: any;
    logout: any;
    login: any;
}

interface UserProviderProps {
    children: React.ReactNode;
}

const Context = createContext<ContextProps | undefined >(undefined)

function UserProvider({children} : UserProviderProps){
    const { authenticated, register, logout, login} = useAuth()

    return(
        <Context.Provider value={{ authenticated, register, logout, login}}>{children}</Context.Provider>
    )
}

export { Context, UserProvider }