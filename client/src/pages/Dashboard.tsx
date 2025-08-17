import React from "react";
import { courses } from "@/data/dashboard-data";

export const Dashboard: React.FC = () => {

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold mb-2">
          My Courses{" "}
          <span className="text-blue-600">( Spring 2025 )</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 items-center justify-center gap-6">
        {courses?.map((course, idx) => (
          <div key={idx} className="w-[580px] shadow-lg overflow-hidden bg-white rounded-md">

            <div className={`relative bg-gradient-to-r ${course.gradient} p-4 text-white`}>
              <h2 className="text-lg font-semibold">
                {course.id} - {course.title}
              </h2>
              <p className="text-sm py-1">{course.department}</p>
              <p className="text-xs py-2">{course.creditHours} Credit Hour(s)</p>
            </div>

            <div className="flex items-center justify-between p-4 relative">
              <div className="flex space-x-4 mt-2">
                <img
                  src={course.instructor.image}
                  alt={course.instructor.name}
                  className="w-28 h-32 rounded-md object-cover border border-gray-600"
                />
                <div>
                  <p className="font-semibold text-gray-800">
                    {course.instructor.name}
                  </p>
                  <p className="text-sm font-semibold text-gray-600 py-1">
                    {course.instructor.qualification}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold py-1">
                    {course.instructor.university}
                  </p>
                </div>
              </div>

              <div className="absolute right-2 top-12 transform -translate-y-1/2">
                <div className="w-12 h-8 flex items-center justify-center rounded-2xl border-2 border-blue-500 text-blue-500 font-bold text-lg">
                  {course.badge}
                </div>
              </div>
            </div>

            <hr />
            <div className="grid grid-cols-5 text-center p-4 gap-2">
              {course?.actions?.map((action, i) => {
                const Icon = action?.icon;
                return (
                  <div key={i} className={`flex flex-col items-center space-y-1 ${action.disabled ? "opacity-40" : ""}`}>
                    <Icon className="w-8 h-8 text-gray-700" />
                    <span className="text-sm font-semibold">{action?.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
