'use client'

interface TemplateProps {
    loading?: boolean
    children: React.ReactNode
}

interface RenderIfProps {
    condition: boolean
    children: React.ReactNode
}

interface MainSection {
    children: React.ReactNode
}

import { UserProvider } from "@/context/UserContext"

export const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
    return (
        <div>
            <UserProvider>
            <Header />
            <MainSection>
                {children}
            </MainSection>
            <Footer />
            </UserProvider>
        </div>
    )
}

export const Footer: React.FC = () => {
    return (
        <footer className="bg-blue-600 text-white py-4 fixed bottom-0 w-screen " >
            <div className=" text-center ">
                Desenvolvido por André Torres
            </div>
        </footer>
    )
}

import useAuth from '@/hooks/useAuth'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const Header: React.FC = () => {

    const {logout, getUserToken} = useAuth()
    const router = useRouter()
    const [tokenDecoded, setTokenDecoded] = useState([])
    const [checkUserSession, setCheckUserSession] = useState(false)
    const [name, setName] = useState('')

    useEffect(() => {
        const token = getUserToken()
        setTokenDecoded(token)
        if(token !== null){
            setCheckUserSession(true)
            setName(token.name)
        } else {
            setCheckUserSession(false)
        } 

        
    }, [])
   

    function handleLogout(){
        logout()
        router.push('/auth')
    }

    return (
        <header className="bg-blue-600 text-white py-4 px-4 shadow-xl fixed top-0 w-screen">
            <div className="flex justify between items-center">
                <div className="container flex justify between ">
                    <p className="text-3xl">BancoTS</p>
                </div>
                <RenderIf condition={checkUserSession}>
                    <div className="w-64 py-3 px-6 text-md">
                        <span className="relative text-md">Bem&nbsp;vindo&nbsp;{name}</span>
                        <span className="ml-4 text-md">
                            <a href="#" onClick={handleLogout}>Sair</a>
                        </span>
                    </div>
                </RenderIf>
            </div>
        </header>
    )
}

export const RenderIf: React.FC<RenderIfProps> = ({ condition, children }: RenderIfProps) => {
    if (condition) {
        return children
    }

    return false
}

export const MainSection: React.FC<MainSection> = ({ children }: MainSection) => {
    return (
        <div className="h-screen flex items-center justify-center">
            {children}
        </div>
    )
}