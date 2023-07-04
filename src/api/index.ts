import axios from "axios";
import constants, { ROUTES_CONSTANTS } from "../config/constants";
import { Notifications } from "../components";

const baseURL = constants.APP_URL;
const accessToken = localStorage.getItem("accessToken");

const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: "Bearer " + accessToken,
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
        Notifications({
          title: "Error",
          description: "Session expired",
          type: "error",
          key: "token",
        });
        window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`; // Redirect user to login page
      }
    }
    return Promise.reject(error);
  }
);

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
  Notifications({
    title: "Error",
    description: errorMessage,
    type: "error",
    key: "token",
  });

  if (error.response?.status === 401) {
    setTimeout(() => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        localStorage.removeItem("accessToken");
      }
      window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;
    }, 2000);
  }
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
      data,
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
