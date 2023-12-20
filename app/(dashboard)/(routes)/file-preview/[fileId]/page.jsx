"use client";

import React, { useEffect } from "react";

const FilePreview = ({ params }) => {
  useEffect(() => {
    console.log("params : ", params);
  }, []);

  return <div>FilePreview</div>;
};

export default FilePreview;
