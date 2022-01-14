const jwt = require('jsonwebtoken')
const protect = (req,res,next)=>{
    const authorization = req.get('authorization')

    const token = ''

    if(authorization && authorization.toLowerCase().startWith('bearer')){

        token = authorization.substring(7)
        console.log(token)

    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decodedToken)

    if(!token || !decodedToken.id){
        const error = new Error ('Missing or invalid token')
        res.status(401)
        next(error)
    }else{
        next()
    }

}

module.exports = protect