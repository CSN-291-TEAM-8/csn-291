import React, { useEffect, useState } from "react";
import { connect } from "../../utils/fetchdata";
import { BookmarkIcon, FilledBookmarkIcon } from "../../Icons";

const SavedComplaints = ({ isSaved, postId }) => {
  const [savedState, setSaved] = useState(isSaved);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  const handleToggleSave = () => {
    if (savedState) {
      setSaved(false);
      connect(`/complain/${postId}/toggleSave`);
    } else {
      setSaved(true);
      connect(`/complain/${postId}/toggleSave`);
    }
  };

  if (savedState) {
    return <FilledBookmarkIcon onClick={handleToggleSave} />;
  }

  if (!savedState) {
    return <BookmarkIcon onClick={handleToggleSave} />;
  }
};

export default SavedComplaints;