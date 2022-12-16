import React from "react";
import "../styles/todo.scss";
const moment = require("moment");

const ToDo = ({ title, deadline }) => {
  // if no date is speciifed
  const addWeeksToDate = (dateObj, numberOfWeeks) => {
    dateObj.setDate(dateObj.getDate() + numberOfWeeks * 7);
    return dateObj;
  };
  const defaultDeadline = addWeeksToDate(new Date(), 1);
  const defaultTitle = "Task Not Found";

  return (
    <button className="to-do__card">
      <h4 className="to-do__title">{title || defaultTitle}</h4>
      <p className="to-do__deadline">
        By{" "}
        {deadline
          ? moment(deadline).format("MMMM Do, YYYY")
          : moment(defaultDeadline).format("MMMM Do, YYYY")}
      </p>
    </button>
  );
};

export default ToDo;
