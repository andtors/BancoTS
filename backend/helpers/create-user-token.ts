import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { IAccount } from '../interface/AccountInterface'

const createUserToken = async (account:IAccount, req: Request, res: Response) =>{

    const token = jwt.sign({
        name: account.name,
        email: account.email,
        id: account._id
    }, 'bancots')

    res.status(200).json({
        message: 'Você está autenticado!',
        token: token,
        accountId: account._id
    })
}

module.exports = createUserToken