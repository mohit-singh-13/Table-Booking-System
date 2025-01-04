import React from "react";

const TimeSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse flex gap-5 bg-white w-full flex-wrap justify-center py-10 rounded-md px-4"
    >
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <div className="px-4 py-2 rounded-md w-24 h-16 bg-gray-300"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default TimeSkeleton;
