import {Router, Response, Request} from 'express'
const AccountController = require('../controllers/AccountController')
import {AccountCreationValidation} from '../middlewares/accountValidation'
import {validate} from '../middlewares/handleValidation'

const router = Router()

export default
router.post('/create', AccountCreationValidation(), validate, AccountController.createAccount)


