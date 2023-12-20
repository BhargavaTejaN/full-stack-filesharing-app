import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div className="bg-gray-400 w-full h-4 mt-3 rounded-full">
      <div
        style={{ width: `${progress}%` }}
        className="text-white text-[10px] h-4 bg-primary rounded-full"
      >
        {`${Number(progress).toFixed(0)}%`}
      </div>
    </div>
  );
};

export default ProgressBar;
