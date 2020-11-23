import React, { useState, useEffect } from "react";
import PostProfilePreview from "../dashboard/PostProfilePreview";
import Loader from "../utility/Loader";
import { connect } from "../../utils/fetchdata";
import {logout} from "../home/Home";
const Highlight = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    connect("/complain/highlight").then((res) => {
      setPosts(res.data);
      setLoading(false);
    }).catch(err=>{
      if(err.logout){
        logout();
      }
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ marginTop: "2.3rem" }}>
        <h2>Trending complaints</h2>
        <PostProfilePreview posts={posts} />
      </div>
    </>
  );
};

export default Highlight;