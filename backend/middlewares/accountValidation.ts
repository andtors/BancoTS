import {body} from 'express-validator'

export const AccountCreationValidation = () => {
    return [
        body('name')
            .isString()
            .withMessage('O nome é obrigatorio!'),
        body('email')
            .isString()
            .withMessage('O e-mail é obrigatorio!'),
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