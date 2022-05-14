import React from "react";

function switchVideo() {}

const Settings = () => {
  return (
    <button onClick={switchVideo} id="switch_video" className="active">
      <i className="flaticons-photo"></i>
    </button>
  );
};

export default Settings;
