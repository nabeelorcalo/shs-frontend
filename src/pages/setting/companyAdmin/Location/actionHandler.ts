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

  // post location
  const postSettingLocation = async (values: any) => {
    const { address, country, email, intern, locationName, phoneCode, phoneNumber, postCode, street, town } = values;
    const params = {
      name: locationName,
      postCode: postCode,
      address: address,
      street: street,
      town: town,
      country: country,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      email
    }
    await api.post(LOCATION, params)
    Notifications({ title: 'Success', description: 'Location added successfully', type: 'success' })
  }

  // edit location
  const editSettingLocation = async (id: any, values: any) => {
    const { address, country, email, intern, locationName, phoneCode, phoneNumber, postCode, street, town } = values;
    const params = {
      name: locationName,
      postCode: postCode,
      address: address,
      street: street,
      town: town,
      country: country,
      phoneCode: phoneCode,
      phoneNumber: phoneNumber,
      email
    }
    await api.patch(`${LOCATION}/${id}`, params)
    Notifications({ title: 'Success', description: 'Location edited successfully', type: 'success' })
  }

  // delete location
  const deleteSettingLocation = async (id: number) => {
    await api.delete(`${LOCATION}/${id}`);
    getSettingLocation(null)
    Notifications({ title: 'Success', description: 'Location deleted successfully', type: 'success' })
  };

  return {
    settingLocationdata,
    getSettingLocation,
    deleteSettingLocation,
    postSettingLocation,
    editSettingLocation
  };
};

export default useCustomHook;
