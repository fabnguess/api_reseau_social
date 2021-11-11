const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const objectID = require('mongoose').Types.ObjectId;

exports.readPost = (req, res) => {
  postModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error to get data : ' + err);
  });
};

exports.createPost = async (req, res) => {
  const newPost = new postModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (error) {
    return res.status(400).send(error);
  }
};

exports.updatePost = (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  const updateRecord = {
    message: req.body.message,
  };

  postModel.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log('Update error : ' + err);
    }
  );
};

exports.deletePost = (req, res) => {
  if (!objectID.isValid(req.params.id))
    return res.status(400).send('ID unknown :' + req.params.id);

  postModel.findOneAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log('Update error : ' + err);
  });
};
