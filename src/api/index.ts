import axios from "axios";
import constants from "../config/constants";
import { Notifications } from "../components";
const baseURL = constants.APP_URL;

const defaultHeaders = {
  "Content-Type": "application/json",
  // Authorization: 'Bearer ' + accessToken,
};
const axiosInstance = axios.create({
  baseURL,
  headers: defaultHeaders,
});
const accessToken = localStorage.getItem("accessToken");
const rememberMe = localStorage.getItem("isrememberme");
const refreshToken = localStorage.getItem("refreshToken");
const cognitoId = localStorage.getItem("cognitoId");

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    if (error.response?.status === 401) {
      if (accessToken && rememberMe) {
      }
      localStorage.removeItem("accessToken");
      window.location.href = "/login"; // Redirect user to login page
    }
    return Promise.reject(error);
  }
);

// set new code

// axios.interceptors.response.use(
//   (response) => response,

//   async (error) => {
//     const { config: originalReq, response } = error;

//     const rememberMe = localStorage.getItem("isrememberme");

//     const token = localStorage.getItem("accessToken");

//     if (
//       token &&
//       originalReq.url !== `${'endpoints.rememberMe'}` &&
//       !originalReq.isRetryAttempt &&
//       response &&
//       response.status === 401 &&
//       rememberMe === "true"
//     ) {
//       const refreshToken = localStorage.getItem("refreshToken") ?? "";
//       const  cognitoId  = localStorage.getItem('cognitoId');
//       try {
//         originalReq.isRetryAttempt = true;
//         const response = await axios.post(
//           `${baseURL}/${'endpoints.rememberMe'}`,
//           { username: cognitoId, refreshToken: refreshToken }
//         );
//         localStorage.setItem("accessToken",response?.data?.data?.accessToken);
//         originalReq.headers[
//           "Authorization"
//         ] = `Bearer ${response.data.data.accessToken}`;
//         return await axios(originalReq);
//       } catch (e: any) {
//         if (
//           (e.response && e.response.status === 401) ||
//           e.response?.data?.message === "token_refresh_error"
//         ) {
//           window.localStorage.clear();

//           return (window.location.href = `/signIn?message=session_expired`);
//         }
//         throw e;
//       }
//     } else {
//       if (
//         response?.data?.message === "token_decode_unauthorized" ||
//         (response && response.status === 401)
//       ) {
//         window.localStorage.clear();

//         return (window.location.href = `/signIn?message=session_expired`);
//       }

//       throw error;
//     }
//   }
// );

const handleResponse = (response: any) => response.data;
const handleError = (error: any) => {
  let errorMessage;
  if (error?.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error.response.data?.message;
    // console.error(error?.response.status);
    // console.error(error?.response.headers);
  } else if (error?.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorMessage = error?.request;
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error?.message;
  }
  Notifications({ title: "Error", description: errorMessage, type: "error" });
  // return Promise.reject(error.response || error.message);
};

const get = (url: any, params = {}, headers = {}) =>
  axiosInstance
    .get(url, { headers, params })
    .then(handleResponse)
    .catch(handleError);

const post = (url: any, data = {}, config: any = {}) =>
  axiosInstance
    .post(url, data, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

const put = (url: any, data = {}, config: any = {}) =>
  axiosInstance
    .put(url, data, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

const patch = (url: any, data = {}, config: any = {}) =>
  axiosInstance
    .patch(url, data, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

const del = (url: any, config: any = {}) =>
  axiosInstance
    .delete(url, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
