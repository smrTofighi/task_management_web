import moment from "moment";
import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const UserName = () => {
  const {user} = useContext(UserContext);
  return (
    <div>
      <div className="col-span-3">
        <h2 className="text-xl md:text-2xl">Good Morning! {user?.name}</h2>
        <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
          {moment().format("dddd Do MMM YYYY")}
        </p>
      </div>
    </div>
  );
};

export default UserName;
