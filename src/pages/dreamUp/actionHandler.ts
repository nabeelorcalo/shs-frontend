/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import 'jspdf-autotable';
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { goalsDataState,firstGoalState } from "../../store";
import { Notifications } from "../../components";


// Chat operation and save into store
const useCustomHook = () => {
  const [goalsData, setGoalsData] = useRecoilState(goalsDataState);
  const [firstGoal, setFirstGoal] = useRecoilState(firstGoalState);
  const { DREAMUP } = apiEndpints

  const getGoalsData = async (val?: string) => {
    const hasValue = {search: val} ?? {};
    const { data } = await api.get(DREAMUP.GET_GOALS, hasValue);
    setGoalsData(data);
    setFirstGoal(data?.response[0]);
    
  };

  const addGoals = async (goal: any) => {
    
    const { data } = await api.post(DREAMUP.ADD_GOALS, JSON.parse(JSON.stringify(goal)));
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Goal added", type: "success" })
    }
  };

  const addGoalTask = async (task: any) => {
    const { data } = await api.post(DREAMUP.ADD_TASK, JSON.parse(JSON.stringify(task)));
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Task added", type: "success" })
    }
  };

  const markTaskCompleted = async (task: any) => {
    const { data } = await api.put(DREAMUP.MARK_TASK, JSON.parse(JSON.stringify(task)));
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Marked as completed", type: "success" })
    }
  };

  const editTask = async (task: any) => {
    // const { data } = await api.post(DREAMUP.EDIT_TASK, JSON.parse(JSON.stringify(task)));
    // if (data) {
    //   await getGoalsData();
    //   Notifications({ title: "Success", description: "Task Updated", type: "success" })
    // }
    console.log(task);
  };

  const deleteTask = async (task: {taskId: Number, goalId: Number}) => {
    console.log(typeof task.taskId, typeof task.goalId);
    const { data } = await api.delete(DREAMUP.DELETE_TASK, {}, task);
    console.log(data);
    
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Task Deleted", type: "success" })
    }
    console.log(task);
  };

  // get application details list 
  //Search applications 
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  return {
    debouncedSearch,
    goalsData,
    firstGoal,
    getGoalsData,
    addGoals,
    addGoalTask,
    markTaskCompleted,
    editTask,
    deleteTask,
  };
};

export default useCustomHook;