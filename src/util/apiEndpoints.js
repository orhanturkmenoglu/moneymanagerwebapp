export const BASE_URL = "http://localhost:8080/api/v1.0";

export const CLOUDINARY_CLOUD_NAME = "dnxdum35d";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO:"/profile",
  GET_ALL_CATEGORIES:"/categories",
  ADD_CATEGORIES:"/categories",
  CATEGORY_BY_TYPE :(type)=>`/categories/${type}`,
  GET_ALL_INCOMES:"/incomes",
  ADD_INCOME:"/incomes",
  DELETE_INCOME:(incomeId)=>`/incomes/${incomeId}`,
  UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
