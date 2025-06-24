export const prepareChartData = (data)=>{
    const taskDistribution = data?.taskDistribution || {};
  const taskPriorityLevels = data?.priorityLevels || {};

  const taskDistributionData = [
    { status: "Pending", count: taskDistribution?.Pending || 0 },
    { status: "InProgress", count: taskDistribution?.InProgress || 0 },
    { status: "Completed", count: taskDistribution?.Completed || 0 },
  ];

  const priorityLevelsData = [
    { priority: "High", count: taskPriorityLevels?.High || 0 },
    { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
    { priority: "Low", count: taskPriorityLevels?.Low || 0 },
  ];

  return {
    pieChartData: taskDistributionData,
    barChartData: priorityLevelsData,
  };
}