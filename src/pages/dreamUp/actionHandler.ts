/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import 'jspdf-autotable';
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { goalsDataState,firstGoalState, dashGoalsDataState, barsDataState, lifeAssessmentState } from "../../store";
import { Notifications } from "../../components";
import { AchivmentIcon } from "../../assets/images";


const useCustomHook = () => {
  const [goalsData, setGoalsData] = useRecoilState(goalsDataState);
  const [barsData, setBarsData] = useRecoilState(barsDataState);
  const [dashGoalsData, setDashGoalsData] = useRecoilState(dashGoalsDataState);
  const [firstGoal, setFirstGoal] = useRecoilState(firstGoalState);
  const [lifeAssessment, setLifeAssessment] = useRecoilState(lifeAssessmentState);
  const { DREAMUP } = apiEndpints

  const getGoalsData = async (val?: string) => {
    const hasValue = {search: val} ?? {};
    const { data } = await api.get(DREAMUP.GET_GOALS, hasValue);

    let allGoals = [];
    if (data?.response &&  data?.response?.length !==0) {
      const goals = data?.response;
      for(const i in goals) {
        const goalData = {
          key: Number(i)+1,
          id: goals[i].id,
          goalName: goals[i]?.name || '--',
          datecreated: goals[i]?.createdAt.split('T')[0] || '--',
          totalTasks: goals[i]?.totalTasks || 0,
          completedTasks: goals[i]?.completedTasks || 0,
          dueDate: goals[i]?.endDate.split('T')[0] || '--',
          status: goals[i]?.status || '--'
        };
        allGoals.push(goalData);
      }
    }
    setDashGoalsData(allGoals as any);
    setGoalsData(data);
    setFirstGoal(data?.response[0]);
  };

  const getLifeAssessment = async (val?: string) => {
    const hasValue = {month: val?.toLowerCase()} ?? {};
    const { data } = await api.get(DREAMUP.LIFE_ASSESSMENT, hasValue);
    setLifeAssessment(data);    
  };




  const getBarsData = async () => {
    const { data } = await api.get(DREAMUP.GET_GOALS);
    let bars = [];
    let  completedGoal = [];
    if (data?.response &&  data?.response?.length !==0) {
      const goals = data?.response;
      completedGoal = goals?.filter((g:any)=>{return g.status === 'completed'});
    }
    const { mainGoal } = data;
    const mGoal = {
      content: `${mainGoal[0]?.completedTasks} of ${mainGoal[0]?.totalTasks} tasks completed`,
      icon: AchivmentIcon,
      progressbarColor: '#FFC15D',
      progressbarValue: ((mainGoal[0]?.completedTasks/mainGoal[0]?.totalTasks)*100).toFixed(0),
      storage: '128GB',
      subTitle: mainGoal[0]?.name,
      title: 'Main Goal'
    };
    const last = {
      content: `${completedGoal[0]?.completedTasks} of ${completedGoal[0]?.totalTasks} tasks completed`,
      icon: AchivmentIcon,
      progressbarColor: '#4A9D77',
      lastAchivmentTime: "1 week ago",
      progressbarValue: ((completedGoal[0]?.completedTasks/completedGoal[0]?.totalTasks)*100).toFixed(0),
      storage: '128GB',
      subTitle: completedGoal[0]?.name,
      title: 'Last Achievement'
    }
    bars.push(mGoal, last);
    setBarsData(bars as any);
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
    const { data } = await api.post(DREAMUP.EDIT_TASK, task);
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Task Updated", type: "success" })
    }
  };

  const deleteTask = async (task: {taskId: Number, goalId: Number}) => {
    const { data } = await api.delete(DREAMUP.DELETE_TASK, {}, task);
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Task Deleted", type: "success" })
    }
  };

  const deleteGoal = async (goal: any) => {
    const { id } = goal
    const { data } = await api.delete(DREAMUP.DELETE_GOAL, {}, {goalId: id});
    if (data) {
      await getGoalsData();
      Notifications({ title: "Success", description: "Goal Deleted", type: "success" })
    }
  };

  // get application details list 
  //Search Goals 
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  return {
    debouncedSearch,
    goalsData,
    firstGoal,
    barsData,
    dashGoalsData,
    lifeAssessment,
    getLifeAssessment,
    getGoalsData,
    addGoals,
    // onValueChangesAddGoalTask,
    addGoalTask,
    markTaskCompleted,
    editTask,
    deleteTask,
    deleteGoal,
    getBarsData,
  };
};
export default useCustomHook;