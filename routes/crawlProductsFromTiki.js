const express = require('express')
const { getDataProductsFromTiki, crawlFeaturedKeywords, crawlMenu, crawlGodBanner, crawlSideGodBanner, crawlHotDeals, crawlMiddleBanner } = require('../controller/crawlProductsFromTikiController')

const router = express.Router()

router.get('/products-tiki', getDataProductsFromTiki)
router.get('/featured-keywords', crawlFeaturedKeywords)
router.get('/menu-widgets', crawlMenu)
router.get('/god-banner', crawlGodBanner)
router.get('/side-god-banner', crawlSideGodBanner)
router.get('/hot-deals', crawlHotDeals)
router.get('/middle-banner', crawlMiddleBanner)

module.exports = router