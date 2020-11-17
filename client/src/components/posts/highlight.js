import React, { useState, useEffect } from "react";
import PostPreview from "../dashboard/PostProfilePreview";
import Loader from "../utilty/Loader";
import { connect } from "../../utils/fetchdata";

const Highlight = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    connect("/highlight").then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ marginTop: "2.3rem" }}>
        <h2>Highlight</h2>
        <PostPreview posts={posts} />
      </div>
    </>
  );
};

export default Highlight;