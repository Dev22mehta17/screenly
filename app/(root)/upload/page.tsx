'use client'

import FileInput from '@/components/FileInput'
import FormField from '@/components/FormField'
import { MAX_THUMBNAIL_SIZE, MAX_VIDEO_SIZE } from '@/constants/index'
import { getThumbnailUploadUrl,  getVideoUploadUrl,  saveVideoDetails } from '@/lib/actions/video'
import { useFileInput } from '@/lib/hooks/useFileInput'
import { useRouter } from '@/node_modules/next/navigation'
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'


const uploadFileToBunny = (
    file: File,
    uploadUrl: string,
    accessKey: string
  ): Promise<void> =>
    fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
        AccessKey: accessKey,
      },
      body: file,
    }).then((response) => {
      if (!response.ok)
        throw new Error(`Upload failed with status ${response.status}`);
    });
 

const page = () => {
    const router = useRouter();
    const [isSubmitting,setisSubmitting]=useState(false);
    const [videoDuration, setVideoDuration] = useState<number | null>(null);

    
    

    const [file,setFile]=useState(null);
    const [previewUrl,setPreviewUrl]=useState('');
    const [duration,setDuration]=useState(0);
    const inputRef=useRef(null);

    const [formData, setFromData ]=useState ({
        title:'',
        description:'',
        visibility:'public',
    });

    const video=useFileInput(MAX_VIDEO_SIZE);
    const thumbnail=useFileInput(MAX_THUMBNAIL_SIZE);

    useEffect(() => {
        if (video.duration !== null) {
          setVideoDuration(video.duration);
        }
      }, [video.duration]);

    const[error,setError]=useState('');
    const handleInputChange =(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target;

        setFromData((prevState)=>({...prevState,[name]:value}))
    }

    const handleSubmit = async (e: FormEvent)=>{
        e.preventDefault();
        setisSubmitting(true);

        try{
            if(!video.file || !thumbnail.file){
                setError('Please upload video and thumbnail ');
                return;
            }
            if(!formData.title || !formData.description){
                setError('Please fill in all the details');
                return;
            }

            const {
                videoId,
                uploadUrl: videoUploadUrl,
                accessKey: videoAccessKey,
              } = await getVideoUploadUrl();

              if (!videoUploadUrl || !videoAccessKey)
              throw new Error("Failed to get video upload credentials");
            
      
            await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

            const {
                uploadUrl: thumbnailUploadUrl,
                cdnUrl: thumbnailCdnUrl,
                accessKey: thumbnailAccessKey,
              } = await getThumbnailUploadUrl(videoId);
        
              if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey)
                throw new Error("Failed to get thumbnail upload credentials");
        
                await uploadFileToBunny(
                    thumbnail.file,
                    thumbnailUploadUrl,
                    thumbnailAccessKey
                  );
            
                  await saveVideoDetails({
                    videoId,
                    thumbnailUrl: thumbnailCdnUrl,
                    ...formData,
                    duration: videoDuration,
                  });
        
              router.push(`/video/${videoId}`);
        }
        catch(error){
            console.log('Error submitting form',error);
        }finally{
            setisSubmitting(false);
        }
    }
    // const onSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    
    //     setisSubmitting(true);
    
    //     try {
    //       if (!video.file || !thumbnail.file) {
    //         setError("Please upload video and thumbnail files.");
    //         return;
    //       }
    
    //       if (!formData.title || !formData.description) {
    //         setError("Please fill in all required fields.");
    //         return;
    //       }
    
    //       const {
    //         videoId,
    //         uploadUrl: videoUploadUrl,
    //         accessKey: videoAccessKey,
    //       } = await getVideoUploadUrl();

    
    //       if (!videoUploadUrl || !videoAccessKey)
    //         throw new Error("Failed to get video upload credentials");
     
    //       const {
    //         uploadUrl: thumbnailUploadUrl,
    //         cdnUrl: thumbnailCdnUrl,
    //         accessKey: thumbnailAccessKey,
    //       } = await getThumbnailUploadUrl(videoId);
    
    //       await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

    //       if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey)
    //         throw new Error("Failed to get thumbnail upload credentials");
    
    //       await uploadFileToBunny(
    //         thumbnail.file,
    //         thumbnailUploadUrl,
    //         thumbnailAccessKey
    //       );
    
    //       await saveVideoDetails({
    //         videoId,
    //         thumbnailUrl: thumbnailCdnUrl,
    //         ...formData,
    //         duration: videoDuration,
    //       });
    
    //       router.push(`/video/${videoId}`);
    //     } catch (error) {
    //       console.error("Error submitting form:", error);
    //     } finally {
    //       setisSubmitting(false);
    //     }
    //   };
    // Paste this corrected onSubmit function into your component
const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setisSubmitting(true);

    try {
      if (!video.file || !thumbnail.file) {
        setError("Please upload both a video and a thumbnail file.");
        setisSubmitting(false); // Stop execution
        return;
      }

      if (!formData.title || !formData.description) {
        setError("Please fill in the title and description.");
        setisSubmitting(false); // Stop execution
        return;
      }

      // --- Step 1: Get Video Upload Credentials ---
      // This is where the error is likely happening.
      const {
        videoId,
        uploadUrl: videoUploadUrl,
        accessKey: videoAccessKey,
      } = await getVideoUploadUrl();

      if (!videoUploadUrl || !videoAccessKey) {
        // This error means your backend function failed.
        // CHECK YOUR SERVER LOGS to see the real error from Bunny API.
        throw new Error("Failed to get video upload credentials. Check server logs.");
      }
 
      // --- Step 2: UPLOAD THE ACTUAL VIDEO FILE (This was missing) ---
      await uploadFileToBunny(video.file, videoUploadUrl, videoAccessKey);

      // --- Step 3: Get Thumbnail Upload Credentials ---
      const {
        uploadUrl: thumbnailUploadUrl,
        cdnUrl: thumbnailCdnUrl,
        accessKey: thumbnailAccessKey,
      } = await getThumbnailUploadUrl(videoId);

      if (!thumbnailUploadUrl || !thumbnailCdnUrl || !thumbnailAccessKey) {
        throw new Error("Failed to get thumbnail upload credentials.");
      }

      // --- Step 4: Upload the Thumbnail ---
      await uploadFileToBunny(
        thumbnail.file,
        thumbnailUploadUrl,
        thumbnailAccessKey
      );

      // --- Step 5: Save all the details to your database ---
      await saveVideoDetails({
        videoId,
        thumbnailUrl: thumbnailCdnUrl,
        ...formData,
        duration: videoDuration,
      });

      router.push(`/video/${videoId}`);

    } catch (error) {
      console.error("Error submitting form:", error);
      // Display the error to the user
      setError((error as Error).message || "An unknown error occurred.");
    } finally {
      setisSubmitting(false);
    }
};


  return (
    <div className='wrapper-md upload-page'>
        <h1>Upload A Video</h1>
        {error && <div className="error-field">{error}</div>}
        <form className='rounded-20 shadow-10 gap-6 w-full flex flex-col px-5 py-7.5  ' onSubmit={onSubmit}>

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
        onChange={video.handleFileChange}
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
        onChange={thumbnail.handleFileChange}
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

        <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'uploading...':'upload video'}
        </button>

        </form>
       
    </div>
  )
}

export default page

