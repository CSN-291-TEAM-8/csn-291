import React, { useEffect, useState } from "react";
import Button from "../../styles/Button";
import { connect } from "../../utils/fetchdata";

const Follow = ({ nobtn, isFollowing, incFollowers, decFollowers, userId }) => {
  const [followingState, setFollowingState] = useState(isFollowing);

  useEffect(() => setFollowingState(isFollowing), [isFollowing]);

  const handleFollow = () => {
    if (followingState) {
      setFollowingState(false);
      if (decFollowers) {
        decFollowers();
      }
      connect(`/users/${userId}/unfriend`);
    } else {
      setFollowingState(true);
      if (incFollowers) {
        incFollowers();
      }
      connect(`/users/${userId}/friend`);
    }
  };

  if (followingState) {
    return (
      <>
        {nobtn ? (
          <span
            style={{ color: "#262626" }}
            className="pointer"
            onClick={() => handleFollow()}
          >
            Following
          </span>
        ) : (
          <Button onClick={() => handleFollow()}>Following</Button>
        )}
      </>
    );
  } else {
    return (
      <>
        {nobtn ? (
          <span className="pointer" onClick={() => handleFollow()}>
            Follow
          </span>
        ) : (
          <Button onClick={() => handleFollow()}>Follow</Button>
        )}
      </>
    );
  }
};

export default Follow;