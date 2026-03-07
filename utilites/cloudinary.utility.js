const cloudinary = require('cloudinary').v2;
const fs = require("fs")
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});
const UploadToCloudinary = async (urlFromMulter)=>{
    try {
      const file = await  cloudinary.uploader.upload(urlFromMulter,{
        resource_type : 'auto'
        
        })
        fs.unlinkSync(urlFromMulter)
        return file.secure_url
    } catch (error) {
        console.log('Cloudinary Url' ,error)
        fs.unlinkSync(urlFromMulter)
    }
}
module.exports = UploadToCloudinary
