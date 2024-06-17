import { Response, Request } from 'express'
import Logger from '../config/logger'
import bcrypt from 'bcrypt'
const createUserToken = require('../helpers/create-user-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Account = require('../models/Account')

module.exports = class AccountController {
    static async createAccount(req: Request, res: Response){

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

        const newAccount = new Account ({
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
            
        } catch (e:any) {
            Logger.error(`Erro no sistema:  ${e.message}`)
        }

        }

        static async getAccount(req:Request, res: Response) {

            let user

            if(req.headers.authorization){
                user = await getUserByToken(req)

                user.password = undefined
                user.balance = undefined
                
            } else {
                res.status(401).send({message: 'Não há usuarios logado.'})
            }

            res.status(201).send(user)

        }
    }

