'use client'

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { ChangeEvent, useState } from 'react'


const page = () => {
    const [file,setFile]=useState(null);
    const [previewUrl,setPreviewUrl]=useState('');
    const [duration,setDuration]=useState(0);
    const inputRef=useRef(null);

    

    const [formData, setFromData ]=useState ({
        title:'',
        description:'',
        visibility:'public',
    });

    const video={};
    const thumbnail={};

    const[error,setError]=useState(null);
    const handleInputChange =(e:ChangeEvent)=>{
        const {name,value}=e.target;

        setFromData((prevState)=>({...prevState,[name]:value}))
    }

  return (
    <div className='wrapper-md upload-page'>
        <h1>Upload A Video</h1>
        {error && <div className="error-field">{error}</div>}
        <form className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5  '>

        <FormField 
        id="title"
        label="Title"
        placeholder="Enter a clear and concise video title"
        value={formData.title}
        onChange={handleInputChange}
        />
        <FormField 
        id="description"
        label="Description"
        placeholder="Enter Description - what this video is about"
        value={formData.description}
        as="textarea"
        onChange={handleInputChange}
        />
        <FileInput
        id="video"
        label="Video"
        accept="video/*"
        file={video.file}
        previewUrl={video.previewUrl}
        inputRef={video.inputRef}
        onChange={video.handleInputChange}
        onReset={video.resetFile}
        type="video"
        />

        <FileInput
        id="thumbnail"
        label="Thumbnail"
        accept="image/*"
        file={thumbnail.file}
        previewUrl={thumbnail.previewUrl}
        inputRef={thumbnail.inputRef}
        onChange={thumbnail.handleInputChange}
        onReset={thumbnail.resetFile}
        type="image"
        />

        <FormField 
        id="visibility"
        label="Visibility"
        value={formData.visibility}
        as="select"
        options={[
            {value:'public',label:'Public'},
            {value:'private',label:'Private'},
        ]}
        onChange={handleInputChange}
        />

        </form>
       
    </div>
  )
}

export default page