import api from "../api";

export const getData = async (url:any) => {
  try {
    const res = await api.get(url);
    return {response: res, error: undefined}
  } catch (error) {
    return { response: undefined, error: error };
  }
}