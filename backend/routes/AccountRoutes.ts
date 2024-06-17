import {Router} from 'express'
const AccountController = require('../controllers/AccountController')
import {AccountCreationValidation} from '../middlewares/accountValidation'
import {validate} from '../middlewares/handleValidation'
const verifyToken = require('../helpers/verify-token')

const router = Router()

export default
router.post('/create', AccountCreationValidation(), validate, AccountController.createAccount)
router.get('/', verifyToken, AccountController.getAccount)

