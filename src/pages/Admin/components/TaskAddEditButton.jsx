import React from "react";

const TaskAddEditButton = ({loading, handleSubmit, title}) => {
  return (
    <div className="flex justify-end mt-7">
      <button className="add-btn" onClick={handleSubmit} disabled={loading}>
        {title}
      </button>
    </div>
  );
};

export default TaskAddEditButton;
