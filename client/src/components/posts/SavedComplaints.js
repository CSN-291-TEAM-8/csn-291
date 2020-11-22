import React, { useEffect, useState,useContext } from "react";
import { connect } from "../../utils/fetchdata";
import { BookmarkIcon, FilledBookmarkIcon } from "../../Icons";
import {ThemeContext} from "../../context/ThemeContext";

const SavedComplaints = ({ isSaved, postId }) => {
  const [savedState, setSaved] = useState(isSaved);
  let {theme} = useContext(ThemeContext);
  theme = `${theme.primaryColor}`;
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
    return <FilledBookmarkIcon fill={theme} onClick={handleToggleSave} />;
  }

  if (!savedState) {
    return <BookmarkIcon fill={theme} onClick={handleToggleSave} />;
  }
};

export default SavedComplaints;