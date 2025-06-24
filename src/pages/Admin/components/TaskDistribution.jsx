import React from "react";
import CustomPieChart from "../../../components/charts/CustomPieChart";
const COLORS = ["#8D51FF", "#00B8DB", "#7BCE00"];
const TaskDistribution = ({ pieChartData }) => {
  return (
    <div>
      <div className="card">
        <div className="flex items-center justify-between">
          <h5 className="font-medium">Task Distribution</h5>
        </div>
        <CustomPieChart data={pieChartData} colors={COLORS} />
      </div>
    </div>
  );
};

export default TaskDistribution;
