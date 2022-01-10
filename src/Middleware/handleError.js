
const ERROR_HANDLERS = {
    CastError : (res,error)=> res.status(400).send({error: 'id used is malformed'}),
    ValidationError: (res,error)=> res.status(409).send({error: error.message}),
    JsonWebTokenError: (res,error) => res.status(401).json({error:'token missing or invalid'}),
    defaultError: (res,error)=> res.status(500).end()
}

module.exports = (error,req, res, next)=>{

    console.error(error.name)

  const  handlerError = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError

  handlerError(res,error)
}
