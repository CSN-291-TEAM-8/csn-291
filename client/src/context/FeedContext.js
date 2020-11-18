import React, { useState, createContext } from "react";

export const FeedContext = createContext(null);

export const FeedProvider = ({ children }) => {
  const [post, setpost] = useState([]);

  return (
    <FeedContext.Provider value={{ post, setpost }}>
      {children}
    </FeedContext.Provider>
  );
};

export default FeedProvider;