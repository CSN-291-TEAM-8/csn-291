import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import {toast} from "react-toastify";
import Suggestions from "../utility/Suggestions";
import NoFeedSuggestions from "../utility/NoFeedSuggestions";//to implement
import PostComponents from "../posts/PostComponents";
import Loader from "../utility/Loader";
import { FeedContext } from "../../context/FeedContext";
import { UserContext } from "../../context/UserContext";
import { connect } from "../../utils/fetchdata";

const Wrapper = styled.div`
  @media screen and (max-width: 1040px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Home = () => {
  const {setUser } = useContext(UserContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = () => {
      localStorage.clear();      
      setUser(null);
      window.location.reload();
    };

    connect("/user/feed")
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
      })
			.catch(res => {console.log(res); toast.error("Unable to load feed");});
  }, [setFeed, setUser]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {feed.length > 0 ? (
        <>
          <div className="home">
            {feed.map((post) => (
              <PostComponents key={post._id} post={post} />
            ))}
          </div>
          <Suggestions />{" "}
        </>
      ) : (
        <NoFeedSuggestions /> //to implement here
      )}
    </Wrapper>
  );
};

export default Home;