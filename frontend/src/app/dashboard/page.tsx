'use client'

import { Template, RenderIf } from "@/components"
import { useEffect, useState } from "react"
import api from '@/utils/api'
import useAuth from "@/hooks/useAuth"

const page = () => {

    const [toogleDeposit, setToogleDeposit] = useState(false)
    const [toogleWithdraw, setToogleWithdraw] = useState(false)
    const [toogleTransfer, setToogleTransfer] = useState(false)
    
    const [accountBalance, setAccountBalance] = useState('')
    const [accountAgency, setAccountAgency] = useState('')
    const [userAccountNumber, setUserAccountNumber] = useState('')
    const [depositValue ,setDepositValue] = useState('')
    const [withdrawValue ,setWithdrawValue] = useState('')
    const [agencyNumber, setAgencyNumber] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [valueToTransfer, setValueToTransfer] = useState('')
    const { getUserToken } = useAuth()

    useEffect(() => {
        api.get('/').then((response) => {
            setAccountBalance(response.data.balance)
            setAccountAgency(response.data.agencynumber)
            setUserAccountNumber(response.data.accountnumber)
        })
    }, [deposit, transfer, withdraw])

    async function deposit(depositValue: any) {
    
        const response = getUserToken()
        const idAccount = response.id

        const accountData =  {
            idAccount,
            depositValue
        }

        await api.patch('/deposit', accountData)
        location.reload()
    }

    async function withdraw(withdrawValue: any) {
    
        const response = getUserToken()
        const idAccount = response.id

        const accountData =  {
            idAccount,
            withdrawValue
        }

        await api.patch('/withdraw', accountData)
        location.reload()
    
    }
    
    async function transfer(accountNumber: any, agencyNumber: any, valueToTransfer: any) {
        
        const response = getUserToken()
        const idAccount = response.id

        const accountData =  {
            accountNumber,
            agencyNumber,
            valueToTransfer,
            idAccount
        }

        await api.patch('/transaction', accountData)
        location.reload()
    }




    return (
        
        <Template>
            <div className="border-2 px-10 py-10 border-none rounded-md shadow-2xl">
                <div className="rounded-md shadow-2xl px-10 py-4 mb-4">
                <h1 className="font-bold text-2xl">Saldo em conta</h1>
                <div className="flex space-between w-20 mt-5 mb-5 border-b-2px ">
                    <div className="pt-12 pr-40">
                        <p className="font-semibold text-3xl ">R$&nbsp;{accountBalance}</p>
                        <p className="font-normal text-sm">Conferir extrato</p>
                    </div>
                    <div className="">
                        <p > <span className="font-bold">Agencia:</span> {accountAgency}</p>
                        <p > <span className="font-bold">Conta:</span> {userAccountNumber}</p>
                    </div>
                </div>
                </div>
                <div className="flex space-between">
                    <RenderIf condition={!toogleDeposit}>
                        <div className="border-2 px-20 py-20 border-none rounded-md shadow-md bg-blue-400 hover:bg-blue-600 transition" onClick={(e) => setToogleDeposit(true)}>
                            <p className="text-xl text-white font-semibold">Deposito</p>
                        </div>
                    </RenderIf>
                    <RenderIf condition={!!toogleDeposit}>
                        <div className="border-2 border-none rounded-md shadow-md">
                            <div className="mx-5 my-5">
                                <p className="mb-4">Insira o valor a ser depositado</p>
                                R$ <input name='deposit' value={depositValue} type="number" placeholder="Insira o valor" className="border-b-2" onChange={(e) => setDepositValue(e.target.value)}/>
                            </div>
                            <div className="mx-5 my-5">
                                <button className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4" onClick={(e) => deposit(Number(depositValue))}>Confirmar</button>
                                <button className="bg-red-400 py-2 px-2 hover:bg-red-600 rounded-md mr-10" onClick={(e) => setToogleDeposit(false)}>Voltar</button>
                            </div>
                        </div>
                    </RenderIf>
                    <RenderIf condition={!toogleWithdraw}>
                        <div className="border-2 px-20 py-20 border-none ml-5 rounded-md shadow-md bg-blue-400 hover:bg-blue-600 transition" onClick={(e) => setToogleWithdraw(true)}>
                            <p className="text-xl text-white font-semibold">Saque</p>
                        </div>
                    </RenderIf>
                    <RenderIf condition={!!toogleWithdraw}>
                        <div className="border-2 border-none rounded-md shadow-md">
                            <div className="mx-5 my-5">
                                
                                <p className="mb-4">Insira o valor a ser sacado</p>
                                R$ <input type="number" name="withdraw" value={withdrawValue} placeholder="Insira o valor" className="border-b-2"  onChange={(e) => setWithdrawValue(e.target.value)}/>
                            </div>
                            <div className="mx-5 my-5">
                                <button className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4" onClick={(e) => withdraw(Number(withdrawValue))}>Confirmar</button>
                                <button className="bg-red-400 py-2 px-2 hover:bg-red-600 rounded-md mr-10" onClick={(e) => setToogleWithdraw(false)}>Voltar</button>
                            </div>
                        </div>
                    </RenderIf>

                </div>
                <RenderIf condition={!toogleTransfer}>
                    <div className="border-2 px-20 py-20 border-none mt-5 rounded-md shadow-md bg-blue-400 hover:bg-blue-600 transition" onClick={(e) => setToogleTransfer(true)}>
                        <p className="text-xl text-white font-semibold">Transferencia</p>
                    </div>
                </RenderIf>
                <RenderIf condition={!!toogleTransfer}>
                    <div className="border-2 border-none rounded-md shadow-md">
                        <div className="mx-5 my-5">
                            <p className="mb-4">Insira o valor a ser transferido</p>
                            R$ <input type="number" value={valueToTransfer} placeholder="Insira o valor" className="border-b-2 mb-4" onChange={(e) => setValueToTransfer(e.target.value)}/>
                            <div className="flex space-between">
                                <form>
                                    <div className="">
                                        <label>Agência</label>
                                        <label className="ml-40">Conta</label>
                                    </div>
                                    <div>
                                        <input type="number" value={agencyNumber} className="border-b-2 " placeholder="N° Agência" onChange={(e) => setAgencyNumber(e.target.value)}/>
                                        <input type="number" value={accountNumber} className="border-b-2" placeholder="N° Conta" onChange={(e) => setAccountNumber(e.target.value)}/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mx-5 my-5">
                            <button className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4" onClick={(e) => transfer(Number(accountNumber), Number(agencyNumber), Number(valueToTransfer))}>Confirmar</button>
                            <button className="bg-red-400 py-2 px-2 hover:bg-red-600 rounded-md mr-10 mb-2" onClick={(e) => setToogleTransfer(false)}>Voltar</button>
                        </div>
                    </div>
                </RenderIf>
            </div>
        </Template>
    )
}

export default page


