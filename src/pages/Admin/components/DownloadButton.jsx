import React from "react";
import { LuFileSpreadsheet } from "react-icons/lu";

const DownloadButton = ({title,onClick}) => {
  return (
    <button
      className="flex download-btn"
      onClick={onClick}
    >
      <LuFileSpreadsheet className="text-lg" />
      {title}
    </button>
  );
};

export default DownloadButton;
