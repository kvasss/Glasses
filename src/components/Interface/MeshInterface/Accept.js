import React from "react";
import modelStore from "./../../Store/modelStore";

const Accept = () => {
  const { setParams } = modelStore();

  return (
    <button onClick={(e) => setParams(e)} id="accept" className="active">
      <i className="flaticons-accept"></i>
    </button>
  );
};

export default Accept;
