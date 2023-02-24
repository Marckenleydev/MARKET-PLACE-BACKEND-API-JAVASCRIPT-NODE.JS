import cloudinary from "cloudinary"

// Configuration 
cloudinary.config({
    cloud_name: "dt6mlfety",
    api_key: "181787623784263",
    api_secret: "icYbD9yECU8zuWRNEUkEHgyYRnY"
  });
  
  const cloudinaryUploading = async(fileToUploads)=>{
    return new Promise ((resolve)=>{
        cloudinary.uploader.upload(fileToUploads, (result)=>{
            resolve({
                url: result.secure_url,
            },
            {
                resource_type:'auto',
            })
        })
    })
  }

  export default cloudinaryUploading