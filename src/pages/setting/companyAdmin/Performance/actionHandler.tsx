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
    const params = { page: 1, limit: 10 }
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

  // // edit location
  // const editSettingLocation = async (id: any, values: any) => {
  //   const { address, country, email, intern, locationName, phoneCode, phoneNumber, postCode, street, town } = values;
  //   const params = {
  //     name: locationName,
  //     postCode: postCode,
  //     address: address,
  //     street: street,
  //     town: town,
  //     country: 'Pakistan',
  //     phoneCode: phoneCode,
  //     phoneNumber: phoneNumber,
  //     email
  //   }
  //   await api.patch(`${LOCATION}/${id}`, params)
  //   Notifications({ title: 'Success', description: 'Location edited successfully', type: 'success' })
  // }

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
    // editSettingLocation
  };
};

export default usePerformanceCustomHook;
