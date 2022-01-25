const express = require('express')
const cors = require('cors')
const notFound = require('./Middleware/notFound')
const handleError = require('./Middleware/handleError')
const path = require('path')

const app = express()

//Settings
app.set('port',process.env.PORT || 8001)


//Middleware
app.use(cors())
app.use(express.json())
//Routes

app.use('/api/users', require('./routes/users'))
app.use('/api/videogame', require('./routes/videogame'))


//Deploy

__dirname = path.resolve()
if(process.env.Node_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'/gameback/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'gameback','build','index.html'))
    })
}else{
    app.get('/',(req,res)=>{res.send('Welcome')})
}

//Errors
app.use(notFound)
app.use(handleError)



module.exports = app