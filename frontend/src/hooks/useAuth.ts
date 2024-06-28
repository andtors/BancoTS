'use client'

import api from '@/utils/api'

import {useState, useEffect} from 'react'
import { IUser } from '@/interfaces/IUser'
import { IToken } from '@/interfaces/IToken'
import {useRouter} from 'next/navigation'
import jwt, { jwtDecode } from 'jwt-decode'

export default function useAuth() {

   const AUTH_PARAM: string = '_auth'

    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token){
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }
    }, [])

    async function register(user: IUser){
        try {
            const data = await api.post('/create', user).then((response) => {
                return response.data
            })
            
            await authUser(data)
            router.push('/dashboard')
            
        } catch (error: any) {
            console.log(error.response)
        }

      
    }

    async function authUser(data: IToken){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        
        const decodedToken = jwtDecode(data.token)
    
        try {
            localStorage.setItem(AUTH_PARAM, JSON.stringify(decodedToken))
        } catch (error) {
            return null
        }
       
        
    }

    function logout(){
        
        setAuthenticated(false)
        localStorage.removeItem('token')
        localStorage.removeItem(AUTH_PARAM)
        api.defaults.headers.Authorization = null
        
       
    }
    
    async function login(user: IUser){
        try {
            const data = await api.post('/login', user).then((response) => {
                return response.data
            })
            
            await authUser(data)
            router.push('/dashboard')
            
        } catch (error: any) {
            console.log(error.response.data)
           
        }

    }

    function getUserToken() {

        try {
            const authString = localStorage.getItem(AUTH_PARAM)

            if (!authString) {
                return null
            }

            const token = JSON.parse(authString)
            return token
        } catch (error) {
            return null
        }

    }

    function getUserTokenJwt() {

        try {
            const authString = localStorage.getItem('token')

            if (!authString) {
                return null
            }

            const token = JSON.parse(authString)
            return token
        } catch (error) {
            return null
        }

    }
    

    return { authenticated, register, logout, login, getUserToken, getUserTokenJwt}
}