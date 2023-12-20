"use client"

import React from 'react'
import UploadForm from './_components/UploadForm'
import { useFireBaseContext } from '@/customHooks/useFireBaseContext'

const Upload = () => {
  const {uploadFile} = useFireBaseContext();

  const onUploadFile = (file) => {
    uploadFile(file);
  };

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>
        Start
        <strong className='text-primary'> Uploding </strong>
        Files &
        <strong className='text-primary'> Share </strong> 
        it
      </h2>
      <UploadForm onUploadFile={onUploadFile} />
    </div>
  )
}

export default Upload