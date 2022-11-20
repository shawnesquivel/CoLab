import React from "react";

const ProjectModalNegotiateBtn = ({ onClick, disabled }) => {
  return (
    <button
      className="form__btn form__btn-next form__btn--light"
      onClick={onClick}
      disabled={disabled ? true : false}
    >
      Negotiate
    </button>
  );
};

export default ProjectModalNegotiateBtn;
