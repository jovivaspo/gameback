const Videogames = require('../models/Videogames')
const Users = require('../models/Users')
const orderGames = require('../helpers/orderGames')
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
    
        const { source, destination, snapgames } = req.body

        console.log(source,destination,snapgames)


        const updateSource = async () =>{
            try{
                console.log('origen: ', snapgames.gamesUser.games[source.droppableId]);
           
                snapgames.gamesUser.games[source.droppableId].forEach(async (el,index) => {
                    const gameToUpload = await Videogames.findById(el.id)
                    
                    gameToUpload.position = index
                    gameToUpload.status = source.droppableId
        
                    await gameToUpload.save()
                })
            }catch(err){console.log(err)}
           
        }

        const updateDestinition = async () =>{
            try{
            console.log('destino: ',snapgames.gamesUser.games[destination.droppableId] );
            if (source.droppableId !== destination.droppableId) {
                snapgames.gamesUser.games[destination.droppableId].forEach(async (el,index) => {
                    const gameToUpload = await Videogames.findById(el.id)
                    
                    gameToUpload.position = index
                    gameToUpload.status = destination.droppableId,
    
                    await gameToUpload.save()
                   
                })
    
            }else return false

        }catch(err){
            console.log(err)
        }
        }
    
        await Promise.all([updateDestinition(),updateSource()])

        const gamesUpdated = await orderGames(userId)

        console.log(gamesUpdated)


        res.status(200).json(gamesUpdated)



    } catch (error) {
        console.log(error)
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

       // const gameDeleted = await Videogames.findByIdAndDelete(gameId)

       const gameDeleted = await Videogames.findById(gameId)

        const status = gameDeleted.status

        const user = await Users.findById(userId)


       user.videogames = user.videogames.filter(el => {

            return el.toString() !== gameId
        })

        const userSaved = await user.save()

       const gamesUpdated = await orderGames(userId)

        if(gamesUpdated[status].length > 0){
          
            gamesUpdated[status].forEach( async (el,index)=>{
               
                if(el.position > index ){
                   
                    await Videogames.findByIdAndUpdate(el._id, {position:index})
                }
            })}
               
            
        res.status(200).json({
            message: 'Delete successful ✅',
            user: userSaved

        })
    } catch (error) {
        next(error)
    }



}
module.exports = videogameController


