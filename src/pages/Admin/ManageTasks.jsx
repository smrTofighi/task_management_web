import { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../components/TaskStatusTabs";
import TaskCard from "../../components/Cards/TaskCard";
import toast from "react-hot-toast";
import adminService from "../../services/AdminService";
import { reportService } from "../../services/ReportSerive";
import { useUserAuth } from "../../hooks/UseUserAuth";
import DownloadButton from "./components/DownloadButton";

export const ManageTasks = () => {
  useUserAuth();
  const [allTasks, setAllTasks] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const res = await adminService.getAllTasks(filterStatus);
      
      setAllTasks(res.tasks);
      setTabs(res.statusArray);
    } catch (error) {
      console.log("Error to get All Task :", error);
    }
  };

  const handleClick = (taskData) => {
    navigate("/admin/create-task", { state: { taskId: taskData._id } });
  };

  // download task report
  const handleDownloadReport = async () => {
    try {
      const { success } = reportService.downloadTaskReport();
      if (success) {
        toast.success("Report downloaded successfully");
      } else {
        toast.error("Failed to download report");
      }
    } catch (error) {
      console.log("Error to download report", error);

      toast.error("Failed to download report");
    }
  };

  useEffect(() => {
    getAllTasks();
    
    
  }, [filterStatus]);
  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>
            {/* Mobile Download Button */}
            <DownloadButton
              onClick={handleDownloadReport}
              title={"Report Users"}
            />
          </div>
          {/* Tabs and Desktop Download Button */}
          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />
              <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            </div>
          )}
        </div>
        {/* Task Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks?.map((item) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignedTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTodoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
