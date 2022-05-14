import React from "react";
import useStore from "./../Store/appStore";

function OptionsBtn() {
  return (
    <button
      onClick={function (params) {
        let meshInterface = document.getElementById("meshInterface");
        if (meshInterface.style.display === "block") {
          meshInterface.style.display = "none";
        } else {
          meshInterface.style.display = "block";
        }
      }}
      // onMouseEnter={}
      id="options"
      className="options-btn"
    >
      {/* <span className="help-text">{this.helpText}</span> */}
      <i className="flaticons-options"></i>
    </button>
  );
}

export default OptionsBtn;
