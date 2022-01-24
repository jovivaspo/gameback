const {Router} = require('express')
const protect = require ('../Middleware/protect')
const videogameController = require('../controllers/videogameController')

const router = Router()
/***********PARA MI************************* */
router.route('/')
.get(protect,videogameController.list)


router.route('/delete/:id')
.delete(protect,videogameController.delete)
/***************************************** */

router.route('/list/:userId')
.get(protect,videogameController.listGamesUser)

router.route('/add')
.post(protect,videogameController.add)

router.route('/delete/:userId/:gameId')
.delete(protect,videogameController.deleteGameUser)

router.route('/updateList/:userId')
.put(protect,videogameController.updateList)

router.route('/game/:userId/:gameId')
.get(protect,videogameController.getGame)

router.route('/update/:gameId')
.put(protect,videogameController.updateGame)


module.exports = router