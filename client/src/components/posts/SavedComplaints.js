import React, { useEffect, useState,useContext } from "react";
import { connect } from "../../utils/fetchdata";
import { BookmarkIcon, FilledBookmarkIcon } from "../../Icons";
import {ThemeContext} from "../../context/ThemeContext";

const SavedComplaints = ({ isSaved, postId }) => {
  const [savedState, setSaved] = useState(isSaved);
  const {theme} = useContext(ThemeContext);
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
    return <FilledBookmarkIcon theme={theme} onClick={handleToggleSave} />;
  }

  if (!savedState) {
    return <BookmarkIcon theme={theme} onClick={handleToggleSave} />;
  }
};

export default SavedComplaints;