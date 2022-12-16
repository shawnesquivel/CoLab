import React from "react";
import ToDo from "./ToDo";

// This renders the immediate and upcoming tasks for the project

const ToDoList = ({ status, role, titkokTask, youtubeTask, instagramTask }) => {
  return (
    <div>
      <p className="mb-1">To Do</p>
      {instagramTask ? (
        <ToDo title="Submit Instagram Draft" deadline={"2022-12-25"} />
      ) : (
        ""
      )}
      <p className="mt-1 mb-1">Up Next</p>
      {/* draft */}
      <ToDo />
      {/* Schedule Content */}

      {/* create the first task */}
    </div>
  );
};

export default ToDoList;
