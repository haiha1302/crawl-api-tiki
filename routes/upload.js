const express = require('express')
const cloudinary = require('cloudinary')
const fs = require('fs')

const router = express.Router()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

router.post('/', (req, res) => {
    console.log(req.files);
    try {
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No file were upload!!!'})
    
        const file = req.files.file

        if (file.size > 1024 * 1024) {
            removeTempt(file.tempFilePath)
            return res.status(400).json({msg: 'File is too large!!!'})
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg') {
            removeTempt(file.tempFilePath)
            return res.status(400).json({msg: 'File format is incorrect!!!'})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: 'products'}, async (err, result) => {
            if (err) throw err

            removeTempt(file.tempFilePath)

            res.json({
                public_id: result.public_id,
                url: result.secure_url
            })
        })
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
})

const removeTempt = path => {
    fs.unlink(path, err => {
        if (err) throw err
    })
}

module.exports = router