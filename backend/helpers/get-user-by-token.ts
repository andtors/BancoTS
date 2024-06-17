const jwt = require('jsonwebtoken')

import {Request, Response} from 'express'

const Account = require('../models/Account')

const getToken = require('../helpers/get-token')

const getUserByToken = async(req: Request, res:Response) => {

    const token =  getToken(req)

    if(!token){
        return res.status(401).json({message: 'Acesso negado!'})
    }

    const decoded = jwt.verify(token, 'bancots')

    const userId = decoded.id

    const account = await Account.findOne({_id: userId})

    return account
}

module.exports = getUserByToken