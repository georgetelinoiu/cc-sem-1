import React from "react";

const PoemDetails = ({ poem }) => {
  return (
    <div>
      <h1>{poem.sender}</h1>
      <h2>{poem.receiver}</h2>
      <p>{poem.type}</p>
      <p>{poem.poem}</p>
    </div>
  );
};

export default PoemDetails;