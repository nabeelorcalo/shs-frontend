import { useRecoilState } from "recoil";
import api from "../../../../api";
import apiEndpints from "../../../../config/apiEndpoints";
import { settingLocationState, settingInternsState } from "../../../../store";
import { Notifications } from "../../../../components";
import { useState } from "react";

// Chat operation and save into store
const useCustomHook = () => {
  const { LOCATION, INTERN_LIST } = apiEndpints;
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
    setLoading(true)
    const { address, country, email, interns, locationName, phoneCode, phoneNumber, postCode, street, town, uploadImage } = values;
    const params = {
      name: locationName,
      postCode: postCode,
      address: address,
      street: street,
      town: town,
      country: country,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      email: email,
      image: uploadImage,
      interns: interns?.map((item: any) => item?.id),
    }
    await api.post(LOCATION, params)
    getSettingLocation(null)
    setLoading(false)
    Notifications({ title: 'Success', description: 'Location added successfully', type: 'success' })
  }

  // edit location
  const editSettingLocation = async (id: any, values: any) => {
    console.log(values);

    setLoading(true)
    const { address, country, email, interns, locationName, phoneCode, uploadImage, phoneNumber, postCode, street, town } = values;
    const params = {
      name: locationName,
      postCode: postCode,
      address: address,
      street: street,
      town: town,
      country: country,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      email: email,
      image: uploadImage,
      interns: interns
    }
    const { data } = await api.patch(`${LOCATION}/${id}`, params)
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
  const getAllInterns = async (companyId: any) => {
    const params = {
      companyId: companyId
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(INTERN_LIST, query);
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
