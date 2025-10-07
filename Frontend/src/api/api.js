import axios from "axios";

// Base URL setup for backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend ka base route
});

// File upload function
export const uploadFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("pdf", file); // Multer me field name "files" hona chahiye

    const response = await API.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Upload error:", error.response?.data || error.message);
    return { error: error.response?.data?.message || error.message };
  }
};

// Query / retrieval function
export const getAnswer = async (query) => {
  try {
    const response = await API.post("/retrieve", { query });
    return response.data;
  } catch (error) {
    console.error("Query error:", error.response?.data || error.message);
    return { error: error.response?.data?.message || error.message };
  }
};

export const getUploadedFiles = async () => {
  try {
    const response = await API.get("/getFiles");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch uploads:", error);
  }
};


export const uploadYoutubeLink = async (url) => {
  try {
    const response = await API.post("/youtubeindex", { url }); // ✅ correct
    return response.data;
  } catch (error) {
    console.error("Failed to fetch uploads:", error);
  }
};
export const deleteUploadedItem = async (id,type) => {
  try {
    const response = await API.post("/deleteItem", { id,type }); // ✅ correct
    return response.data;
  } catch (error) {
    console.error("Failed to fetch uploads:", error);
  }
};
// export const retriveYoutubeAns = async (query) => {
//   try {
//     const response = await API.post("/retriveYoutube", { query }); // ✅ correct
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch uploads:", error);
//   }
// };

export const indexText=async(text)=>{
  try {
    const response=await API.post("/indexText",{text});
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}
export const indexWebsite=async(webUrl)=>{
  try {
    const response=await API.post("/uploadWeb",{webUrl});
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}

export const reset=async()=>{
  try {
    const res=await API.post("/reset")
    return res
  } catch (error) {
    console.log(error);
    
  }
}