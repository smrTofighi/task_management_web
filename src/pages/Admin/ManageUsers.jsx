import React, { useEffect, useState } from "react";
import { DashboardLayout } from "../../components/layouts/DashboardLayout";
import { LuFileSpreadsheet } from "react-icons/lu";
import UserCard from "../../components/Cards/UserCard";
import { toast } from "react-hot-toast";
import adminService from "../../services/AdminService";
import { reportService } from "../../services/ReportSerive";
import DownloadButton from "./components/DownloadButton";
export const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await adminService.getAllUsers();
      setAllUsers(res.users);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDownloadReport = async () => {
    try {
        const {success} = await reportService.downloadUserReport();
        if (success) {
        toast.success("Report downloaded successfully");
      } else {
        toast.error("Failed to download report");
      }
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report. Please try again later.");
    }
  };

  useEffect(() => {
    getAllUsers();

    return () => {};
  }, []);
  return (
    <DashboardLayout activeMenu={"Team Members"}>
      <div className="mt-5 mb-10">
        <div className="flex md:flex-row md:items-center justify-between">
          <h2 className="text-xl md:text-xl font-medium">Team Members</h2>
          <DownloadButton title={'Download Report'} onClick={handleDownloadReport} />
          
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
