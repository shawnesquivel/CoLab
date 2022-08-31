import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOM from "react-dom";
const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fefcfb",
  padding: "50px",
  zIndex: 1000,
};
const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, .7)",
  zIndex: 1000,
};
const ProjectModal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div style={OVERLAY_STYLES} className="">
      <div style={MODAL_STYLES} className="">
        <h1>{children}</h1>
        <button onClick={onClose}>
          Close Project <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ProjectModal;
