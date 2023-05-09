import React, { useEffect } from "react";

const PoemDetails = ({ poem }) => {

  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-gray-800 overflow-y-auto max-h-400">
      <h1 className="text-2xl font-bold mb-2">From {poem.sender}</h1>
      <h2 className="text-lg font-semibold mb-2">To {poem.receiver}</h2>
      <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>
        <span className="font-semibold mr-2">Poem Type:</span>
        {poem.type}
      </p>
      <p className="mb-2" style={{ whiteSpace: "pre-wrap" }}>
        <span className="font-semibold mr-2">Poem:</span>
        {poem.poem}
      </p>
    </div>
  );
};

export default PoemDetails;
