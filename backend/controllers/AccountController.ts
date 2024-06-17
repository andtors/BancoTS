import { Response, Request } from 'express'
import Logger from '../config/logger'
import bcrypt from 'bcrypt'
import { IAccount } from '../interface/AccountInterface'
const createUserToken = require('../helpers/create-user-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Account = require('../models/Account')

module.exports = class AccountController {

    static async createAccount(req: Request, res: Response) {

        const {
            name,
            email,
            password
        } = req.body

        const accountnumber = Math.floor(Math.random() * 1000000) + 1

        const agencynumber = Math.floor(Math.random() * 10000) + 1

        const balance = 0

        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        const newAccount = new Account({
            name,
            email,
            password: passwordHash,
            accountnumber,
            agencynumber,
            balance
        })

        console.log(newAccount)

        try {

            await newAccount.save()
            await createUserToken(newAccount, req, res)

        } catch (e: any) {
            Logger.error(`Erro no sistema:  ${e.message}`)
        }

    }

    static async getAccount(req: Request, res: Response) {

        let user

        if (req.headers.authorization) {
            user = await getUserByToken(req)

            user.password = undefined

        } else {
            res.status(401).send({ message: 'Não há usuarios logado.' })
        }

        res.status(201).send(user)

    }

    static async deposit(req: Request, res: Response) {

        const depositValue = req.body.depositValue

        const currentAccount = await getUserByToken(req)

        currentAccount.balance = currentAccount.balance + depositValue


        try {

            await Account.findByIdAndUpdate({ '_id': currentAccount._id }, currentAccount, { new: true })
            res.status(201).send({ message: 'Valor depositado com sucesso!' })
        } catch (error) {
            res.status(401).send({ message: `${error}` })
        }

    }

    static async withdraw(req: Request, res: Response) {

        const withdrawValue = req.body.withdrawValue

        const currentAccount = await getUserByToken(req)

        if (currentAccount.balance < withdrawValue) {
            return res.status(401).send({ message: 'Saldo insuficiente!' })
        }

        currentAccount.balance = currentAccount.balance - withdrawValue


        try {

            await Account.findByIdAndUpdate({ '_id': currentAccount._id }, currentAccount, { new: true })
            res.status(201).send({ message: 'Valor retirado com sucesso!' })
        } catch (error) {
            res.status(401).send({ message: `${error}` })
        }

    }


    static async transaction(req: Request, res: Response) {

        const { valueToTransfer, agencyNumber, accountNumber } = req.body

        const currentAccount = await getUserByToken(req)

        const checkAgencyNumberExists = await Account.findOne({ 'agencynumber': agencyNumber })

        if (!checkAgencyNumberExists) {
            return res.status(404).send({ message: 'Número da agência não encontrado!' })
        }

        const checkAccountNumberExists = await Account.findOne({ 'accountnumber': accountNumber })

        let accountToReceive

        if (!checkAccountNumberExists) {
            return res.status(404).send({ message: 'Número da conta não encontrado!' })
        } else {
            accountToReceive = await Account.findOne({ 'accountnumber': accountNumber })
        }

        if (currentAccount.balance < valueToTransfer) {
            return res.status(401).send({ message: 'Saldo insuficiente!' })
        }

        currentAccount.balance = currentAccount.balance - valueToTransfer

        accountToReceive.balance = accountToReceive.balance + valueToTransfer


        try {

            await Account.findByIdAndUpdate({ '_id': currentAccount._id }, currentAccount, { new: true })

            await Account.findByIdAndUpdate({ '_id': accountToReceive._id }, accountToReceive, { new: true })


            res.status(201).send({ message: 'Valor transferido com sucesso!' })
        } catch (error) {
            return res.status(501).send({ message: `${error}` })
        }

    }

    static async editAccount(req: Request, res: Response) {
        const id = req.params.id

        const { name, email, password, confirmPassword } = req.body

        const updatedData: IAccount = {
            name,
            email,
            password
        }

        const user = await getUserByToken(req)

        if (!name) {
            return res.status(422).json({ message: "O nome é obrigatorio!" })
        } else {
            updatedData.name = name
        }

        if (!email) {
            return res.status(422).json({ message: "O e-mail é obrigatorio!" })
        }

        const accountExists = await Account.findOne({ email: email })

        if (user.email !== email && accountExists !== null) {
            res.status(422).json({
                message: "E-mail já em uso!"
            })
            return
        }

        if (password !== confirmPassword) {
            return res.status(422).json({ message: "As senhas não são iguais!" })
        } else {

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            updatedData.password = passwordHash

        }

        try {

            await Account.findByIdAndUpdate({ '_id': id }, updatedData)

            return res.status(201).send({ message: 'Conta atualizado com sucesso!' })

        } catch (error) {
            return res.status(500).send({ message: error })
        }
    }
}

