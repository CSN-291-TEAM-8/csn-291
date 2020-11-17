import React, { useState, createContext } from "react";

export const PostContext = createContext(null);

export const PostProvider = ({ children }) => {
  const [post, setpost] = useState([]);

  return (
    <PostContext.Provider value={{ post, setpost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;