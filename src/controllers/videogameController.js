const Videogames = require('../models/Videogames')
const Users = require('../models/Users')
const orderGames = require('../helpers/orderGames')
const { findOne, findById } = require('../models/Videogames')
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
            message: `${videogameSaved.name} Saved Successfully! ✅`,
            user: userSaved
        })


    } catch (error) {
        next(error)
    }
}

videogameController.updateList = async (req, res, next) => {

    try {

        console.log('Actualizando con nueva versión')

        const userId = req.params.userId

        const { source, destination, games } = req.body

        console.log(games.gamesUser.games)

        const updateSource = async () =>{
            console.log('origen');
            
            games.gamesUser.games[source.droppableId].forEach(async el => {
                const gameToUpload = await Videogames.findById(el.id)
                console.log(gameToUpload)
                gameToUpload.position = el.position,
                gameToUpload.status = el.status
    
                await gameToUpload.save()
            })
        }

        const updateDestinition = async () =>{
            console.log('destino');
            if (source.droppableId !== destination.droppableId) {
                games.gamesUser.games[destination.droppableId].forEach(async el => {
                    const gameToUpload = await Videogames.findById(el.id)
                    console.log(gameToUpload)
                    gameToUpload.position = el.position,
                    gameToUpload.status = el.status
    
                    await gameToUpload.save()
                })
    
            }else return false
        }
       

       



        /*

        const gamesBefore = await orderGames(userId)


        const arraySource = games[source.droppableId]
        const arrayDest = games [destination.droppableId]

        
        console.log(source.index)
        console.log(arraySource.length);
        
        console.log('Moviendo el elemento PRINCIPAL');

        const videogameToUpdate = await Videogames.findById(arraySource[source.index])

        videogameToUpdate.status = destination.droppableId
        videogameToUpdate.position = destination.index

        */

        await Promise.all([updateDestinition(),updateSource()])

        const gamesUpdated = await orderGames(userId)

        res.status(200).json(gamesUpdated)



    } catch (error) {
        next(error)
    }
}

videogameController.listGamesUser = async (req, res, next) => {
    try {
        const userId = req.params.userId

        const games = await orderGames(userId)

        res.status(200).json(games)

    } catch (error) { next(error) }
}

videogameController.deleteGameUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const gameId = req.params.gameId

        const gameDeleted = await Videogames.findByIdAndDelete(gameId)

        const user = await Users.findById(userId)

        user.videogames = user.videogames.filter(el => {

            return el.toString() !== gameId
        })

        const userSaved = await user.save()

        res.status(200).json({
            message: 'Delete successful ✅',
            user: userSaved

        })
    } catch (error) {
        next(error)
    }



}
module.exports = videogameController


