import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddDeliverableBtn = () => {
  return (
    <button className="form__btn-add-deliverable">
      <FontAwesomeIcon icon={faPlus} className="icon-left" />
      Add Platform
    </button>
  );
};

export default AddDeliverableBtn;
