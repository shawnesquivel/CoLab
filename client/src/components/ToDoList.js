import React from "react";
import ToDo from "./ToDo";

// This renders the immediate and upcoming tasks for the project

const ToDoList = ({
  status,
  role,
  tiktokTask,
  youtubeTask,
  instagramTask,
  reviewDeadline,
}) => {
  return (
    <div>
      <p className="mb-1 form__label">To Do</p>
      {status === "in progress/waiting for submission" && instagramTask ? (
        <ToDo
          title={"Waiting for influencer to submit instagram draft"}
          deadline={reviewDeadline}
        />
      ) : (
        ""
      )}

      {status === "brand reviewing" ? (
        <ToDo title="Review influencer draft" deadline={null} />
      ) : (
        ""
      )}

      <p className="mt-1 mb-1 form__label">Up Next</p>
      {/* draft */}
      <ToDo />
      {/* Schedule Content */}

      {/* create the first task */}
    </div>
  );
};

export default ToDoList;
