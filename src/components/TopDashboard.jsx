import UserName from "../pages/Admin/components/UserName"
import InfoCardTaskDetails from "./InfoCardTaskDetails"


const TopDashboard = ({dashboardData}) => {
   
    
  return (
    <div className="card my-5">
        <UserName />
        {/* Info card and task details */}
        <InfoCardTaskDetails
          totalTasks={dashboardData?.charts.taskDistribution?.All}
          penfingTasks={dashboardData?.charts.taskDistribution?.Pending}
          inProgressTasks={dashboardData?.charts.taskDistribution?.InProgress}
          completedTasks={dashboardData?.charts.taskDistribution?.Completed}
        />
      </div>
  )
}

export default TopDashboard