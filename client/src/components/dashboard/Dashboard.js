import React, { useEffect, useState,useContext } from "react";
import styled from "styled-components";
import {ThemeContext} from "../../context/ThemeContext";
import { useParams } from "react-router-dom";
import PostProfilePreview from "./PostProfilePreview";
import ProfileHeader from "./ProfileHeader";
import Placeholder from "../utility/Placeholder";
import Loader from "../utility/Loader";
import { PostIcon, SavedIcon } from "../../Icons";
import { connect } from "../../utils/fetchdata";

const Wrapper = styled.div`
  .dashboard-tab {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1.4rem 0;
  }
  .dashboard-tab div {
    display: flex;
    cursor: pointer;
    margin-right: 3rem;
  }
  .dashboard-tab span {
    padding-left: 0.3rem;
  }
  .dashboard-tab svg {
    height: 24px;
    width: 24px;
  }
  hr {
    border: 0.5px solid ${(props) => props.theme.borderColor};
  }
`;

const Dashboard = () => {
  const [tab, setTab] = useState("POSTS");
  const [errmsg,setErr] = useState("Error in getting data");
  const {theme} = useContext(ThemeContext);
  const { username } = useParams();
  const [dashboard, setdashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [NotFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    connect(`/user/${username}`)
      .then((res) => {
        setLoading(false);
        setNotFound(false);
        setdashboard(res.data);
      })
      .catch((err) => {setErr(err.message);setNotFound(true)});
  }, [username]);

  if (!NotFound && loading) {
    return <Loader />;
  }

  if (NotFound) {
    return (
      <Placeholder
        title="Sorry, this page isn't available"
        text={errmsg}
      />
    );
  }

  return (
    <Wrapper>
      <ProfileHeader dashboard={dashboard} />
      <hr />

      <div className="dashboard-tab">
        <div
          style={{ fontWeight: tab === "POSTS" ? "500" : "" }}
          onClick={() => setTab("POSTS")}
        >
          <PostIcon theme={theme} />
          <span>Posts</span>
        </div>
        <div
          style={{ fontWeight: tab === "SAVED" ? "500" : "" }}
          onClick={() => setTab("SAVED")}
        >
          <SavedIcon />
          <span>Saved</span>
        </div>
      </div>

      {tab === "POSTS" && (
        <>
          {dashboard?.posts?.length === 0 ? (
            <Placeholder
              title="Posts"
              text="Once you start making new complain posts, they'll appear here"
              icon="post"
            />
          ) : (
            <PostProfilePreview posts={dashboard?.posts} />
          )}
        </>
      )}

      {tab === "SAVED" && (
        <>
          {dashboard?.savedPosts?.length === 0 ? (
            <Placeholder
              title="Saved"
              text="Save complaints that you want to see again"
              icon="bookmark"
            />
          ) : (
            <PostProfilePreview posts={dashboard?.savedPosts} />
          )}
        </>
      )}
    </Wrapper>
  );
};

export default Dashboard;