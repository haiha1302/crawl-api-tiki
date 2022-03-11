const express = require('express')
const { getDataProductsFromTiki, crawlFeaturedKeywords, crawlMenu } = require('../controller/crawlProductsFromTikiController')

const router = express.Router()

router.get('/products-tiki', getDataProductsFromTiki)
router.get('/featured-keywords', crawlFeaturedKeywords)
router.get('/menu-widgets', crawlMenu)

module.exports = router