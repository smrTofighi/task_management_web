import { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/UseUserAuth";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import TaskListTable from "../../components/TaskListTable";
import adminService from "../../services/AdminService";
import { prepareChartData } from "../../utils/ChartDataUtils";
import RecentTasks from "./components/RecentTasks";
import TopDashboard from "../../components/TopDashboard";
import TaskDistribution from "./components/TaskDistribution";
import TaskPriorityLevels from "../../components/TaskPriorityLevels"
export const Dashboard = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const getDashboardData = async () => {
    try {
      const res = await adminService.getDashboardData();
      setDashboardData(res.dashboardData);

      const { pieChartData, barChartData } = prepareChartData(res.prepareChart);
      setPieChartData(pieChartData);
      setBarChartData(barChartData);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
    }
  };

  // Prepare Chart Data

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <DashboardLayout activeMenu={"Dashboard"}>
      {/* Top of Dashboard */}
      <TopDashboard dashboardData={dashboardData}/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <TaskDistribution pieChartData={pieChartData} />
        <TaskPriorityLevels barChartData={barChartData} />
        {/* Recent Tasks */}
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
