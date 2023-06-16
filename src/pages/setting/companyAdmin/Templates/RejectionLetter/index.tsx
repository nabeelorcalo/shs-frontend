import { useEffect, useState } from "react";
import { Divider, Button, Input } from "antd";
import { GlassMagnifier, NewTemplate } from "../../../../../assets/images";
import { Alert, Breadcrumb, Loader, NoDataFound } from "../../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import useTemplatesCustomHook from "../actionHandler";

const TemplatesRejectionLetter = () => {
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

  const breadcrumbArray = [
    { name: "Rejection Letter" },
    { name: "Settings", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Template", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
  ];
  const { getAllTemplates, templatesData,
    debouncedSearch, deleteShifts, isLoading }: any = useTemplatesCustomHook();

  useEffect(() => {
    getAllTemplates(searchValues)
  }, [searchValues])

  const filterData = templatesData?.filter((item: any) => item?.type === templateType);

  // handle search templates 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  return (
    <div className="template-contract">
      <div>
        <Breadcrumb breadCrumbData={breadcrumbArray} />
        <Divider />
        <div className="flex max-sm:flex-col gap-4 justify-between">
          <div className="input-wrapper">
            <Input className='search-bar max-sm:w-full w-[375px]' placeholder="Search by name"
              onChange={debouncedResults} prefix={<GlassMagnifier />} />
          </div>
          <Button
            size="middle"
            onClick={() => { navigate(ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE, { state: { templateType } }) }}
            className="flex gap-2 template-add-button white-color teriary-bg-color">
            <NewTemplate /> New Template
          </Button>
        </div>
      </div>
      {filterData?.length === 0 ? <NoDataFound /> :
        !isLoading ? <TemplatesCommonCard
          link={ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE}
          overview={filterData}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
          state={state}
          setState={setState}
          setEditData={setEditData}
        /> : <Loader />
      }
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={570}
        okBtnFunc={() => deleteShifts(state.id)}
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default TemplatesRejectionLetter;
