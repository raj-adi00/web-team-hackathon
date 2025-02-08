import { PromiseResponse } from "@/interface/route";
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
export const deleteImageFromCloudinary = async (
  imageUrl: String
): Promise<PromiseResponse> => {
  try {
    const imageId = imageUrl.split("/").slice(-1)[0].split(".")[0];
    const result = await cloudinary.uploader.destroy(imageId);
    if (result.result === "ok") {
      return {
        status: true,
        data: null,
        message: "Image deleted successfully",
      };
    } else {
      return {
        status: false,
        data: null,
        message: "Failed to delete image",
      };
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return {
      status: false,
      data: null,
      message: "Failed to delete image",
    };
  }
};

export const isCloudinaryImage = (imageUrl: string): boolean => {
  try {
    const url = new URL(imageUrl);
    return url.hostname.includes("res.cloudinary.com");
  } catch (error) {
    return false; // Invalid URL format
  }
};
