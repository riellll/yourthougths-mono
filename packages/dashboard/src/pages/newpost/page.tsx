import React, { useRef, useState } from 'react'
import clMerge from '../../lib/clMerge'
import { Input, Label, Textarea } from '../../components/Fields'
import { CameraIcon,XMarkIcon } from '@heroicons/react/24/solid'
import Button from '../../components/Button'

const NewPost = () => {

  const [fileName, setFileName] = useState<string | null>(null)
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false)
  // const fileInputRef = useRef<HTMLInputElement>(null);
  // const [state, dispatch] = useFormState(uploadLogo, initialState)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {                          
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault() // Step 2: Handle drag over
    setIsDragging(true)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault() // Step 3: Handle drag enter
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault() // Handle drag leave
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault() // Step 4: Handle drop
    setIsDragging(false)
    const file = e.dataTransfer.files ? e.dataTransfer.files[0] : null
    if (file) {
      setFileName(file.name)
    }
  }

  const handleRemoveImage = () => {
    setFileUrl(null);
    setFileName(null);
  };

  const labelStyles = clMerge({
    "relative flex items-center justify-center": true,
    "border border-neutral-400 border-dashed": true,
    "my-2 p-5 cursor-pointer bg-neutral-700 rounded h-[100px]      line-clamp-2": true,
    "flex gap-2 font-bold text-neutral-300 text-md": true,
    "bg-neutral-300": isDragging,
    "p-0": fileUrl,
  })

  return (
    <form className='space-y-7'>
    <h1 className='text-white text-4xl font-bold'>New Post</h1>
    <input type="file" id="upload" name="upload" hidden onChange={handleFileChange} />
    <div className='flex'>
        <label
          htmlFor="upload"
          className={labelStyles}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}>
        {!fileUrl && (<><CameraIcon className="w-8 h-8" />
        <div className="">{fileName ? fileName : "Thumbnail"}</div></>)}
        </label>
          {fileUrl && <>
          <img src={fileUrl} alt="Uploaded" className="w-72" />
        <Button className='absolute p-0' Icon={XMarkIcon} onClick={handleRemoveImage}></Button></>}
    </div>

      <Input variant='dark' type="text" name='title' className='px-3 font-medium' placeholder='Post Title*'/>

      <Textarea variant='dark' name='description' className='font-semibold text-md rounded-lg w-full h-56' placeholder='Share your thoughts' />

      <div className="flex justify-end mt-4">
        <Button className="items-end">Post</Button>
      </div>
    </form>
  )
}

export default NewPost