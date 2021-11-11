const userModel = require('../models/user.model');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detecteMimeType !== 'image/jpg' &&
      req.file.detecteMimeType !== 'image/png' &&
      req.file.detecteMimeType !== 'image/jpeg'
    )
      throw Error('Format invalide');

    if (req.file.size > 500000) throw Error('Fichier lourd');


    const filename = req.body.name + ".jpg"
    await pipeline(req.file.stream, fs.createWriteStream(`${_direname}/../public/profil/${filename}`))
  } catch (error) {
    return res.status(400).json(error);
  }
};
