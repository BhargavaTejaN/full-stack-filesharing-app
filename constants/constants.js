/* eslint-disable import/no-anonymous-default-export */
import { Upload, File, Shield } from "lucide-react";

export default {
  desc: "Drag and drop your file directly and share it with your fiends securely with password and send it on email",
};

export const menuList = [
  {
    id: 1,
    name: "Upload",
    icon: Upload,
    path: "/upload",
  },
  {
    id: 2,
    name: "Files",
    icon: File,
    path: "/files",
  },
  {
    id: 3,
    name: "Upgrade",
    icon: Shield,
    path: "/upgrade",
  },
];

export const allowedTypes = [
  "image/svg+xml",
  "image/png",
  "image/jpeg",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/doc", 
  "text/plain", 
  "text/txt", 
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/excel",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx
  "application/ppt",
  "video/mp4",
  "audio/mp3",
  "audio/mp4",
];

const commonImagePreview = "/image.png";
const commonAudioVideoPreview = "/mp4.png";
const commonDocumentPreview = "/docx.png"; // Updated to use docx image
const commonExcelPreview = "/xls.png";
const commonPPTPreview = "/pptx.png";
const commonPDFPreview = "/pdf.png";

export const fileTypeToPreview = {
  "image/svg+xml": commonImagePreview,
  "image/png": commonImagePreview,
  "image/jpeg": commonImagePreview,
  "image/gif": commonImagePreview,
  "text/plain": commonDocumentPreview,
  "text/txt": commonDocumentPreview,
  "application/msword": commonDocumentPreview,
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": commonDocumentPreview,
  "application/doc": commonDocumentPreview,
  "application/pdf": commonPDFPreview,
  "application/vnd.ms-excel": commonExcelPreview,
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": commonExcelPreview,
  "application/excel": commonExcelPreview,
  "application/vnd.ms-powerpoint": commonPPTPreview,
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": commonPPTPreview,
  "application/ppt": commonPPTPreview,
  "video/mp4": commonAudioVideoPreview,
  "audio/mp3": commonAudioVideoPreview,
  "audio/mp4": commonAudioVideoPreview,
};
