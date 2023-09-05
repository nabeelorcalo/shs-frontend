import axios from "axios";
import constants, { ROUTES_CONSTANTS } from "../config/constants";
import { Notifications } from "../components";
import endpoint from '../config/apiEndpoints';

const baseURL = constants.APP_URL;
const { REFRESH_TOKEN } = endpoint;
const accessToken = localStorage.getItem("accessToken");

const defaultHeaders = {
  "Content-Type": "application/json",
  "Authorization": "Bearer " + accessToken,
};

const axiosInstance = axios.create({
  baseURL,
  headers: defaultHeaders,
});

axiosInstance.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },

  function (error) {
    if (error.response?.status === 401) {
      if (accessToken) {
        localStorage.removeItem("accessToken");
        window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;
      }
    }
    return Promise.reject(error);
  }
);

const handleNewAuthToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const cognitoId = localStorage.getItem('cognitoId');
    if (!refreshToken) {
      throw new Error("Refresh token not found");
      return;
    }
    const response = await axios.post(baseURL + REFRESH_TOKEN, { refreshToken, username: cognitoId });
    const newAuthToken = response?.data?.data?.accessToken;
    localStorage.setItem("accessToken", newAuthToken);

    setTimeout(() => {
      location.reload();
    }, 2000);
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

const handleResponse = async (response: any) => await response.data;

const handleError = async (error: any) => {
  let errorMessage;

  if (error?.response) {
    errorMessage = error.response.data?.message;
  } else if (error.code === 'ERR_BAD_REQUEST') {
    errorMessage = error;
  } else {
    errorMessage = error?.message;
  }

  Notifications({
    title: "Error",
    description: errorMessage,
    type: "error",
    key: "token",
  });

  if (error.response?.status === 401 || error.response?.data?.message?.includes('Token')) {
    const isRemembered: any = JSON.parse(JSON.stringify(localStorage.getItem('remeberMe')));

    try {
      if (isRemembered) {
        await handleNewAuthToken();
      }
    } catch (refreshError) {
      setTimeout(() => {
        if (accessToken) {
          localStorage.removeItem("accessToken");
        }
        window.location.href = `/${ROUTES_CONSTANTS.LOGIN}`;
      }, 2000);
    }
  }
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
