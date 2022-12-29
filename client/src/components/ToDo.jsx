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
    <>
      {title !== "placeholder" ? (
        <button className="to-do__card">
          <h4 className="to-do__title">{title || defaultTitle}</h4>
          {deadline !== null ? (
            <p className="to-do__deadline">
              By{" "}
              {deadline
                ? moment(deadline).format("MMMM Do, YYYY")
                : moment(defaultDeadline).format("MMMM Do, YYYY")}
            </p>
          ) : (
            <p className="to-do__deadline">As soon as possible</p>
          )}
        </button>
      ) : (
        <button className="to-do__card to-do__card--placeholder"> </button>
      )}
    </>
  );
};

export default ToDo;
