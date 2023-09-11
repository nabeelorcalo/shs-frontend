import { useState } from "react";
import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingLocationState, settingInternsState } from "../../../../store";
import { Notifications } from "../../../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { LOCATION, AVAILABLE_INTERNS_LOCATION } = apiEndpints;
  const [settingLocation, setSettingLocationdata] = useRecoilState(settingLocationState);
  const [internsData, setInternsData] = useRecoilState(settingInternsState);
  const [loading, setLoading] = useState(false);


  // get setting locations
  const getSettingLocation = async (q: any = null) => {
    setLoading(true)
    const params = { page: 1, limit: 100, q: q }
    const { data } = await api.get(LOCATION, params);
    setLoading(false)
    setSettingLocationdata(data)
  };

  // post location
  const postSettingLocation = async (values: any) => {
    console.log(values);

    setLoading(true)
    await api.post(LOCATION, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    getSettingLocation(null)
    setLoading(false)
    Notifications({ title: 'Success', description: 'Location added successfully', type: 'success' })
  }

  // edit location
  const editSettingLocation = async (id: any, values: any) => {
    setLoading(true)
    const { data } = await api.patch(`${LOCATION}/${id}`, values)
    setLoading(false)
    data && Notifications({ title: 'Success', description: 'Location edited successfully', type: 'success' })
  }

  // delete location
  const deleteSettingLocation = async (id: number) => {
    setLoading(true)
    await api.delete(`${LOCATION}/${id}`);
    getSettingLocation(null)
    setLoading(false)
    Notifications({ title: 'Success', description: 'Location deleted successfully', type: 'success' })
  };

  // Getting all interns data 
  const getAllInterns = async () => {
    const { data } = await api.get(AVAILABLE_INTERNS_LOCATION);
    setInternsData(data)
  };

  return {
    loading,
    settingLocation,
    internsData,
    getAllInterns,
    getSettingLocation,
    deleteSettingLocation,
    postSettingLocation,
    editSettingLocation
  };
};

export default useCustomHook;
