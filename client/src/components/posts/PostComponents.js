import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import LikePost from "./LikePost";
import SavedComplaints from "./SavedComplaints";
import Comment from "./Comment";
import DeletePost from "./DeletePost";
import ResolveComplaints from "./ResolveComplaints";
import Modal from "./Modal";
import Modify from "../../hooks/Modify";
import Avatar from "../../styles/Avatar";
import { connect ,timeSince} from "../../utils/fetchdata";
import {ThemeContext} from "../../context/ThemeContext";
import { MoreIcon, CommentIcon, InboxIcon ,TickIcon} from "../../Icons";
import {logout} from "../home/Home";

export const ModalContentWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  text-align: center;
  span:last-child {
    border: none;
  }
  
  span {
    display: block;
    padding: 1rem 0;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    cursor: pointer;
  }
`;

export const ModalContent = ({ hideGotoPost, postId, closeModal,resolved,post,isMine}) => {
  const history = useHistory();  
  const handleGoToPost = () => {
    closeModal();
    history.push(`/p/${postId}`);
  };
  const ReportPost=()=>{
    history.push(`/report/${postId}`)
  }
  return (
    <ModalContentWrapper>
      <span className="danger" onClick={closeModal}>
        Cancel
      </span>
      {isMine?<DeletePost postId={postId} closeModal={closeModal} goToHome={true} />:
      <span className="danger" onClick={ReportPost}>
      Report
    </span>}
      {!hideGotoPost && <span onClick={handleGoToPost}>Go to Post</span>}      
      {isMine&&<ResolveComplaints postId={postId} closeModal={closeModal} isMarkResolved={resolved} post={post} />}
    </ModalContentWrapper>
  );
};

export const PostWrapper = styled.div`
  width: 615px;
  background: ${(props) => props.theme.white};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 1.5rem;
  .post-header-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .post-header {
    display: flex;
    align-items: center;
    padding: 1rem;
  }
  .post-header h3 {
    cursor: pointer;
  }
  .post-img {
    width: 100%;
    height: 100%;
  }
  .post-actions {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    padding-bottom: 0.2rem;
  }
  .post-actions svg:last-child {
    margin-left: auto;
  }
  .post-img-inverted{
    filter:invert(50%);
    width: 100%;
    height: 500px;
  }
  svg {
    margin-right: 1rem;
  }
  .likes-caption-comments {
    padding: 1rem;
    padding-top: 0.3rem;
  }
  .username {
    padding-right: 0.3rem;
  }
  .view-comments {
    color: ${(props) => props.theme.secondaryColor};
    cursor: pointer;
  }
  textarea {
    height: 43px;
    width: 100%;
    border: none;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    resize: none;
    padding: 1rem 0 0 1rem;
    font-size: 1rem;
    font-family: "Fira Sans", sans-serif;
  }
  @media screen and (max-width: 690px) {
    width: 99%;
  }
`;

const PostComponents = ({ post }) => {
  const comment = Modify("");
  const history = useHistory();
  const {theme} = useContext(ThemeContext);
  const [showModal, setShowModal] = useState(false);
  
  const closeModal = () => {
    setShowModal(false);    
  }

  const [newComments, setNewComments] = useState([]);
  const [likesState, setLikes] = useState(post.likesCount);

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);
  
  const handleAddComment = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      connect(`/complain/${post._id}/comments`, {
        body: { text: comment.value },
      }).then((resp) => setNewComments([...newComments, resp.data])).catch((err)=>{
        if(err.logout)
          logout();
      });

      comment.setValue("");
    }
  };

  return (
    <PostWrapper>
      <div className="post-header-wrapper">
        <div className="post-header">
        {post.resolved&&<TickIcon/>}
          <Avatar
            className="pointer"
            src={post.user?.avatar}
            alt="avatar"
            onClick={() => history.push(`/${post.user?.username}`)}
          />
          <h3
            className="pointer"
            onClick={() => history.push(`/${post.user?.username}`)}
          >
            {post.user?.username}
          </h3>
        </div>

        {showModal && (
          <Modal>
            <ModalContent isMine={post.isMine} postId={post._id} closeModal={closeModal} resolved={post.resolved} />
          </Modal>
        )}
        
        {<MoreIcon theme={theme} onClick={() => setShowModal(true)} />}
      </div>
      {post.files[0]?
      <img
        className="post-img"
        src={post.files[0]}
        alt="post-img"
      />
      :
      <img
        className="post-img-inverted"        
        src={"https://kkleap.github.io/assets/loaderi.gif"}
        alt="post-img"
      />
}

      <div className="post-actions">
        <LikePost
          isLiked={post.isLiked}
          postId={post._id}
          incLikes={incLikes}
          decLikes={decLikes}
        />
        <CommentIcon theme={theme} onClick={() => history.push(`/p/${post._id}`)} />
        <InboxIcon theme={theme} />
        <SavedComplaints isSaved={post.isSaved} postId={post._id} />
      </div>

      <div className="likes-caption-comments">
        {likesState !== 0 && (
          <span className="likes bold" style={{cursor:"pointer"}} onClick={()=>history.push(`/p/${post._id}`)}>
            {likesState} {likesState > 1 ? "likes" : "like"}
          </span>
        )}

        <p>
          <span
            onClick={() => history.push(`/${post.user?.username}`)}
            className="pointer username bold"
          >
            {post.user?.username}
          </span>
          {post.caption}
        </p>

        {post.commentsCount > 2 && (
          <span
            onClick={() => history.push(`/p/${post._id}`)}
            className="view-comments"
          >
            View all {post.commentsCount} comments
          </span>
        )}

        {post.comments?.slice(0, 2).map((comment) => (
          <Comment key={comment._id} hideavatar={true} comment={comment} />
        ))}

        {newComments.map((comment) => (
          <Comment key={comment._id} hideavatar={true} comment={comment} />
        ))}

        <span className="secondary">{timeSince(post?.createdAt)} ago</span>
      </div>

      <div className="add-comment">
        <textarea
          columns="3"
          placeholder="Add a Comment"
          value={comment.value}
          onChange={comment.onChange}
          onKeyDown={handleAddComment}
        ></textarea>
      </div>
    </PostWrapper>
  );
};

export default PostComponents;