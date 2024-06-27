'use client'

import { Template, RenderIf } from "@/components"
import { useState } from "react"

const page = () => {

    const [toogleDeposit, setToogleDeposit] = useState(false)
    const [toogleWithdraw, setToogleWithdraw] = useState(false)
    const [toogleTransfer, setToogleTransfer] = useState(false)

    return (
        <Template>
            <div className="border-2 px-10 py-10 border-none rounded-md shadow-2xl">
                <h1 className="font-bold text-2xl">Saldo em conta</h1>
                <div className="flex space-between w-20 mt-5 mb-5 border-b-2px">
                    <div className="pt-12 pr-40">
                        <p className="font-semibold text-xl ">R$&nbsp;1000,00</p>
                        <p className="font-normal text-sm">Conferir extrato</p>
                    </div>
                    <div className="">
                        <p className="">Agencia: xxxx</p>
                        <p className="">Conta: xxxxx-x</p>
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
                                R$ <input type="number" placeholder="Insira o valor" className="border-b-2" />
                            </div>
                            <div className="mx-5 my-5">
                                <button className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4">Confirmar</button>
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
                                R$ <input type="number" placeholder="Insira o valor" className="border-b-2" />
                            </div>
                            <div className="mx-5 my-5">
                                <button className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4">Confirmar</button>
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
                            R$ <input type="number" placeholder="Insira o valor" className="border-b-2 mb-4" />
                            <div className="flex space-between">
                                <form>
                                    <div className="">
                                        <label>Conta</label>
                                        <label className="ml-40">&nbsp;&nbsp;&nbsp;Agência</label>
                                    </div>
                                    <div>
                                        <input type="number" className="border-b-2 " placeholder="N° Conta"/>
                                        <input type="number" className="border-b-2" placeholder="N° Agência"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="mx-5 my-5">
                            <button className="bg-green-400 py-2 px-2 hover:bg-green-600 rounded-md mr-4">Confirmar</button>
                            <button className="bg-red-400 py-2 px-2 hover:bg-red-600 rounded-md mr-10 mb-2" onClick={(e) => setToogleTransfer(false)}>Voltar</button>
                        </div>
                    </div>
                </RenderIf>
            </div>
        </Template>
    )
}

export default page