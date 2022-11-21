import React from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ProjectModalPageTwo = ({
  acceptProject,
  showSuccess,
  cancel,
  onClose,
}) => {
  return (
    <>
      {!showSuccess ? (
        <>
          <h1 className="project-modal__heading project-modal__heading--medium">
            Are you sure you want to accept this campaign?
          </h1>
          <div className="btn-container btn-container--full btn-container--center">
            <button className="btn-negotiate" onClick={cancel}>
              Cancel
            </button>
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
          </div>
        </>
      ) : (
        <>
          <div className="project-modal-page__group project-modal-page__group--center">
            <h1 className="project-modal__heading project-modal__heading--medium">
              Success!
            </h1>
            <p>
              You can get started on this campaign. Make sure <br /> to follow
              the guidelines during content creation.
            </p>
            <button className="btn-accept" onClick={onClose}>
              Ok
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectModalPageTwo;
