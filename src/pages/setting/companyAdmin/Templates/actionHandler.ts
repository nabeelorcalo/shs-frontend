import { useRecoilState } from "recoil";
import { settingsTemplateState } from "../../../../store";
import api from "../../../../api";
import endpoints from "../../../../config/apiEndpoints";
import { debounce } from "lodash";
import { Notifications } from "../../../../components";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

// Chat operation and save into store
const useTemplatesCustomHook = () => {
  const navigate = useNavigate()
  const { SETTINGS_TEMPLATES, DELETE_SETTING_TEMPLATE,
    POST_SETTING_TEMPLATE, EDIT_SETTING_TEMPLATE } = endpoints
  const [templatesData, setTemplatesData] = useRecoilState(settingsTemplateState);

  // Get all templates 
  const getAllTemplates = async (searchValue?: any) => {
    const params = {
      limit: 100,
      page: 1,
      q: searchValue
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(SETTINGS_TEMPLATES, query);
    setTemplatesData(data)
  };

  //Search templates
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  // Post templates 
  const postNewTemplate = async (values: any) => {
    const { templateName, subject, templateType, textEditorValue } = values;
    const templateDetails = {
      "type": templateType,
      "name": templateName,
      "subject": subject,
      "description": textEditorValue
    }
    const { data } = await api.post(POST_SETTING_TEMPLATE, templateDetails);
    if (data) {
      navigate(ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER, { state: templateType });
      Notifications({ title: "Success", description: "Template added", type: "success" })
      getAllTemplates()
    }
  }

  //Delete templates
  const deleteShifts = async (id: any) => {
    await api.delete(`${DELETE_SETTING_TEMPLATE}/${id}`);
    getAllTemplates();
    Notifications({ title: "Success", description: 'Template deleted', type: 'success' })
  };

  // Edit timeSheet 
  const editTemplate = async (id: any, values: any, companyId: any) => {
    const { templateName, subject, templateType, textEditorValue } = values;

    const params = {
      companyId,
      type: templateType,
      name: templateName,
      subject: subject,
      description: textEditorValue
    }
    await api.patch(`${EDIT_SETTING_TEMPLATE}/${id}`, params);
    navigate(ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER, { state: templateType });
    getAllTemplates()
    Notifications({ title: "Success", description: 'Template updated', type: 'success' })
  };

  return {
    getAllTemplates,
    debouncedSearch,
    postNewTemplate,
    templatesData,
    deleteShifts,
    editTemplate
  };
};

export default useTemplatesCustomHook;