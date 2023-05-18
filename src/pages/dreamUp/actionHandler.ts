import { useEffect, useState } from "react";
import api from "../../api";
import { getGoalsAtom } from "../../store/dreamUP";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_GOALS, DELETE_GOAL } = endpoints
  const [getGoalState, setGoalState] = useRecoilState(getGoalsAtom)
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  /*  Method  to get All Goals for dream up  
-------------------------------------------------------------------------------------*/
  const getGolas = async () => {
    await api.get(GET_GOALS).then(({ data }) => {
      setGoalState(data);
    });
  }
  /*  Method  to Delete Goals 
-------------------------------------------------------------------------------------*/
  const deleteGoal = async (goalId: string | number) => {
    await api.delete(DELETE_GOAL, {}, {"goalId":goalId}).then(()=>{
      getGolas();
    })
  }
  const addGoals = () => {
    alert("Function to Add Goals")
  }
  const addGoalTask = () => {
    alert("addGoalTask")
  }
  return {
    getData,
    addGoals,
    addGoalTask,
    getGoalState,
    getGolas,
    deleteGoal
  };
};

export default useCustomHook;