import api from "../../api";
import constants from "../../config/constants";

// Chat operation and save into store
const useCustomHook = () => {
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };
  const addGoals =()=>{
    alert("hellofjfgjf")
  }
  return {
    getData,
    addGoals,
  };
};

export default useCustomHook;