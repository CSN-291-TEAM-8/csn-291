import React, { useEffect, useState,useContext } from "react";
import { connect } from "../../utils/fetchdata";
import {ThemeContext} from "../../context/ThemeContext";
import { HeartIcon, FilledHeartIcon } from "../../Icons";

const LikePost = ({ isLiked, postId, incLikes, decLikes }) => {
  const [likedState, setLiked] = useState(isLiked);
  const {theme} = useContext(ThemeContext);

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
    return <HeartIcon onClick={handleToggleLike} theme={theme}/>;
  }
};

export default LikePost;