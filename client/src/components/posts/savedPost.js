import React, { useEffect, useState } from "react";
import { connect } from "../../utils/fetchdata";
import { BookmarkIcon, FilledBookmarkIcon } from "../../Icons";

const savedPost = ({ isSaved, postId }) => {
  const [savedState, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleToggleSave = () => {
    if (savedState) {
      setSaved(false);
      connect(`/posts/${postId}/toggleSave`);
    } else {
      setSaved(true);
      connect(`/posts/${postId}/toggleSave`);
    }
  };

  if (savedState) {
    return <FilledBookmarkIcon onClick={handleToggleSave} />;
  }

  if (!savedState) {
    return <BookmarkIcon onClick={handleToggleSave} />;
  }
};

export default savedPost;