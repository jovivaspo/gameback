const mongoose = require('mongoose')

mongoose.connect(process.env.MONGOSE_URL,{
    useNewUrlParser:true,
    
})

mongoose.connection.once('open',()=>{
    console.log('DB is conected')
})