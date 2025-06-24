import React from "react";
import { LuArrowRight } from "react-icons/lu";

const RecentTasks = ({onSeeMore}) => {
  return (
    <div className="flex items-center justify-between">
      <h5 className="text-lg">Recent Tasks</h5>
      <button className="card-btn" onClick={onSeeMore}>
        See All <LuArrowRight className="text-base" />
      </button>
    </div>
  );
};

export default RecentTasks;
