const userModel = require('../models/user.model')
const objectID= require('mongoose').Types.ObjectId


exports.getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find().select('-password')
        res.status(200).json(users)  
    } catch (error) {
        res.send(error) 
    }
    
}

exports.userInfo = async (req, res) => {
    if(!objectID.isValid(req.params.id))  
    return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try {
        const user = await userModel.findById(req.params.id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(400).send(error)
    }
    
}

exports.updateUser = async (req, res) => {
    if(!objectID.isValid(req.params.id))  
    return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try {
        const user = await userModel.findOneAndUpdate({_id: req.params.id},{$set:{bio: req.body.bio}},
            {new: true, upsert: true, setDefaultsOnInsert: true}).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
    
}

exports.deleteUser = async (req, res) => {
    if(!objectID.isValid(req.params.id))  
    return res.status(400).send('ID inconnu : ' + req.params.id)
    
    try {
        const user = await userModel.deleteOne({_id: req.params.id}).exec()
           
        res.status(200).json(user)
    } catch (error) {
        res.status(500).send(error)
    }
    
}