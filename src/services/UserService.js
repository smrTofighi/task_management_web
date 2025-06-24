import { API_PATHS } from "../utils/ApiPaths";
import axiosInstance from "../utils/AxiosInstance";

export const userService = {
  getUserDashboardData: async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      if (response.data) {
        return {
          status: true,
          dashboardData: response.data,
          paepareChart: response.data?.charts || null,
        };
      } else {
        return {
          status: false,
        };
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return {
        status: false,
      };
    }
  },
  getAllTasks: async ({ filterStatus }) => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });
      const statusSummary = response.data.statusSummary || {};
      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "Completed", count: statusSummary.completedTasks || 0 },
      ];

      return {
        tasks: response.data?.tasks.length > 0 ? response.data.tasks : [],
        statusArray,
      };
    } catch (error) {
      console.log("Error to get All Task :", error);
    }
  },

  getTaskById : {
    
  }
};
