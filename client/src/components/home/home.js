import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Suggestions from "../utilty/suggestions";
import NoFeedSuggestions from "../utilty/NoFeedSuggestions";//to implement
import Post from "../posts/PostComponents";
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
  const { setUser } = useContext(UserContext);
  const { feed, setFeed } = useContext(FeedContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const logout = () => {
      localStorage.clear();      
      setUser(null);
      window.location.reload();
    };

    connect("/users/feed")
      .then((res) => {
        setFeed(res.data);
        setLoading(false);
      })
			.catch(res => console.log(res));
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
              <Post key={post._id} post={post} />
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