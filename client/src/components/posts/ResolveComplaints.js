import React, { useContext } from "react";
import { toast } from "react-toastify";
import { FeedContext } from "../../context/FeedContext";
import { connect } from "../../utils/fetchdata";

const ResolveComplaints = ({ postId, closeModal, isMarkResolved,post }) => {
  const { feed, setFeed } = useContext(FeedContext);  

  const handleResolve = () => {
    closeModal();
    
    feed.forEach((post) => {(post._id === postId)&&(post.resolved=!isMarkResolved)});
    if(post){
        post.resolved= !isMarkResolved;
    }
    setFeed(feed);
    toast.success(`Your complain has been marked ${isMarkResolved?"unresolved":"resolved"} successfully`);
    const body = {
        markresolved:!isMarkResolved
    }
    connect(`/complain/resolve/${postId}`, { body });
  };

  return (
      isMarkResolved?
    <span style={{color:"#FF0"}} onClick={handleResolve}>
      Mark unresolved
    </span>
    :
    <span style={{color:"#0F0"}} onClick={handleResolve}>
      Mark resolved
    </span>
  );
};

export default ResolveComplaints;