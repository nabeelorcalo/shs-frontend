/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import 'jspdf-autotable';
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { goalsDataState } from "../../store";
import { Notifications } from "../../components";


// Chat operation and save into store
const useCustomHook = () => {
  const [goalsData, setGoalsData] = useRecoilState(goalsDataState);
  const { DREAMUP } = apiEndpints

  const getGoalsData = async (val?: string) => {
    const hasValue = {search: val} ?? {};
    const { data } = await api.get(DREAMUP.GET_GOALS, hasValue);
    setGoalsData(data)
  };

  const addGoals = async (goal: any) => {
    
    let { data } = await api.post(DREAMUP.ADD_GOALS, JSON.parse(JSON.stringify(goal)));
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Goal added", type: "success" })
    }
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
    goalsData,
    getGoalsData,
    addGoals,
    addGoalTask,
  };
};

export default useCustomHook;