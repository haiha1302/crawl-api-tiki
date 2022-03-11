const { db } = require('../database')
const { v4: uuid } = require('uuid')

const getAllProducts = async (req, res) => {
    const allProducts = await db.products.find({}).toArray()
    res.json(allProducts)
}

const getProductsDetail = async (req, res) => {
    const productDetail = await db.products.find({
        uuid: req.params.uuid
    }).toArray()
    res.json(productDetail)
}

const postProduct = async (req, res) => {
    const product = {
        uuid: uuid(),
        ...req.body,   
    }

    await db.products.insertOne(product)
    res.json(product)
}

const updateProduct = async (req, res) => {
    const checkProduct = await db.products.findOne({
        uuid: req.params.uuid
    })
}

module.exports = { getAllProducts, getProductsDetail, postProduct }