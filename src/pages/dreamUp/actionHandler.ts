import { useEffect, useState } from "react";
import api from "../../api";
import { getGoalsAtom } from "../../store/dreamUP";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { Notifications } from "../../components";
import { formatDate } from "../../config/constants";

const useCustomHook = () => {
  const { GET_GOALS, DELETE_GOAL, ADD_GOALS,ADD_GOALS_TASK } = endpoints;
  const [getGoalState, setGoalState] = useRecoilState(getGoalsAtom);
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  /*  Method  to get All Goals for dream up  
  -------------------------------------------------------------------------------------*/
  const getGolas = async (payload?:any) => {
    await api.get(`${GET_GOALS}?search=${payload}`).then(({ data }) => {
      // console.log(data?.response);
      setGoalState(data);
    });
  }

  /*  Method  to Delete Goals 
  -------------------------------------------------------------------------------------*/
  const deleteGoal = async (goalId: string | number) => {
    await api.delete(DELETE_GOAL, {}, { "goalId": goalId }).then(() => {
      getGolas();
      Notifications({ title: "Success", description: "Deleted  successfully", type: "success" })
    })
  }

  /*  Method  to Add Goals
  -------------------------------------------------------------------------------------*/
  // const onValueChangesAddGoal = (singleValues: any, allValues: any) => {
  //   console.log(allValues, "allValues");
  // }

  const addGoals = async (values: any) => {
    // console.log(values, "values on submit ");
    const goalValus = { ...values, startDate: formatDate(values.startDate, "YYYY-MM-DD"), endDate: formatDate(values.endDate, "YYYY-MM-DD") }
    await api.post(ADD_GOALS, goalValus).then(() => {
      getGolas();
      Notifications({ title: "Success", description: "Goal added  successfully", type: "success" })

    })
    // console.log(goalValus,"goalValusgoalValus");
  }

  /*  Method  to add  Goals tasks 
  -------------------------------------------------------------------------------------*/

  // const onValueChangesAddGoalTask = (singleValues: any, allValues: any) => {
  //   console.log(allValues, "allValues");
  // }
  const addGoalTask = async (values:any,formVal:any) => {
    const goalTaskValus = { ...values, goalId:formVal?.goalId, startingDate: formatDate(values?.startingDate, "YYYY-MM-DD"), completed:formVal?.completed }
    console.log(goalTaskValus,"formVal before send to api ");
    await api.post(ADD_GOALS_TASK, goalTaskValus).then(() => {
      getGolas();
      Notifications({ title: "Success", description: "Goal task added successfully", type: "success" })
    })
  }

  return {
    getData,
    // onValueChangesAddGoal,
    addGoals,
    // onValueChangesAddGoalTask,
    addGoalTask,
    getGoalState,
    getGolas,
    deleteGoal
  };
};
export default useCustomHook;