const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const { connectToMongo } = require('./database')
const routerProduct = require('./routes/products')
const routerUpload = require('./routes/upload')
const routerCrawlTiki = require('./routes/crawlProductsFromTiki')

require('dotenv').config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true
}))

app.get('/', (req, res) => {
    res.json('Hello!!!')
})

app.use('/products', routerProduct)
app.use('/upload', routerUpload)
app.use('/tiki', routerCrawlTiki)

connectToMongo()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running at post ${PORT} !!!`);
})