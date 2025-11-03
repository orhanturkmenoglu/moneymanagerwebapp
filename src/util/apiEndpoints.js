export const BASE_URL = "https://money-manager-fullstack.onrender.com/api/v1.0";

export const CLOUDINARY_CLOUD_NAME = "dnxdum35d";

export const API_ENDPOINTS = {
  LOGIN: "/login",
  REGISTER: "/register",
  GET_USER_INFO:"/profile",
  GET_ALL_CATEGORIES:"/categories",
  ADD_CATEGORIES:"/categories",
  CATEGORY_BY_TYPE :(type)=>`/categories/${type}`,
  GET_ALL_INCOMES:"/incomes",
  GET_ALL_EXPENSES:"/expenses",
  ADD_INCOME:"/incomes",
  ADD_EXPENSE:"/expenses",
  DELETE_INCOME:(incomeId)=>`/incomes/${incomeId}`,
  DELETE_EXPENSE:(expenseId)=>`/expenses/${expenseId}`,
  UPDATE_CATEGORY:(categoryId)=>`/categories/${categoryId}`,
  INCOME_EXCEL_DOWNLOAD:"/excel/download/income",
  EXPENSE_EXCEL_DOWNLOAD :"/excel/download/expense",
  EMAIL_INCOME_DETAILS:"/email/income-excel",
  EMAIL_EXPENSE_DETAILS:"/email/expense-excel",
  APPLY_FILTERS:"/filter",
  DASHBOARD_DATA:"/dashboard",
  UPLOAD_IMAGE: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
};
