import { useEffect, useState } from "react";
import { Divider, Button, Input } from "antd";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { GlassMagnifier, NewTemplate } from "../../../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { Alert, Breadcrumb, Loader, NoDataFound } from "../../../../../components";
import useTemplatesCustomHook from "../actionHandler";

const TemplatesContract = () => {
  const { state: templateType } = useLocation();
  const navigate = useNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState();
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
    { name: "Contract" },
    { name: "Settings", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Templates", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
  ];
  const { getAllTemplates, templatesData,
    debouncedSearch, deleteShifts, isLoading }: any = useTemplatesCustomHook();

  useEffect(() => {
    getAllTemplates(searchValue)
  }, [searchValue])

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
        <Divider className="my-1 mb-3" />

        <div className="flex max-sm:flex-col gap-4 justify-between">
          <div className="input-wrapper">
            <Input className='search-bar max-sm:w-full w-[375px]' placeholder="Search by name"
              onChange={debouncedResults} prefix={<GlassMagnifier />} />
          </div>
          <Button
            size="middle"
            onClick={() => { navigate(ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE, { state: { templateType } }) }}
            className="flex gap-2 setting-add-button white-color teriary-bg-color">
            <NewTemplate /> New Template
          </Button>
        </div>
        {filterData?.length === 0 ? <NoDataFound /> :
          !isLoading ? <TemplatesCommonCard
            link={ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}
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
    </div>
  );
};

export default TemplatesContract;
