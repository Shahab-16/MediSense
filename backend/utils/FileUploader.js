const cloudinary = require('../config/Cloudinary');

const uploadToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'MEDISENSE', // Optional: Organize files in a folder
      use_filename: true, // Use the original filename
      unique_filename: false, // Allow duplicate filenames
      resource_type: 'auto', // Automatically detect file type
    });
    return result.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

module.exports = { uploadToCloudinary };