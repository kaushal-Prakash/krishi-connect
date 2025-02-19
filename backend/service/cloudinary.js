import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload File to Cloudinary & Delete Local File
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload file to Cloudinary
    const res = await cloudinary.uploader.upload(localFilePath, {
      folder: "krishi_connect/products",
      resource_type: "auto",
    });

    // Delete the local file after successful upload
    fs.unlink(localFilePath, (err) => {
      if (err) {
        console.error("❌ Error deleting local file:", err);
      } else {
        console.log("🗑️ Local file deleted successfully:", localFilePath);
      }
    });

    return res.secure_url;
  } catch (error) {
    console.error("❌ Error in uploading to Cloudinary:", error);

    if (fs.existsSync(localFilePath)) {
      fs.unlink(localFilePath, (err) => {
        if (err) {
          console.error("❌ Error deleting local file after failed upload:", err);
        } else {
          console.log("🗑️ Local file deleted after failed upload:", localFilePath);
        }
      });
    }

    return null;
  }
};

//delete file from cloudinary
const deleteImagesFromCloud = async (publicIds) => {
  try {
    if (!publicIds || publicIds.length === 0) {
      return { success: false, message: "No images to delete" };
    }
    const res = await cloudinary.api.delete_resources(publicIds).then(result => console.log(result));

    console.log(res);
    return { success: true, message: "Images deleted successfully" };
  } catch (error) {
    console.error("❌ Error deleting images:", error);
    return { success: false, message: "Image deletion failed" };
  }
};


export { uploadOnCloudinary, deleteImagesFromCloud };