const express = require('express')
const cors = require('cors')
const app = express()

//Settings
app.set('port',process.env.PORT || 8001)


//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.route('/api/user', (req,res)=>{
    res.send('USERS')
})

module.exports = app