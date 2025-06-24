import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/Data";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import SelectDropdown from "../../components/inputs/SelectDropdown";
import SelectedUsers from "../../components/inputs/SelectedUsers";
import TodoListInput from "../../components/inputs/TodoListInput";
import AddAttachmentsInput from "../../components/inputs/AddAttachmentsInput";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";
import TaskTile from "./components/CreateTaskTile";
import TaskAddEditButton from "./components/TaskAddEditButton";
import adminService from "../../services/AdminService";

export const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: 1,
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };
  const clearData = () => {
    //reset form
    setTaskData({
      title: "",
      description: "",
      priority: 1,
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  const handleSubmit = () => {
    setError(null);
    //Input validation
    if (!taskData.title.trim()) {
      setError("Title is required!");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description is required!");
      return;
    }
    if (!taskData.dueDate) {
      setError("Due date is required!");
      return;
    }
    if (!taskData.assignedTo.length === 0) {
      setError("Task not assigned to any member!");
      return;
    }
    if (!taskData.todoChecklist.length === 0) {
      setError("Add atleast one todo task");
      return;
    }

    if (taskId) {
      updateTask();
      return;
    }
    createTask();
  };
  // Create Task
  const createTask = async () => {
    setLoading(true);
    const res = await adminService.createTask(taskData);
    if (res) {
      toast.success("Task Created Successfully");
      clearData();
    } else {
      console.error("Error creating task:", error);
    }
    setLoading(false);
  };
  // Update Task
  const updateTask = async () => {
    setLoading(true);
    const res = await adminService.updateTask(taskData, currentTask, taskId);
    if (res) {
      toast.success("Task Updated Successfully");
    } else {
      console.error("Error updating task:", error);
    }
    setLoading(false);
  };

  // Get task info by ID
  const getTaskById = async () => {
    try {
      const res = await adminService.getTaskById(taskId);
      if (res.taskInfo) {
        setCurrentTask(res.taskInfo);

        setTaskData(() => res.taskData);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Delete Task
  const deleteTask = async () => {
    const res = await adminService.deleteTask(taskId);
    if (res) {
      setOpenDeleteAlert(false);
      toast.success("Expense details deleted successfully");
      navigate("/admin/tasks");
    }
  };
  useEffect(() => {
    if (taskId) {
      getTaskById(taskId);
    }

    return () => {};
  }, [taskId]);

  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium">
                {taskId ? "Upadte Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-rose-500 bg-rose-50 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>
            <div className="mt-4">
              <TaskTile text={"Task Title"} />
              <input
                placeholder="Create App UI"
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <TaskTile text={"Description"} />
              <textarea
                placeholder="Description Task"
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-6 md:col-span-4">
                <TaskTile text={"Priority"} />
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <TaskTile text={"Due Date"} />
                <input
                  placeholder="Create App UI"
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                />
              </div>
              <div className="col-span-12 md:col-span-3">
                <TaskTile text={"Assigned To"} />
                <SelectedUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) =>
                    handleValueChange("assignedTo", value)
                  }
                />
              </div>
            </div>
            <div className="mt-3">
              <TaskTile text={"Todo CheckList"} />
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) =>
                  handleValueChange("todoChecklist", value)
                }
              />
            </div>
            <div className="mt-3">
              <TaskTile text={"Add Attachments"} />
              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-500 mt-5">{error}</p>
            )}
            <TaskAddEditButton
              loading={loading}
              handleSubmit={handleSubmit}
              title={taskId ? "UPDATE TASK" : "CREATE TASK"}
            />
          </div>
        </div>
      </div>
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title={"Delete Task"}
      >
        <DeleteAlert
          content="Are you sure want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );
};
