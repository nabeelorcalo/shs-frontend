/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import 'jspdf-autotable';
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { goalsDataState } from "../../store";


// Chat operation and save into store
const useCustomHook = () => {
  const [goalsData, setGoalsData] = useRecoilState(goalsDataState);
  const { DREAMUP } = apiEndpints

  const getGoalsData = async (searchValue: any) => {
    const { data } = await api.get(DREAMUP.GET_GOALS, {
      search: searchValue ? searchValue : null
    });
    setGoalsData(data)
  };

  const addGoals = async (searchValue: any) => {
    // const { data } = await api.get(DREAMUP.GET_GOALS, {
    //   search: searchValue ? searchValue : null
    // });
    // setGoalsData(data)
    console.log('add goals');
    
  };

  const addGoalTask = async (searchValue: any) => {
    // const { data } = await api.get(DREAMUP.GET_GOALS, {
    //   search: searchValue ? searchValue : null
    // });
    // setGoalsData(data)
    console.log('add taks');
    
  };

  // get application details list 
  //Search applications 
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  return {
    debouncedSearch,
    getGoalsData,
    addGoals,
    addGoalTask,
  };
};

export default useCustomHook;