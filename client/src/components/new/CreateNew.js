import React, { useContext, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Modal from "../posts/Modal";
import modify from "../../hooks/Modify";
import { FeedContext } from "../../context/FeedContext";
import { connect, uploadImage } from "../../utils/fetchdata";
import { NewPostIcon } from "../../Icons";

const NewPostWrapper = styled.div`
  .newpost-header {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
  }
  .newpost-header h3:first-child {
    color: ${(props) => props.theme.red};
  }
  h3 {
    cursor: pointer;
  }
  .newpost-header h3:last-child {
    color: ${(props) => props.theme.blue};
  }
  textarea {
    height: 100%;
    width: 100%;
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    resize: none;
  }
  .modal-content {
    width: 700px;
  }
  @media screen and (max-width: 780px) {
    .modal-content {
      width: 90vw;
    }
  }
`;

const CreateNew = () => {
  const { feed, setFeed } = useContext(FeedContext);
  const [showModal, setShowModal] = useState(false);
  const caption = modify("");
  const [preview, setPreview] = useState("");
  const [postImage, setPostImage] = useState("");

  const handleUploadImage = (e) => {
    if (e.target.files[0] && e.target.files[0].type.split('/')[0] == 'image') {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreview(e.target.result);
        setShowModal(true);
      };
      reader.readAsDataURL(e.target.files[0]);

      uploadImage(e.target.files[0]).then((res) => {
        setPostImage(res.secure_url);
      });
    }
    else {
      toast.error("Kindly upload a valid image file");
    }
  };

  const handleSubmitPost = () => {
    if (!caption.value) {
      return toast.error("Please write something");
    }

    setShowModal(false);

    const tags = caption.value
      .split(" ")
      .filter((caption) => caption.startsWith("#"));

    const cleanedCaption = caption.value
      .split(" ")
      .filter((caption) => !caption.startsWith("#"))
      .join(" ");

    caption.setValue("");

    const newPost = {
      caption: cleanedCaption,
      files: [postImage],
      tags,
    };


    connect(`/complain`, { body: newPost }).then((res) => {
      const post = res.data;
      post.isLiked = false;
      post.isSaved = false;
      post.isMine = true;
      setFeed([post, ...feed]);
      window.scrollTo(0, 0);
      toast.success("Your complain has been submitted successfully");
    });
  };

  return (
    <NewPostWrapper>
      <label htmlFor="upload-post">
        <NewPostIcon />
      </label>
      <input
        id="upload-post"
        type="file"
        onChange={handleUploadImage}
        accept="image/*"
        style={{ display: "none" }}
      />
      {showModal && (
        <Modal>
          <div className="modal-content">
            <div className="newpost-header">
              <h3 onClick={() => setShowModal(false)}>Cancel</h3>
              <h3 onClick={handleSubmitPost}>Share</h3>
            </div>
            {preview && (
              <img className="post-preview" src={preview} alt="preview" />
            )}
            <div>
              <textarea
                placeholder="Add caption"
                value={caption.value}
                onChange={caption.onChange}
              />
            </div>
          </div>
        </Modal>
      )}
    </NewPostWrapper>
  );
};

export default CreateNew;