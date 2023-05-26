import axios from "axios";
import constants, { ROUTES_CONSTANTS } from "../config/constants";
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

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    if (error.response?.status === 401) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        localStorage.removeItem("accessToken");
        Notifications({ title: "Error", description: "Session expired", type: "error" });
        window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`; // Redirect user to login page
      }
    }
    return Promise.reject(error);
  }
);

// shoeb code testing

//  axios.interceptors.response.use(
//    (response) => response,

//    async (error) => {
//      const { config: originalReq, response } = error;

//      const rememberMe = localStorage.getItem("isrememberme");

//      const token = localStorage.getItem("accessToken");

//      if (
//        token &&
//        originalReq.url !== `${'/auth/refresh-token'}` &&
//        !originalReq.isRetryAttempt &&
//        response &&
//        response.status === 401 &&
//        rememberMe === "true"
       
//      ) {
//        const refreshToken = localStorage.getItem("refreshToken") ?? "";
//        const  cognitoId  = localStorage.getItem('cognitoId');
//        try {
//          originalReq.isRetryAttempt = true;
//          const response = await axios.post(
//            `${baseURL}/${'/auth/refresh-token'}`,
//            { username: cognitoId, refreshToken: refreshToken }
//          );
//          localStorage.setItem("accessToken",response?.data?.data?.accessToken);
//          originalReq.headers[
//            "Authorization"
//          ] = `Bearer ${response.data.data.accessToken}`;
//          return await axios(originalReq);
//        } catch (e: any) {
//          if (
//            (e.response && e.response.status === 401) ||
//            e.response?.data?.message === "token_refresh_error"
//          ) {
//            window.localStorage.clear();

//            return  window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;
//          }
//          throw e;
//        }
//      } else {
//        if (
//          response?.data?.message === "token_decode_unauthorized" ||
//          (response && response.status === 401)
//        ) {
//          window.localStorage.clear();

//          return  window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;;
//        }

//        throw error;
//      }
//    }
//  );



// shoib code end

// start new this code cant login after logout

// axiosInstance.interceptors.request.use(
//   async function (config) {
//     // Do something before request is sent
//     const accessToken = localStorage.getItem("accessToken");
//     const refreshToken = localStorage.getItem("refreshToken");

//     if (accessToken) {
//       config.headers.Authorization = "Bearer " + accessToken;
//     }

//     // Add logic to check if access token has expired
//     if (!accessToken) {
//       // Check if refresh token is available
//       if (refreshToken) {
//         try {
//           // Make a request to the refresh token API to get a new access token
//           const response = await axios.post("/auth/refresh-token", {
//             refreshToken: refreshToken,
//           });

//           const newAccessToken = response.data.accessToken;
//           localStorage.setItem("accessToken", newAccessToken);

//           // Update the Authorization header with the new access token
//           config.headers.Authorization = "Bearer " + newAccessToken;
//         } catch (error) {
//           // Handle error when refresh token API fails
//           localStorage.removeItem("accessToken");
//           localStorage.removeItem("refreshToken");
//           // Redirect user to login page or display an error message
//           Notifications({
//             title: "Error",
//             description: "Failed to refresh access token",
//             type: "error",
//           });
//           window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;
//           return Promise.reject(error);
//         }
//       } else {
//         // If refresh token is not available, redirect user to login page
//         localStorage.removeItem("accessToken");
//         window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;
//         return Promise.reject(new Error("No refresh token available"));
//       }
//     }

//     return config;
//   },
//   function (error) {
//     if (error.response?.status === 401) {
//       const accessToken = localStorage.getItem("accessToken");
//       if (accessToken) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         Notifications({
//           title: "Error",
//           description: "Session expired",
//           type: "error",
//         });
//         window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`; // Redirect user to login page
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// end new

const handleResponse = async (response: any) => await response.data;
const handleError = async (error: any) => {
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

const del = (url: any, config: any = {}, data = {}) =>
  axiosInstance
    .delete(url, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
      data
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
