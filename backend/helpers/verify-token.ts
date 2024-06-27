const jwt = require('jsonwebtoken')
const getToken = require('./get-token')
import {Request, Response, NextFunction} from 'express'
const checkToken = (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.status(401).json({
            message: 'Acesso negado!'
        })
        return
    }

    const token = getToken(req)

    if (!token) {
        res.status(401).json({
            message: 'Acesso negado!'
        })

        return
    }

    try {

        const verified = jwt.verify(token, 'bancots')

        req.user = verified

        next()

    } catch (error) {
        res.status(400).json({
            message: 'Token invalido!'
        })

        return
    }
}

module.exports = checkToken
