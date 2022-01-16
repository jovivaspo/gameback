const express = require('express')
const cors = require('cors')
const notFound = require('./Middleware/notFound')
const handleError = require('./Middleware/handleError')
const app = express()

//Settings
app.set('port',process.env.PORT || 8001)


//Middleware
app.use(cors())
app.use(express.json())
//Routes
app.get('/',(req,res)=>{res.send('Welcome')})
app.use('/api/users', require('./routes/users'))
app.use('/api/videogame', require('./routes/videogame'))

//Errors
app.use(notFound)
app.use(handleError)



module.exports = app