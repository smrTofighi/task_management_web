import { API_PATHS } from "./ApiPaths";
import axiosInstance from "./AxiosInstance";
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  // Append image file to formData
  formData.append("image", imageFile);

  try {
    const response =await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.log("Error uploading the image", error);
    throw error; //TODO: Rethrow error for handling
  }
};
export default uploadImage;
