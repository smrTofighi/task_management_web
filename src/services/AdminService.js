import moment from "moment";
import { API_PATHS } from "../utils/ApiPaths";
import axiosInstance from "../utils/AxiosInstance";

const adminService = {
  getDashboardData: async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        return {
          dashboardData: response.data,
          prepareChart: response.data?.charts || null,
        };
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
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

  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      return {
        users: response.data?.length > 0 ? response.data : [],
      };
    } catch (error) {
      console.error("Error to fetching get users", error);
      return {
        users: [],
      };
    }
  },

  createTask: async (taskData) => {
    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item,
        completed: false,
      }));
      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      });
      return true;
    } catch (error) {
      console.error("Error creating task:", error);
      return false;
    }
  },

  updateTask: async (taskData, currentTask, taskId) => {
    try {
      const todoList = taskData.todoChecklist?.map((item) => {
        const prevTodoChecklist = currentTask?.todoChecklist || [];
        const matchedTask = prevTodoChecklist.find((task) => task.text == item);
        return {
          text: item,
          completed: matchedTask ? matchedTask.completed : false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
      });
      return true;
    } catch (error) {
      console.error("Error updating task:", error);
      return false;
    }
  },

  getTaskById: async (taskId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );
      if (response.data) {
        const taskInfo = response.data;
        return {
          taskInfo,
          taskData: {
            title: taskInfo.title,
            description: taskInfo.description,
            priority: taskInfo.priority,
            dueDate: taskInfo.dueDate
              ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
              : null,
            assignedTo: taskInfo.assignedTo?.map((item) => item?._id) || [],
            todoChecklist:
              taskInfo?.todoChecklist?.map((item) => item?.text) || [],
            attachments: taskInfo?.attachments || [],
          },
        };
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  deleteTask: async (taskId) => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
      return true;
    } catch (error) {
      console.error(
        "Error deleting exense:",
        error.response?.data?.message || error.message
      );
      return false;
    }
  },
};

export default adminService;
