import {Router} from 'express'
const AccountController = require('../controllers/AccountController')
import {AccountCreationValidation} from '../middlewares/accountValidation'
import {validate} from '../middlewares/handleValidation'
const verifyToken = require('../helpers/verify-token')

const router = Router()

export default
router.post('/create', AccountCreationValidation(), validate, AccountController.createAccount)
router.post('/login', AccountController.login)
router.get('/', verifyToken, AccountController.getAccount)
router.patch('/transaction', verifyToken, AccountController.transaction)
router.patch('/deposit', verifyToken, AccountController.deposit)
router.patch('/withdraw', verifyToken, AccountController.withdraw)
router.patch('/editaccount/:id', verifyToken, AccountController.editAccount)
