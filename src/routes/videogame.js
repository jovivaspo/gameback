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

module.exports = router