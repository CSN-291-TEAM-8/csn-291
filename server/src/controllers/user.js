const User = require("../models/User");
const Post = require("../models/post");
const asyncHandler = require("../middlewares/asynchandler");

exports.getUsers = asyncHandler(async (req, res, next) => {
  let users = await User.find().select("-password").lean().exec();//select every user

  users.forEach((user) => {
    user.isFriend = false;
    //set who are friend a user or not...later on only a chat between friends and friend will happen
    const friends = user.friends.map((friend) => friend._id.toString());
    if (friends.includes(req.user.id)) {
      user.isFriend = true;
    }
  });

  users = users.filter((user) => user._id.toString() !== req.user.id);//do not include the same user

  res.status(200).json({ success: true, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username })
    .select("-password")
    .populate({ path: "posts", select: "files commentsCount likesCount" })
    .populate({ path: "savedComplaints", select: "files commentsCount likesCount" })
    .populate({ path: "friends", select: "avatar username fullname" })
    .populate({ path: "friend", select: "avatar username fullname" })
    .lean()
    .exec();

  if (!user) {
    return next({
      message: `The user ${req.params.username} is not found`,
      statusCode: 404,
    });
  }

  user.isFriend = false;
  const friends = user.friends.map((friend) => friend._id.toString());

  user.friends.forEach((friend) => {
    friend.isFriend = false;
    if (req.user.friends.includes(friend._id.toString())) {
      friend.isFriend = true;
    }
  });

  user.friends.forEach((user) => {
    user.isFriend = false;
    if (req.user.friends.includes(user._id.toString())) {
      user.isFriend = true;
    }
  });

  if (friends.includes(req.user.id)) {
    user.isFriend = true;
  }

  user.isMe = req.user.id === user._id.toString();

  res.status(200).json({ success: true, data: user });
});

exports.friend = asyncHandler(async (req, res, next) => {
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

  // only become friend if the user is not friend already
  if (user.friends.includes(req.user.id)) {
    return next({ message: "You both are already friend", status: 400 });
  }

  await User.findByIdAndUpdate(req.params.id, {
    $push: { friends: req.user.id },
    $inc: { friendCount: 1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $push: { friends: req.params.id },
    $inc: { friendCount: 1 },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.unfriend = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next({
      message: `No user found for ID ${req.params.id}`,
      statusCode: 404,
    });
  }

  // make the sure the user is not the logged in user
  if (req.params.id === req.user.id) {
    return next({ message: "de denge do mukka nach ke gir jaoge", status: 400 });
  }
 //remove both to their friend list
  await User.findByIdAndUpdate(req.params.id, {
    $pull: { friends: req.user.id },
    $inc: { friendCount: -1 },
  });
  await User.findByIdAndUpdate(req.user.id, {
    $pull: { friends: req.params.id },
    $inc: { friendCount: -1 },
  });

  res.status(200).json({ success: true, data: {} });
});

exports.publicfeed = asyncHandler(async (req, res, next) => {
  const friends = req.user.friends;

  const users = await User.find()
    .where("_id")
    .in(friends.concat([req.user.id]))
    .exec();

  const postIds = users.map((user) => user.posts).flat();

  const posts = await Post.find()
    .populate({
      path: "comments",
      select: "text",
      populate: { path: "user", select: "avatar fullname username" },
    })
    .populate({ path: "user", select: "avatar fullname username" })
    .sort("-createdAt")
    .where("_id")
    .in(postIds)
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

  res.status(200).json({ success: true, data: posts });
});

exports.searchUser = asyncHandler(async (req, res, next) => {
  if (!req.query.username) {
    return next({ message: "The username cannot be empty", statusCode: 400 });
  }

  const regex = new RegExp(req.query.username, "i");
  const users = await User.find({ username: regex });

  res.status(200).json({ success: true, data: users });
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

  res.status(200).json({ success: true, data: user });
});