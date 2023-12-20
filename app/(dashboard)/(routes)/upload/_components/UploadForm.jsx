import React, { useEffect, useRef, useState } from "react";
import AlertMsg from "./AlertMsg";
import { allowedTypes } from "@/constants/constants";
import FilePreview from "./FilePreview";
import ProgressBar from "./ProgressBar";
import { useFireBaseContext } from "@/customHooks/useFireBaseContext";
import { useRouter } from "next/navigation";

const UploadForm = ({ onUploadFile }) => {
  const router = useRouter();

  const { progress, fileDocId } = useFireBaseContext();

  const [file, setFile] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const onFileSelect = (selectedFile) => {
    setErrorMsg("");
    setUploadComplete(false);
    if (!selectedFile) return;
    if (!allowedTypes.includes(selectedFile.type)) {
      setErrorMsg(
        "Invalid file type. Please upload SVG, PNG, JPG, GIF, TXT, DOC, PDF, XL only."
      );
      return;
    }

    if (selectedFile.size > 5242880) {
      setErrorMsg("Max File Size is 5MB");
      return;
    }
    setErrorMsg("");
    setFile(selectedFile);
  };

  const handleUploadFile = () => {
    onUploadFile(file);
  };

  useEffect(() => {
    const handlenavigation = () => {
      if (progress === 100 && !uploadComplete) {
        setUploadComplete(true);
        setShowSuccessAlert(true);
        setFile("");
  
        setTimeout(() => {
          setShowSuccessAlert(false);
          router.push("/file-preview/" + fileDocId);
        }, 3000);
      }
    };
    handlenavigation();
  }, [progress, uploadComplete, router, fileDocId, setUploadComplete, setShowSuccessAlert, setFile]);

  return (
    <div className="text-center">
      {showSuccessAlert && (
        <div
          role="alert"
          className="rounded-xl border border-gray-100 bg-white p-4"
        >
          <div className="flex items-start gap-4">
            <span className="text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>

            <div className="flex-1">
              <strong className="block font-medium text-gray-900">
                {" "}
                File Uploaded{" "}
              </strong>

              <p className="mt-1 text-sm text-gray-700">
                Your File have been saved.
              </p>
            </div>

            <button className="text-gray-500 transition hover:text-gray-600">
              <span className="sr-only">Dismiss popup</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-12 h-12 mb-4 text-blue-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-lg md:text-2xl text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or{" "}
              <strong className="text-primary">drag</strong> and
              <strong className="text-primary">drop</strong>
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG, GIF, TXT, DOC, PDF, XL, MP3 or MP4 (MAX SIZE : 5MB)
            </p>
          </div>
          <input
            onChange={(e) => onFileSelect(e.target.files[0])}
            id="dropzone-file"
            type="file"
            className="hidden"
          />
        </label>
      </div>
      {errorMsg && <AlertMsg msg={errorMsg} />}
      {file && !uploadComplete && (
        <FilePreview removeFile={() => setFile(null)} file={file} />
      )}
      {progress > 0 && progress < 100 ? (
        <ProgressBar progress={progress} />
      ) : (
        <button
          disabled={!file || (progress > 0 && progress < 100)}
          className="disabled:bg-gray-400 p-2 bg-primary text-white w-[30%] rounded-full mt-5"
          onClick={handleUploadFile}
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadForm;
