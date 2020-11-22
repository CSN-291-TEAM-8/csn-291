import React, { useRef, useState, useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import LikePost from "./LikePost";
import { toast } from "react-toastify";
import SavedComplaints from "./SavedComplaints"; 
import Comment from "./Comment";
import Placeholder from "../utility/Placeholder";
import Avatar from "../../styles/Avatar";
import Loader from "../utility/Loader";
import Modal from "./Modal";
import { ModalContent } from "./PostComponents";
import modify from "../../hooks/Modify";
import { timeSince,connect } from "../../utils/fetchdata";
import {ThemeContext} from "../../context/ThemeContext";
import { MoreIcon, CommentIcon, InboxIcon,TickIcon,CloseIcon} from "../../Icons";
import {MobileWrapper,modalHeaderStyle,ModalContentWrapper} from "../dashboard/ProfileHeader";
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
  svg[aria-label="saved"]{
    fill: ${(props) => props.theme.primaryColor} !important;
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
  .post-img-inverted{
    filter:invert(50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  textarea {
    height: 43px;
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
    

 .post-info{
   display:flex;
   flex-direction:column;
 }
 .comments {
  height: 100%;
  order:5
}
.post-actions-state{
  order:2;
}
 .secondry{
   order:3;
 }
 .add-comment{
   order:4;
   border:1px solid #3333;
 }
  }
`;

const Post = () => {
  const history = useHistory();
  const { postId } = useParams();
  const {theme} = useContext(ThemeContext);
  const comment = modify("");
  const commmentsEndRef = useRef(null);
  const [showlikes,setShowLikes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    setShowLikes(false);
  }
  const showlikewalaModal = ()=>{
    // if(screen.availWidth<600){
    //   history.push(`/likes/${post._id}`)
    // }
    // else{
      setShowLikes(true);
    //}
  }
  const [err,setErr] = useState("The requested post was not found");
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

      connect(`/complain/${post._id}/comments`, {
        body: { text: comment.value },
      }).then((resp) => {
        setComments([...commentsState, resp.data]);
        scrollToBottom();
      }).catch((err) => {toast.error(err.message)});

      comment.setValue("");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    connect(`/complain/${postId}`)
      .then((res) => {
        setPost(res.data);
        setComments(res.data.comments);
        setLikes(res.data.likesCount);
        setLoading(false);
        setnotFound(false);
      })
      .catch((err) => {setErr("This complain post is non-accessible");setnotFound(true)});
  }, [postId]);

  if (!notFound && loading) {
    return <Loader />;
  }

  if (notFound) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text={err}
      />
    );
  }

  return (
    <Wrapper>
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
      <div className="post-info">
        <div className="post-header-wrapper">
          <div className="post-header">
            {post.resolved&&<TickIcon/>}
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
          {<MoreIcon theme={theme} onClick={() => setShowModal(true)} />}

          {showModal && (
            <Modal>
              <ModalContent
                postId={post._id}
                isMine={post.isMine}
                post={post}
                hideGotoPost={true}
                closeModal={closeModal}
                resolved={post.resolved}
              />
            </Modal>
          )}
          {
          showlikes&&(
            <>
            <Modal>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <div style={modalHeaderStyle}>
              <h3>Liked By</h3>
              <CloseIcon onClick={closeModal} theme={theme} />
            </div>
            {post.likers.map((user) => (
              <ModalContentWrapper key={user.id}>
                <div className="profile-info">
                  <img
                    className="pointer"
                    onClick={() => {
                      closeModal();
                      history.push(`/${user.username}`);
                    }}
                    src={user.avatar}
                    alt="avatar"
                  />
                  <div className="user-info">
                    <h3
                      className="pointer"
                      onClick={() => {
                        closeModal();
                        history.push(`/${user.username}`);
                      }}
                    >
                      {user.username}
                    </h3>
                    <span>{user.fullname}</span>
                  </div>
                </div>
                
              </ModalContentWrapper>
              
            ))}
          </div>
          </Modal>
          <MobileWrapper>
            <Modal>
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <div style={modalHeaderStyle}>
              <h3>Liked By</h3>
              <CloseIcon onClick={closeModal} theme={theme} />
            </div>
            {post.likers.map((user) => (
              <ModalContentWrapper key={user.id}>
                <div className="profile-info">
                  <img
                    className="pointer"
                    onClick={() => {
                      closeModal();
                      history.push(`/${user.username}`);
                    }}
                    src={user.avatar}
                    alt="avatar"
                  />
                  <div className="user-info">
                    <h3
                      className="pointer"
                      onClick={() => {
                        closeModal();
                        history.push(`/${user.username}`);
                      }}
                    >
                      {user.username}
                    </h3>
                    <span>{user.fullname}</span>
                  </div>
                </div>
                
              </ModalContentWrapper>
              
            ))}
          </div>
          </Modal>
          </MobileWrapper>
          </>
          )
        }
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
            <CommentIcon theme={theme} />
            <InboxIcon theme={theme} />
            <SavedComplaints isSaved={post?.isSaved} postId={post?._id} />
          </div>

          {likesState !== 0 && (
            <span className="likes bold" style={{cursor:"pointer"}} onClick={showlikewalaModal}>
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

export default Post;