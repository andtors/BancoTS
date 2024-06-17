import mongoose from 'mongoose'
import Logger from '../config/logger'

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/bancots')
        Logger.info('Conectou ao banco!')
    } catch (error) {
        Logger.error("Não foi possivel conectar!")
        Logger.error(`Erro: ${error}}`)
        process.exit(1)
    }
   
}

main().catch((err: any) => console.log(err))

module.exports = mongoose