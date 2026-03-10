import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true
});

const refreshClient = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let queue = [];

function processQueue(error, token = null) {
  queue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  queue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;

    if (err.response?.status !== 401 || original._retry) {
      return Promise.reject(err);
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then((token) => {
        if (!token) return Promise.reject(err);
        original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      });
    }

    isRefreshing = true;

    try {
      const res = await refreshClient.get("/auth/refresh");
      const newToken = res.data.accessToken;

      if (!newToken) {
        throw new Error("No token returned");
      }

      localStorage.setItem("accessToken", newToken);
      processQueue(null, newToken);

      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);

    } catch (refreshErr) {
      processQueue(refreshErr, null);
      localStorage.removeItem("accessToken");
      return Promise.reject(refreshErr);

    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
