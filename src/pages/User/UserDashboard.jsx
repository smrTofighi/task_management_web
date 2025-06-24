import { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/UseUserAuth";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import TaskListTable from "../../components/TaskListTable";
import { userService } from "../../services/UserService";
import { prepareChartData } from "../../utils/ChartDataUtils";
import TopDashboard from "../../components/TopDashboard";
import TaskDistribution from "../Admin/components/TaskDistribution";
import TaskPriorityLevels from "../../components/TaskPriorityLevels";
import RecentTasks from "../Admin/components/RecentTasks";
export const UserDashboard = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const getDashboardData = async () => {
    const res = await userService.getUserDashboardData();
    if (res.status) {
      setDashboardData(res.dashboardData);
      const { pieChartData, barChartData } = prepareChartData(res.paepareChart);
      setPieChartData(pieChartData);
      setBarChartData(barChartData);
    }
  };

  const onSeeMore = () => {
    navigate("/user/tasks");
  };

  useEffect(() => {
    getDashboardData();
    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      <TopDashboard dashboardData={dashboardData} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <TaskDistribution pieChartData={pieChartData} />
        <TaskPriorityLevels barChartData={barChartData} />
        <div className="md:col-span-2">
          <div className="card">
            <RecentTasks onSeeMore={onSeeMore} />
            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
