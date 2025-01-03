import React, { useState } from 'react';
import { CameraIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Input, Textarea } from '../../../components/Fields';
import Button from '../../../components/Button';

const EditProfile: React.FC = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setFileUrl(null);
    setFileName(null);
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      setFileName(file.name);
    }
  };

  const labelStyles = 'flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-full cursor-pointer';

  return (
    <form className='space-y-7'>
      <h1 className='text-white text-4xl font-bold'>Edit Profile</h1>
      <input type="file" id="upload" name="upload" hidden onChange={handleFileChange} />
      <div className='flex'>
      {!fileUrl && (
         <label
          htmlFor="upload"
          className={labelStyles}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>          
            <div className='flex flex-col justify-center items-center'>
              <CameraIcon className="text-white w-8 h-8" />
              <div className="text-white text-center">{fileName ? fileName : "Upload Profile Picture"}</div>
            </div>
        </label>
            )}
        {fileUrl && (
          <>
            <img src={fileUrl} alt="Uploaded" className="w-32 h-32 rounded-full" />
            <Button className='absolute p-0' Icon={XMarkIcon} onClick={handleRemoveImage}></Button>
          </>
        )}
      </div>

      <Input variant='dark' type="text" name='name' className='px-3 font-medium' placeholder='Name*' />
      <Input variant='dark' type="text" name='username' className='px-3 font-medium' placeholder='Username*' />
      <Textarea variant='dark' name='bio' className='font-semibold text-md rounded-lg w-full h-56' placeholder='Bio' />

      <div className="flex justify-end mt-4">
        <Button className="items-end">Save</Button>
      </div>
    </form>
  );
};

export default EditProfile;