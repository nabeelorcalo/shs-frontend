import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingPerformanceState } from "../../../../store";
import { Notifications } from "../../../../components";

// Chat operation and save into store
const usePerformanceCustomHook = () => {
  const { SETTING_PERFORMANCE } = apiEndpints;
  const [settingPerformancedata, setSettingPerformancedata] = useRecoilState(settingPerformanceState);

  // get setting locations
  const getSettingPerformance = async () => {
    const params = { page: 1, limit: 50 }
    const { data } = await api.get(SETTING_PERFORMANCE, params);
    setSettingPerformancedata(data)
  };

  // // post location
  const postSettingPerformance = async (values: any) => {
    const { questionTitle, pType } = values;
    const params = {
      pType: pType,
      title: questionTitle
    }
    await api.post(SETTING_PERFORMANCE, params)
    Notifications({ title: 'Success', description: 'Performance added successfully', type: 'success' })
    getSettingPerformance()
  }

  // // post location
  const editSettingPerformance = async (state: any, values: any) => {
    const { questionTitle, pType } = values;
    const params = {
      pType: state?.pType,
      title: questionTitle
    }
    await api.patch(`${SETTING_PERFORMANCE}/${state?.id}`, params)
    Notifications({ title: 'Success', description: 'Performance updated successfully', type: 'success' })
    getSettingPerformance()
  }

  // delete location
  const deleteSettingPerformance = async (id: number) => {
    await api.delete(`${SETTING_PERFORMANCE}/${id}`);
    getSettingPerformance()
    Notifications({ title: 'Success', description: 'Performance deleted successfully', type: 'success' })
  };

  return {
    settingPerformancedata,
    getSettingPerformance,
    deleteSettingPerformance,
    postSettingPerformance,
    editSettingPerformance
  };
};

export default usePerformanceCustomHook;
