import React from "react";
import ToDo from "./ToDo";

const ToDoList = () => {
  return (
    <div>
      <p className="mb-1">To Do</p>
      <ToDo title={"Hello World"} deadline={"2022-12-25"} />
      <p className="mt-1 mb-1">Up Next</p>
      <ToDo />
    </div>
  );
};

export default ToDoList;
