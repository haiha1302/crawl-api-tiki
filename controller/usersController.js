const { db } = require('../database')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        const checkUser = await db.user.findOne({ email: email })

        if (checkUser)
            return res.status(400).json({msg: 'Email already exist!!!'})
        
        if (password.length < 8)
            return res.status(400).json({msg: 'Password is at least 8 characters long!!!'})

        const { salt, hashed } = generatePassword(password)

        const user = {
            username: username,
            email: email,
            password: password,
            salt: salt,
            hashed: hashed
        }

        await db.users.insertOne(user)

        // Create token to authentication
        const access_token = createAccessToken(user)
        const refresh_token = createRefreshToken(user)

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.json({access_token})
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const checkUser = await db.users.findOne({email: email})

        if (!checkUser) res.status(400).json({msg: 'User does not exist!!!'})

        if (!verifyPassword(password, checkUser.salt, checkUser.hashed)) res.status(400).json({msg: 'Incorrect password!!!'})

        // If login success, create token
        const access_token = createAccessToken({uuid: checkUser.uuid})
        const refresh_token = createRefreshToken({uuid: checkUser.uuid})

        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 30 * 24 * 60 * 60 * 1000
        })

        res.json({access_token})
    } catch(err) {
        return res.status(500).json({msg: err.message})
    }
}



const generatePassword = password => {
    const salt = crypto.randomBytes(128).toString('base64')

    const hashedPassword = crypto.pbkdf2Sync(
        password,
        salt,
        10000,
        256,
        'sha512'
    )

    return {
        hashed: hashedPassword.toString('hex'),
        salt: salt
    }
}

const verifyPassword = (password, salt, hashedPassword) => {
    const hashed = crypto.pbkdf2Sync(
        password, 
        salt, 
        10000, 
        256, 
        'sha512'
    )

    return hashed.toString('hex') === hashedPassword
}

const createAccessToken = user => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = user => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})
}