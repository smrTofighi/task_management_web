import React from "react";
import { Link } from "react-router-dom";

const AuthButton = ({ title, desc, route, routeTitle }) => {
  return (
    <div className="w-full text-center lg:text-start">
      <button type="submit" className="btn-primary">
        {title}
      </button>
      <p className="text-[13px] text-slate-800 mt-3">
        {desc+ " "}
        <Link className="font-medium text-primary underline" to={route}>
          {routeTitle}
        </Link>
      </p>
    </div>
  );
};

export default AuthButton;
