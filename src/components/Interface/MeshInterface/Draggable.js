import interact from "interactjs";
import { useEffect } from "react";
import modelStore from "./../../Store/modelStore";

const Draggable = () => {
  const { params, setParams } = modelStore();
  const dragStartListener = (event) => {
    // console.log('dragStartListener' + event);
  };
  const dragEndListener = (event) => {
    // console.log('dragEndListener' + event);
  };

  const dragMoveListener = (event) => {
    const target = event.target;

    let x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    let y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

    console.log(params);

    setParams({
      offsetY: params.offsetY + -x / 6000,
      offsetZ: params.offsetZ + -y / 2000
    });
    // params.offsetY += -x / 6000;
    // params.offsetZ += -y / 2000;
  };

  useEffect(() => {
    interact(".draggable").draggable({
      // inertia: true,
      modifiers: [
        interact.modifiers.restrictRect({
          // restriction: 'parent',
          // endOnly: true
        })
      ],
      autoScroll: true,
      listeners: {
        start: dragStartListener,
        move: dragMoveListener,
        end: dragEndListener
      }
    });
  });

  return (
    <div id="draggable" className="draggable">
      Draggable
    </div>
  );
};

export default Draggable;
