import React from "react";

const closeModal = () => {};

function CloseModal() {
  return (
    <div id="closeWrapper" className="close-wrapper">
      <div className="close-overlay" onClick={closeModal} />
      <button onClick={closeModal} id="close-modal" className="close-modal">
        ×
      </button>
    </div>
  );
}

export default CloseModal;
