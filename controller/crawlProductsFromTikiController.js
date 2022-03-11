const axios = require('axios')
require('dotenv').config()

const getCategoriesFromTiki = async (req, res) => {
    try {
        const data = await axios.get(process.env.TIKI_LIST_CATEGORIES_URL)
        res.status(200).json(data.data.data)
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

const getDataProductsFromTiki = async (req, res) => {
    try {
        const data = await axios.get(process.env.TIKI_PRODUCTS_URL, {
            params: {
                limit: 40,
                is_mweb: 1,
                aggregations: 2,
                page: 1
            }
        })
        res.status(200).json(data.data.data)
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

const crawlFeaturedKeywords = async (req, res) => {
    try {
        const data = await axios.get('https://tiki.vn/api/shopping/v2/featured_keywords?page_name=HomePage')
        res.status(200).json(data.data.data)
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

const crawlMenu = async (req, res) => {
    try {
        const data = await axios.get('https://api.tiki.vn/shopping/v2/widgets/home-category-tab-bar?trackity_id=aabd9a13-8abf-793a-4dc1-6b6e04e0bf54')
        res.status(200).json(data.data.data)
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
}

module.exports = { getDataProductsFromTiki, crawlFeaturedKeywords, crawlMenu }