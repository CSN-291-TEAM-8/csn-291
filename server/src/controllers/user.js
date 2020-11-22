const User = require("../models/User");
const Post = require("../models/Post");
const Notification = require('../models/Notification');
const asyncHandler = require("../middleware/asynchandler");

exports.getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find().select("-password").lean().exec();//select every user

  users.forEach((user) => {
    user.isFollowing = false;
    //set who are friend a user or not...later on only a chat between friends and friend will happen
    const followers = user.followers.map((follower) => follower._id.toString());
    if (followers.includes(req.user.id)) {
      user.isFollowing = true;
    }
  });

  users = users.filter((user) => user._id.toString() !== req.user.id);//do not include the same user

  res.status(200).json({ success: true, data: users,notices:req.notices });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ username: req.params.username });
  if(user._id.toString()===req.user.id){
    user = await User.findOne({ username: req.params.username })
    .select("-password")
    .populate({ path: "posts", select: "files commentsCount likesCount" })
    .populate({ path: "savedComplaints", select: "files commentsCount likesCount" })
    .populate({ path: "followers", select: "avatar username fullname" })
    .populate({ path: "following", select: "avatar username fullname" })     
    .lean()
    .exec();
  }
  else{
    user = await User.findOne({ username: req.params.username })
    .select("-password")
    .populate({ path: "posts", select: "files commentsCount likesCount" })
    .populate({ path: "taggedComplaints", select: "files commentsCount likesCount" })
    .populate({ path: "followers", select: "avatar username fullname" })
    .populate({ path: "following", select: "avatar username fullname" })     
    .lean()
    .exec();
  }

  if (!user) {
    return next({
      message: `The user ${req.params.username} is not found`,
      statusCode: 404,
    });
  }

  user.isFollowing = false;
  const followers = user.followers.map((friend) => friend._id.toString());

  user.followers.forEach((friend) => {
    friend.isFollowing = false;
    if (req.user.following.includes(friend._id.toString())) {
      friend.isFollowing = true;
    }
  });

  user.following.forEach((friend) => {
    friend.isFollowing = false;
    if (req.user.following.includes(friend._id.toString())) {
      friend.isFollowing = true;
    }
  });

  if (followers.includes(req.user.id)) {
    user.isFollowing = true;
  }

  user.isMe = req.user.id === user._id.toString();
  console.log("\n\n\nreq.user",user);
  res.status(200).json({ success: true, data: user,notices:req.notices });
});

exports.follow = asyncHandler(async (req, res, next) => {
  // make sure the user exists
  const user = await User.findById(req.params.id);

  if (!user) {
    return next({
      message: `No user found for id ${req.params.id}`,
      statusCode: 404,
    });
  }

  // make the sure the user is not the logged in user
  if (req.params.id === req.user.id) {
    return next({ message: "Woyla!Are you a combination of 2 soul??", status: 400 });
  }

  // only become follower if the user is not following already
  if (user.followers.includes(req.user.id)) {
    return next({ message: "You are already following", status: 400 });
  }

  await User.findByIdAndUpdate(req.params.id, {
    $push: { followers: req.user.id },
    $inc: { followerCount: 1 },
  });
  await Notification.create({
    sender:req.user.id,
    receiver:req.params.id,
    url:`/${req.user.username}`,
    notifiedMessage:`${req.user.username} started following you`
  })
  await User.findByIdAndUpdate(req.user.id, {
    $push: { following: req.params.id },
    $inc: { followingCount: 1 },
  });

  res.status(200).json({ success: true, data: {},notices:req.notices });
});

exports.unfollow = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next({
      message: `No user found for ID ${req.params.id}`,
      statusCode: 404,
    });
  }
  await Notification.find({
    sender:req.user.id,
    receiver:[req.params.id],
    url:`/${req.user.username}`,
    notifiedMessage:`${req.user.username} started following you`
  }).remove()

  // make the sure the user is not the logged in user
  if (req.params.id === req.user.id) {
    return next({ message: "de denge do mukka nach ke gir jaoge", status: 400 });
  }
 //remove both to their friend list
  await User.findByIdAndUpdate(req.params.id, {
    $pull: { followers: req.user.id },
    $inc: { followerCount: -1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { following: req.params.id },
    $inc: { followingCount: -1 },
  });

  res.status(200).json({ success: true, data: {},notices:req.notices });
});

exports.publicfeed = asyncHandler(async (req, res, next) => {
  const followers = req.user.followers;
  

  const users = await User.find()
    .where("_id")
    .in(followers.concat([req.user.id]))
    .exec();

  const postIds = users.map((user) => user.posts).flat();

  const posts = await Post.find({isPrivate:false})
    .populate({
      path: "comments",
      select: "text",
      populate: { path: "user", select: "avatar fullname username" },
    })
    .populate({ path: "user", select: "avatar fullname username" })
    .sort("-createdAt")    
    .lean()
    .exec();

  posts.forEach((post) => {
    // had the loggedin user liked the post
    post.isLiked = false;
    const likes = post.likes.map((like) => like.toString());
    if (likes.includes(req.user.id)) {
      post.isLiked = true;
    }

    // had the loggedin saved this post
    post.isSaved = false;
    const savedComplaints = req.user.savedComplaints.map((post) => post.toString());
    if (savedComplaints.includes(post._id)) {
      post.isSaved = true;
    }

    // is the post belongs to the same user
    post.isMine = false;
    if (post.user._id.toString() === req.user.id) {
      post.isMine = true;
    }

    // is the comment belongs to the same user
    post.comments.map((comment) => {
      comment.isCommentMine = false;
      if (comment.user._id.toString() === req.user.id) {
        comment.isCommentMine = true;
      }
    });
  });

  res.status(200).json({ success: true, data: posts ,notices:req.notices});
});

exports.searchUser = asyncHandler(async (req, res, next) => {
  
  if (!req.params.reg) {
    return next({ message: "The username cannot be empty", statusCode: 400 });
  }

  const regex = new RegExp(req.params.reg, "i");
  
  //let users = await User.find({ username: regex});
 User.find({fullname:regex}).then((data)=>{
  res.status(200).json({ success: true,notices:req.notices, data });
 });
  //let searchresult = users.concat(users2); 
 
});

exports.editDetails = asyncHandler(async (req, res, next) => {
  const { avatar, username, fullname, website, bio, email } = req.body;

  const fieldsToUpdate = {};
  if (avatar) fieldsToUpdate.avatar = avatar;
  if (username) fieldsToUpdate.username = username;
  if (fullname) fieldsToUpdate.fullname = fullname;
  if (email) fieldsToUpdate.email = email;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: { ...fieldsToUpdate, website, bio },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("avatar username fullname email bio website");

  res.status(200).json({ success: true, data: user,notices:req.notices });
});