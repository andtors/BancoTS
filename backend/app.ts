const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send({message: 'Olá'})
})

app.listen(3000)
