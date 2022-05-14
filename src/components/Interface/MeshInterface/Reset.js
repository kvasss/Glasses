import React from "react";
import modelStore from "./../../Store/modelStore";

const Reset = () => {
  const { resetParams } = modelStore();

  return (
    <button onClick={(e) => resetParams(e)} id="reset" className="active">
      <i className="flaticons-reset"></i>
    </button>
  );
};

export default Reset;
