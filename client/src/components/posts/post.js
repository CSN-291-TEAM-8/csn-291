import React, { useRef, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import LikePost from "./LikePost";
import SavedComplaints from "./savedPost"; 
import Comment from "./comment";
import Placeholder from "../utility/NotFound";
import Avatar from "../../styles/Avatar";
import Loader from "../utility/Loader";
import Modal from "./Modal";
import { ModalContent } from "./PostComponents";
import modify from "../../hooks/modify";
import { timeSince,connect } from "../../utils/fetchdata";
import { MoreIcon, CommentIcon, InboxIcon } from "../../Icons";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 1fr;
  .post-info {
    border: 1px solid ${(props) => props.theme.borderColor};
  }
  .post-header-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  .post-header {
    display: flex;
    align-items: center;
  }
  .post-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .post-actions-stats {
    padding: 1rem;
    padding-bottom: 0.1rem;
  }
  .post-actions {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
  }
  .post-actions svg:last-child {
    margin-left: auto;
  }
  .comments {
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    padding: 1rem;
    height: 300px;
    overflow-y: scroll;
    scrollbar-width: none;
  }
  .comments::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
  svg {
    margin-right: 1rem;
  }
  textarea {
    height: 100%;
    width: 100%;
    background: ${(props) => props.theme.bg};
    border: none;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    resize: none;
    padding: 1rem 0 0 1rem;
    font-size: 1rem;
    font-family: "Fira Sans", sans-serif;
  }
  @media screen and (max-width: 840px) {
    display: flex;
    flex-direction: column;
    .comments {
      height: 100%;
    }
  }
`;

const post = () => {
  const history = useHistory();
  const { postId } = useParams();

  const comment = modify("");
  const commmentsEndRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  const [loading, setLoading] = useState(true);
  const [notFound, setnotFound] = useState(false);
  const [post, setPost] = useState({});

  const [likesState, setLikes] = useState(0);
  const [commentsState, setComments] = useState([]);

  const incLikes = () => setLikes(likesState + 1);
  const decLikes = () => setLikes(likesState - 1);

  const scrollToBottom = () =>
    commmentsEndRef.current.scrollIntoView({ behaviour: "smooth" });

  const handleAddComment = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();

      connect(`/posts/${post._id}/comments`, {
        body: { text: comment.value },
      }).then((resp) => {
        setComments([...commentsState, resp.data]);
        scrollToBottom();
      });

      comment.setValue("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    connect(`/posts/${postId}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments);
        setLikes(res.data.likesCount);
        setLoading(false);
        setnotFound(false);
      })
      .catch((err) => setnotFound(true));
  }, [postId]);

  if (!notFound && loading) {
    return <Loader />;
  }

  if (notFound) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text="Make sure you are visiting a valid link"
      />
    );
  }

  return (
    <Wrapper>
      <img
        className="post-img"
        src={post.files?.length && post.files[0]}
        alt="post"
      />

      <div className="post-info">
        <div className="post-header-wrapper">
          <div className="post-header">
            <Avatar
              onClick={() => history.push(`/${post.user?.username}`)}
              className="pointer avatar"
              src={post.user?.avatar}
              alt="avatar"
            />

            <h3
              className="pointer"
              onClick={() => history.push(`/${post.user?.username}`)}
            >
              {post.user?.username}
            </h3>
          </div>
          {post.isMine && <MoreIcon onClick={() => setShowModal(true)} />}

          {showModal && (
            <Modal>
              <ModalContent
                postId={post._id}
                hideGotoPost={true}
                closeModal={closeModal}
              />
            </Modal>
          )}
        </div>

        <div className="comments">
          {commentsState.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
          <div ref={commmentsEndRef} />
        </div>

        <div className="post-actions-stats">
          <div className="post-actions">
            <LikePost
              isLiked={post?.isLiked}
              postId={post?._id}
              incLikes={incLikes}
              decLikes={decLikes}
            />
            <CommentIcon />
            <InboxIcon />
            <SavedComplaints isSaved={post?.isSaved} postId={post?._id} />
          </div>

          {likesState !== 0 && (
            <span className="likes bold">
              {likesState} {likesState > 1 ? "likes" : "like"}
            </span>
          )}
        </div>

        <span
          style={{ display: "block", padding: "0 1rem", paddingBottom: "1rem" }}
          className="secondary"
        >
          {timeSince(post.createdAt)} ago
        </span>

        <div className="add-comment">
          <textarea
            columns="2"
            placeholder="Add a Comment"
            value={comment.value}
            onChange={comment.onChange}
            onKeyDown={handleAddComment}
          ></textarea>
        </div>
      </div>
    </Wrapper>
  );
};

export default post;