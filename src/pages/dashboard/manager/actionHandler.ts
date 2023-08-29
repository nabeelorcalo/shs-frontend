import { useState } from "react";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { managerWidgetsState } from "../../../store";
const {
  MANAGER_DASHBOARD_WIDGETS,
} = endpoints;

const useCustomHook = () => {
  // ============================== company manager Dashboard states ================================== //
  const [managerLoaders, setManagerLoaders] = useState({ isWidgetsLoading: false });
  // manager dashboard counting card
  const [managerWidgets, setManagerWidgets] = useRecoilState<any>(managerWidgetsState);
  // ================XXXX========= company manager Dashboard states ==============XXXX================ //
  // ============================== company manager Dashboard functions ================================== //
  // get manager counting card data
  const getManagerWidgets = async () => {
    setManagerLoaders((prev) => ({ ...prev, isWidgetsLoading: true }));
    await api
      .get(MANAGER_DASHBOARD_WIDGETS)
      .then(({ data }: any) => setManagerWidgets(data));
    setManagerLoaders((prev) => ({ ...prev, isWidgetsLoading: false }));
  };
  // =============XXXX============= company manager Dashboard functions ==============XXXX================ //
  return {
    managerLoaders,
    // manager dashboard widgets
    getManagerWidgets,
    managerWidgets,
  };
};

export default useCustomHook;
