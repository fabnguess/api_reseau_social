const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {signUpErrors} = require('../utils/errors.utils')

const maxAge = 3 * 24 * 60 * 60 * 1000 

const matchPassword = async (password, saltPassword) => {
    return await bcrypt.compare(password, saltPassword)  
}

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
       // Le token expire dans 3 jours
       expiresIn: maxAge
    })
}

exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body
    
    try {
        const user =  await UserModel.create({pseudo, email, password})
        res.status(201).json({ user})
        
    } catch (error) {
        const errors = signUpErrors(error)
        res.status(200).send({ errors })
    }
}

exports.signIn = async (req, res) => {
    const { email, password} = req.body
    // Recherche l'utilisateur dans la base de données
    const user =  await UserModel.findOne( {email} )

    if(!user){
        res.status(401).json({msg: "Email invalide"})
    }

    // Comparaison du mot de passse sasie et celui hashé en BD
    const isMatch = await matchPassword(password, user.password)
    // Verifie que le mot de passe à été bien matché
    if(!isMatch){
        res.status(401).json({msg: "Mot de passe invalide"})
    }

    const token = createToken(user._id)
    res.status(200).cookie('jwt', token, { httpOnly: true, maxAge}).json({user: user._id}) 
       
}

exports.logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1}).redirect('/api/user/login')
}


