import React from "react";

interface AuthViewProps {
  children: React.ReactNode;
}

const AuthView: React.FC<AuthViewProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full">
          {children}
        </div>
      </div>

      <div className="hidden md:flex w-1/2 h-screen">
        <img src="/assets/banner.jpeg" alt="LMS Preview" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default AuthView;