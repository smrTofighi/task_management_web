import React from "react";
import UI_IMG from "../../assets/auth-img.png";
const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-full lg:w-[60%] h-full px-4 lg:px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black text-center lg:text-start mb-8">Task Manager</h2>
        {children}
      </div>
      <div className="hidden lg:block w-[40%] h-full bg-[url('/bg-image.jpg')] bg-cover bg-left bg-no-repeat"></div>
    </div>
  );
};

export default AuthLayout;
