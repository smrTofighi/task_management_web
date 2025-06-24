import React from "react";
import CustomBarChart from "./charts/CustomBarChart";

const TaskPriorityLevels = ({ barChartData }) => {
  return (
    <div>
      {/* Task Priorities charts */}
      <div className="card">
        <div className="flex items-center justify-between">
          <h5 className="font-medium">Task Priority Levels</h5>
        </div>
        <CustomBarChart data={barChartData} />
      </div>
    </div>
  );
};

export default TaskPriorityLevels;
