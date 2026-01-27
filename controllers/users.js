const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Follow = require('../models/follow')

const verifyToken = require('../middleware/verify-token');


const getFollowList = async ({filter, populateField}) =>{
  const follows = await Follow.find(filter).populate(populateField, 'username');

  return follows.map(follow => follow[populateField])
}

const getFollowingList = async (userId) =>{
  const filter = {follower:userId}
  const populateField = 'following'

  const following = await getFollowList({filter,populateField})
  return following
}

const getFollowerList = async(userId) =>{
  const filter = {following: userId}
  const populateField = "follower"

  const followers = await getFollowList({filter,populateField})
  return followers
}

router.get('/', verifyToken, async (req, res) => {
  try {
    const users = await User.find({}, "username");

    res.json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.get('/:userId', verifyToken, async (req, res) => {
  try {
    if (req.user._id !== req.params.userId){
      return res.status(403).json({ err: "Unauthorized"});
    }

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ err: 'User not found.'});
    }

    res.json({ user });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post('/:userId/follow',verifyToken,async(req,res)=>{
  try{
    const followerId= req.user._id;
    const followingId = req.params.userId;
    
    if(followerId.toString()=== followingId.toString()){
      return res.status(400).json({err: "You cannot follow yourself"})
    }
    
    await Follow.create({
      follower:followerId,
      following: followingId
    })
    
    return res.status(200).json({
      follower:followerId,
      following: followingId
    })
  }catch(err){
    res.status(500).json({err: err.message})
  }
})

router.get('/me/following', verifyToken,async(req,res)=>{
  try{
    const userId = req.user._id;
    const following = await getFollowingList(userId)
    return res.status(200).json({following})
  }catch(err){
    return res.status(500).json({err: err.message})
  }
})

router.get('/me/followers', verifyToken, async(req,res)=>{
  try{
    const userId= req.user._id;
    const followers = await getFollowerList(userId)

    return res.status(200).json({followers})

  }catch(err){
    return res.status(500).json({err: err.message})
  }
})

router.get('/:userId/following', verifyToken, async(req,res)=>{
  try{
    const userId = req.params.userId;
    const following = await getFollowingList(userId)
    return res.status(200).json({following})

  }catch(err){
    return res.status(500).json({err:err.message})
  }
})


module.exports = router;
