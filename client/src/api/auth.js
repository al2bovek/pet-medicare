import api from "./axios";

// REGISTER
export const registerRequest = (data) =>
  api.post("/auth/register", data);

// LOGIN
export const loginRequest = (data) =>
  api.post("/auth/login", data);

// REFRESH TOKEN (GET, not POST)
export const refreshToken = () =>
  api.get("/auth/refresh");

// LOGOUT
export const logoutRequest = () =>
  api.post("/auth/logout");

// GET CURRENT USER
export const getMe = () =>
  api.get("/auth/me");
