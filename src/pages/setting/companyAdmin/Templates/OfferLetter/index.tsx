import { useEffect, useState } from "react";
import { Divider, Button, Input } from "antd";
import { GlassMagnifier, NewTemplate } from "../../../../../assets/images";
import { Alert, Breadcrumb } from "../../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import useTemplatesCustomHook from "../actionHandler";
import '../Template.scss'


const TemplatesOfferLater = () => {
  const navigate = useNavigate()
  const { state: templateType } = useLocation();
  const [searchValues, setSearchValue] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [editData, setEditData] = useState<any>({});
  const [state, setState] = useState<any>(
    {
      isDeleteModal: false,
      isEditModal: false,
      id: null,
      action: ''
    }
  )

  const { getAllTemplates, templatesData,
    debouncedSearch, deleteShifts }: any = useTemplatesCustomHook();

  useEffect(() => {
    getAllTemplates(searchValues)
  }, [searchValues])

  const filterData = templatesData?.filter((item: any) => item?.type === templateType);
  

  // handle search templates 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  const breadcrumbArray = [
    { name: "Offer Letter" },
    { name: "Setting" },
    { name: "Template", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
  ];

  return (
    <div>
      <div>
        <Breadcrumb breadCrumbData={breadcrumbArray}/>
        <Divider />
        <div className="flex justify-between">
          <div className="input-wrapper">
            <Input className='search-bar' placeholder="Search"
              onChange={debouncedResults} prefix={<GlassMagnifier />} />
          </div>
          <Button
            size="middle"
            onClick={() => { navigate(ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE, { state: { templateType } }) }}
            className="flex gap-2 template-add-button white-color teriary-bg-color"
          >
            <NewTemplate /> New Template
          </Button>
        </div>
      </div>
      <TemplatesCommonCard
        link={ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}
        overview={filterData}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        state={state}
        setState={setState}
        setEditData={setEditData}  
      />
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        title=""
        okBtnFunc={() => deleteShifts(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default TemplatesOfferLater;
