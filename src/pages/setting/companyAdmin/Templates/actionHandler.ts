import { useRecoilState } from "recoil";
import { settingsTemplateState } from "../../../../store";
import api from "../../../../api";
import endpoints from "../../../../config/apiEndpoints";
// import constants from "../../../../config/constants";

// Chat operation and save into store
const useTemplatesCustomHook = () => {
  const { SETTINGS_TEMPLATES } = endpoints
  const [templatesData, setTemplatesData] = useRecoilState(settingsTemplateState);

  const getAllTemplates = async () => {
    const { data } = await api.get(SETTINGS_TEMPLATES, { page: 1, limit: 100 });
    setTemplatesData(data)
  };

  return {
    getAllTemplates,
    templatesData
  };
};

export default useTemplatesCustomHook;