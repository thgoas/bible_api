const {Router} = require('express')

const photoController = require('../controllers/photo')
const router = new Router()



router.post('/', photoController.store)

module.exports = router