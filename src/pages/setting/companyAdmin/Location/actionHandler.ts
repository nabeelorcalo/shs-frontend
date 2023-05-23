import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingLocationState } from "../../../../store";
import { Notifications } from "../../../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { LOCATION } = apiEndpints;
  const [settingLocationdata, setSettingLocationdata] = useRecoilState(settingLocationState);

  // get setting locations
  const getSettingLocation = async (q: any) => {
    const params = { page: 1, limit: 10, q: q }
    const { data } = await api.get(LOCATION, params);
    setSettingLocationdata(data)
  };

  // delete location
  const deleteSettingLocation = async (id: number) => {
    await api.delete(`${LOCATION}/${id}`);
    getSettingLocation(null)
    Notifications({ title: 'Success', description: 'Lcation deleted successfully', type: 'success' })
  };

  return {
    getSettingLocation,
    deleteSettingLocation
  };
};

export default useCustomHook;
