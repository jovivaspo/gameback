const Videogames = require('../models/Videogames')
const Users = require('../models/Users')
const videogameController = {}

videogameController.list = async (req, res, next) => {
    try {

        const list = await Videogames.find({})

        res.status(200).json(list)

    } catch (error) {
        next(error)
    }
}


videogameController.delete = async (req, res, next) => {
    try {

        const id = req.params.id

        await Videogames.findByIdAndDelete(id)

        res.status(200).json('Deleted successfully')
    } catch (error) {
        next(error)
    }
}

videogameController.add = async (req, res, next) => {

    try {
        const { name, userId, url_image, status, rating, comment, position } = req.body

        const user = await Users.findById(userId)

        const newGame = new Videogames({
            name,
            userId,
            url_image,
            rating,
            status,
            comment,
            position

        })
        const videogameSaved = await newGame.save()

        console.log(videogameSaved)

        user.videogames = user.videogames.concat(videogameSaved._id)

        const userSaved = await user.save()

        res.status(201).json({
            message: `${videogameSaved.name} saved successfully`,
            user: userSaved
        })


    } catch (error) {
        next(error)
    }



}

videogameController.listGamesUser = async (req, res, next) => {
    try {
        const userId = req.params.userId

        //console.log(userId)

        const user = await Users.findById(userId).populate('videogames',{userId:0})

       // console.log(user)

        let games = {
            'Not Status':[],
            'Not Started':[],
            'In Progress':[],
            Completed:[],
            Abandoned:[]
        }  

        user.videogames.forEach(el=>{
            games[el.status] = games[el.status].concat(el)
        })

        res.status(200).json(games)

    } catch (error) { next(error) }
}

videogameController.deleteGameUser = async (req,res, next) => {
    const userId = req.params.userId
    const gameId = req.params.gameId

    const gameDeleted = await Videogames.findByIdAndDelete(gameId)

    const user = await Users.findById(userId)

    user.videogames = user.videogames.filter(el=>{
       
        return el.toString()!== gameId
    })

    const userSaved = await user.save()

    res.status(200).json({
        message:'Delete successful',
        user: userSaved

    })


}
module.exports = videogameController


