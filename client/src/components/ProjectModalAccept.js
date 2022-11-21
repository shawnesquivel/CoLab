import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProjectModalPageTwo = ({ acceptProject }) => {
  return (
    <>
      <h1 className="project-modal__heading project-modal__heading--medium">
        Are you sure you want to accept this campaign?
      </h1>
      <button
        type="button"
        className="btn-accept"
        onClick={(e) => {
          acceptProject(e);
        }}
      >
        <FontAwesomeIcon icon={faCheck} className="icon-left" />
        Accept
      </button>
    </>
  );
};

export default ProjectModalPageTwo;
