import React from "react";
import html2canvas from "html2canvas";

function saveScreenshot() {
  const offsetY = document.getElementsByTagName("body")[0].scrollTop;
  const fileName = "screen.png";

  let saveAs = (uri, filename) => {
    const link = document.createElement("a");
    if (typeof link.download === "string") {
      link.href = uri;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  html2canvas(document.getElementById("canvas_wrapper"), {
    scrollY: offsetY
  }).then((canvas) => {
    saveAs(canvas.toDataURL(), fileName);
  });
}

function Screenshot() {
  return (
    <button onClick={saveScreenshot} id="save" className="save-photo">
      <i className="flaticons-photo"></i>
    </button>
  );
}

export default Screenshot;
