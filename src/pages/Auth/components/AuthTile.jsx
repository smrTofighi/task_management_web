import React from "react";

const AuthTile = ({title, desc}) => {
  return (
    <div className="w-full text-center lg:text-start">
      <h3 className="text-xl font-semibold text-black">{title}</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">{desc}</p>
    </div>
  );
};

export default AuthTile;
