import Axios from "axios";

const Api = Axios.create({
  baseURL: "http://localhost:8080/api",
  // timeout: 1000,
  // headers: {
  // "Content-Type": "application/json",
  // "Content-Type": "multipart/form-data",
  // },
  withCredentials: true,
});

// 1. Helper function to read the cookie by its name ("jwt")
export const getJwtFromCookie = () => {
  const match = document.cookie.match(new RegExp('(^| )jwt=([^;]+)'));
  if (match) {
    return match[2];
  }
  return null;
};

// 2. Intercept requests and attach the token from the cookie
Api.interceptors.request.use((config) => {
  const token = getJwtFromCookie();
  if (token) {
    // You can either let the browser send it as a cookie, 
    // OR manually attach it as a Bearer token like this:
    console.log("Inside Interceptor",token);
    console.log("Config before attaching token:", config);
    // config.headers["Authorization"] = `Bearer ${token}`;
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.set('Authorization', `Bearer ${token}`);
  }
  return config;
});

// 3. Handle expired tokens
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    // console.log("=== AXIOS INTERCEPTOR ERROR ===");
    // console.dir(error); // .dir gives a better expandable object view
    // console.log("Status:", error.response?.status);
    // console.log("===============================");
    if (error.message === 'Network Error' || (error.response && error.response.status >= 500)) {
       window.location.href = "/503";
    }
    if (error.response && error.response.status === 401) {
      // Delete the cookie by setting its expiration date to the past
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default Api;
