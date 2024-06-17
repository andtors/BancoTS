import {body} from 'express-validator'
const Account = require('../models/Account')

export const AccountCreationValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('O nome é obrigatorio!'),
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatorio!')
            .custom(async value => {
                let emailCheck = await Account.findOne({ 'email': value });
                if (emailCheck !== null) {
                 return Promise.reject()
                }
              })
              .withMessage('E-mail já em uso'),
        body('password')
            .isString()
            .withMessage('A senha é obrigatória!'),
        body('confirmPassword')
            .isString()
            .withMessage('A confirmação de senha é obrigatória!')
            .custom((value: string , {req}) => {
                return value === req.body.password
            })
    ]
}