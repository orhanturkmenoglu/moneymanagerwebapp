import { API_ENDPOINTS } from "./apiEndpoints";

export const uploadProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "moneymanager");

    const response = await fetch(API_ENDPOINTS.UPLOAD_IMAGE, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    console.log("Cloudinary response:", data);

    if (!response.ok) {
      throw new Error(data.error?.message || "Cloudinary upload failed");
    }

    if (!data.secure_url) {
      throw new Error("Cloudinary did not return secure_url");
    }

    return data.secure_url; // secure_url içerir
  } catch (err) {
    console.error("Error uploading the image", err);
    throw err; // Hatanın Signup.jsx'e geçmesini sağla
  }
};


export default uploadProfileImage;