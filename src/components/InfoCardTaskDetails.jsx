import React from "react";
import { addThousandsSeparator } from "../utils/Helper";
import InfoCard from "./Cards/InfoCard";

const InfoCardTaskDetails = ({
  totalTasks,
  penfingTasks,
  inProgressTasks,
  completedTasks,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
      <InfoCard
        label="Total Tasks"
        value={addThousandsSeparator(totalTasks || 0)}
        color="bg-primary"
      />
      <InfoCard
        label="Pending Tasks"
        value={addThousandsSeparator(penfingTasks || 0)}
        color="bg-violet-500"
      />
      <InfoCard
        label="In Progress Tasks"
        value={addThousandsSeparator(inProgressTasks || 0)}
        color="bg-cyan-500"
      />
      <InfoCard
        label="Completed Tasks"
        value={addThousandsSeparator(completedTasks || 0)}
        color="bg-lime-500"
      />
    </div>
  );
};

export default InfoCardTaskDetails;
