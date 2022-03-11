const express = require('express')
const productsController = require('../controller/productsController')

const router = express.Router()

router.get('/', productsController.getAllProducts)
router.get('/:uuid', productsController.getProductsDetail)
router.post('/', productsController.postProduct)

module.exports = router