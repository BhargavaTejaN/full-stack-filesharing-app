// https://firebase.google.com/docs/web/setup#available-libraries

"use client";

import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from "@clerk/nextjs";
import { GenerateRandomString } from "@/constants/GenerateRandomString";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "fullstack-filesharing-30b25.firebaseapp.com",
  projectId: "fullstack-filesharing-30b25",
  storageBucket: "fullstack-filesharing-30b25.appspot.com",
  messagingSenderId: "495416106123",
  appId: "1:495416106123:web:9ad1ebff71acfd3230488e",
};

// Import statements remain the same...

const FireBaseApp = initializeApp(firebaseConfig);
const FireStoreStorage = getStorage(FireBaseApp);
const FireStore = getFirestore(FireBaseApp);

export const FireBaseContext = createContext();

export const FireBaseProvider = ({ children }) => {
  const { user } = useUser();
  const [progress, setProgress] = useState(0);
  const [fileDocId, setFileDocId] = useState('');

  const uploadFile = async (file) => {
    const metadata = { contentType: file.type };

    try {
      const fileRef = ref(FireStoreStorage, `uploaded-files/${file?.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file, file?.type);

      uploadTask.on("state_changed", handleUploadStateChange(uploadTask, file));
    } catch (error) {
      console.error("Error while uploading the file: ", error);
      throw error;
    }
  };

  const handleUploadStateChange = (uploadTask, file) => async (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(progress);
    console.log(`Upload is ${progress}% done`);

    if (progress === 100) {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log("File available at", downloadURL);
      setProgress(0);
      createNewFolder(file, downloadURL);
    }
  };

  const createNewFolder = async (file, fileUrl) => {
    const docId = GenerateRandomString();
    setFileDocId(docId);

    try {
      await setDoc(doc(FireStore, "uploadedFile", docId), {
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type,
        fileUrl,
        userEmail: user?.primaryEmailAddress.emailAddress,
        userName: user?.fullName,
        password: "",
        id: docId,
        shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${docId}`,
      });
    } catch (error) {
      console.error("Error while creating a new folder: ", error);
      throw error;
    }
  };

  const value = {
    uploadFile,
    progress,
    fileDocId,
  };

  return (
    <FireBaseContext.Provider value={value}>
      {children}
    </FireBaseContext.Provider>
  );
};
