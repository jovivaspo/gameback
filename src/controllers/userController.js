const Users = require('../models/Users')
const userController = {}

userController.listUsers =  (req, res) =>{
   console.log('GET USERS')
   Users.find({})
   .then(users=>{
     
      if(users.length===0){
        return  res.status(404).send({message:'there are not users yet'})
      }

      res.json(users)
   })
   .catch(err=>next(err))
}

userController.createUsers = (req,res, next) => {
   const {name, email, password} = req.body

   Users.findOne({email})
   .then(user=>{
      if (user) return res.status(400).json({message:'User exist yet'}).end()
   })

   const newUser = new Users({
      name, password, email
   })

   newUser.encryptPassword(password)
   .then(hashPassword=> {
      console.log(hashPassword)
      newUser.password=hashPassword
      newUser.save()
      .then(userSaved=>res.json(userSaved)) //Hay que devolver id y token
      .catch(error=>next(error))
   
   })

}

userController.login =(req, res, next) =>{
   const {email,password} = req.body

   Users.findOne({email})
   .then(user=>{
     if(!user) return res.status(401).json({message:'email does not exit'})
     user.matchPassword(password)
     .then(match=>{
       // console.log(match)
        if(match){
          return res.status(200).json({
              id:user.id,  //Hay que devolver id y token
           })
        }else{
           return res.status(401).json({message:'Password incorrect'})
        }
     })
   })


   .catch(err=> next(err))
}

module.exports = userController



