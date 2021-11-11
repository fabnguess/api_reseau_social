const express = require('express')
require('dotenv').config({ path: './config/.env' })
const db = require('./config/db')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')
const { checkUser, requireAuth } = require('./middleware/auth.middleware')
const cors = require('cors')

// Connexion de la BD
db()


const app = express()

// Mes Middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req, res) => {
        res.status(200).send(res.locals.user._id)
    })
    // routes
app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Ecoute sur le port: ${process.env.PORT}`)
})