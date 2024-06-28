'use client'

import { Template, RenderIf } from "@/components"
import { useState } from "react"
import useAuth from "@/hooks/useAuth"

const page = () => {

  const [newUserState, setNewUserState] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const {login, register} = useAuth()



  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault()
    // register
    if(newUserState){
      const userCredentials = {email, password, name, confirmPassword}
      register(userCredentials)
    } 
    // login
    else {
      const userCredentials = {email, password}
      login(userCredentials)
    } 
  }

    return (
        <Template>
            <div className="border-2 px-10 py-10 border-none rounded-md shadow-2xl">
                <h1 className="text-center text-xl font-bold mb-10">{ newUserState ? 'Crie uma conta' : 'Entre com sua conta' }</h1>
                <form onSubmit={handleSubmit}>
                  <RenderIf condition={newUserState}>                  
                  <div className="mb-2">
                  <label>Seu nome</label>
                  </div>
                  <input name='name' value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Nome" className="border-2 border-grey rounded-md py-1 px-2 mb-5"/>
                  </RenderIf>
                  <div className="mb-2">
                    
                  <label>Seu e-mail</label>
                  </div>
                  <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} type="text" placeholder="E-mail" className="border-2 border-grey rounded-md py-1 px-2 mb-5"/>
                  <div className="mb-2">
                  <label>Senha</label>
                  </div>
                  <input name='password' value={password}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="••••••••" className="border-2 border-grey rounded-md py-1 px-2 mb-5"/>
                  <RenderIf condition={newUserState}>
                  <div className="mb-2">
                  <label>Confirme sua senha</label>
                  </div>
                  <input name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="••••••••" className="border-2 border-grey rounded-md py-1 px-2 mb-5"/>
                  </RenderIf>
                  <div>
                  <RenderIf condition={!newUserState}>
                  <button type="submit" className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4">Entrar</button>
                  <button className="bg-blue-600 py-2 px-2 hover:bg-blue-800 rounded-md mr-4" onClick={(e) => setNewUserState(true)}>Se Registrar</button>
                  </RenderIf>

                  <RenderIf condition={newUserState}>
                  <button type="submit" className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4">Cadastrar</button>
                  <button className="bg-red-400 py-2 px-2 hover:bg-red-600 rounded-md mr-4" onClick={(e) => setNewUserState(false)}>Cancelar</button>
                  </RenderIf>
                  
                  </div>
                  
                </form>
            </div>
        </Template>
    )
}

export default page