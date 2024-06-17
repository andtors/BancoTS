const mongoose = require('../db/conn')
import { Schema } from 'mongoose'

const Account = mongoose.model(
    'Account',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        accountnumber: {
            type: Number,
            required: true
        },
        agencynumber: {
            type: Number,
            required: true
        },
        balance: {
            type: Number,
            required: true
        },
    },
        { timestamps: true }
    )
)

module.exports = Account