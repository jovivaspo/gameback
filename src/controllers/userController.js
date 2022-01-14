const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const createToken = require('../helpers/jwt')


const userController = {}

userController.listUsers = (req, res) => {
   console.log('GET USERS')
   Users.find({})
      .then(users => {

         if (users.length === 0) {
            return res.status(404).send({ message: 'there are not users yet' })
         }

         res.status(200).json(users).end()
      })
      .catch(err => next(err))
}

userController.createUsers = (req, res, next) => {
   console.log('CREATE USER')
   const { name, email, password } = req.body

   Users.findOne({ email })
      .then(user => {
         if (user) {
            console.log('Usuario existe ya')
            res.status(400)
            const err = new Error('There is an user with this email yet')
            err.name = 'UserExistYet'
            return next(err)
         }

         const newUser = new Users({
            name, password, email
         })

         newUser.encryptPassword(password)
            .then(hashPassword => {
               console.log(hashPassword)
               newUser.password = hashPassword
               newUser.save()
                  .then(userSaved => {
                     const { id, email } = userSaved
                     const token = createToken(id,email)
                     res.status(201).json({
                        token,
                        id,
                        email
                     }).end()
                  }) //Hay que devolver id y token
                  .catch(error => next(error))

            })

      }).catch(err => next(err))



}

userController.login = (req, res, next) => {
   console.log('LOGIN')
   const { email, password } = req.body

   Users.findOne({ email })
      .then(user => {
         if (!user) {
            const error = new Error('Email does not exist')
            res.status(404)
            next(error)

         } else {
            user.matchPassword(password)
               .then(match => {
                  // console.log(match)
                  if (match) {
                     const { id, email } = user
                     const token = createToken(id,email)
                     return res.status(200).json({
                        token,
                        id,
                        email //Hay que devolver id y token
                     })
                  } else {
                     const error = new Error('Password incorrect')
                     res.status(401)
                     next(error)
                  }
               })
               .catch(error => next(error))
         }
      }).catch(err => next(err))
}

module.exports = userController



