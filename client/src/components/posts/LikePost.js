import React, { useEffect, useState } from "react";
import { connect } from "../../utils/fetchdata";
import { HeartIcon, FilledHeartIcon } from "../../Icons";

const LikePost = ({ isLiked, postId, incLikes, decLikes }) => {
  const [likedState, setLiked] = useState(isLiked);

  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const handleToggleLike = () => {
    if (likedState) {
      setLiked(false);
      decLikes();
      connect(`/complain/${postId}/toggleLike`);
    } else {
      setLiked(true);
      incLikes();
      connect(`/complain/${postId}/toggleLike`);
    }
  };

  if (likedState) {
    return <FilledHeartIcon onClick={handleToggleLike} />;
  }

  if (!likedState) {
    return <HeartIcon onClick={handleToggleLike} />;
  }
};

export default LikePost;