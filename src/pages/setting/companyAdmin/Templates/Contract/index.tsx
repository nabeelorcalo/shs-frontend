import { useEffect, useState } from "react";
import { Divider, Button, Input } from "antd";
import { GlassMagnifier, NewTemplate } from "../../../../../assets/images";
import { Alert, Breadcrumb } from "../../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import useTemplatesCustomHook from "../actionHandler";

const TemplatesContract = () => {

  // let overview = [
  //   {
  //     name: "Contract 01",
  //     content: "Exciting News: Your job Offer and Contract Inside",
  //   },
  //   {
  //     name: "Contract 02",
  //     content: "Take the First Step Today!",
  //   },
  //   {
  //     name: "Contract 03",
  //     content: "Congratulations! You are selected.",
  //   },
  // ];

  const breadcrumbArray = [
    { name: "Contract" },
    { name: "Setting" },
    { name: "Template", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
  ];
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

  const { state: templateType } = useLocation();
  const navigate = useNavigate()
  const { getAllTemplates, templatesData,
    debouncedSearch, deleteShifts }: any = useTemplatesCustomHook();

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

        <div className="flex justify-between">
          <div className="input-wrapper">
            <Input className='search-bar' placeholder="Search"
              onChange={debouncedResults} prefix={<GlassMagnifier />} />
          </div>
          {/* <NavLink to={ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}> */}
          <Button
            size="middle"
            onClick={() => { navigate(ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE, { state: { templateType } }) }}
            className="flex gap-2 setting-add-button white-color teriary-bg-color"
          >
            <NewTemplate /> New Template
          </Button>
          {/* </NavLink> */}
        </div>
        <TemplatesCommonCard
          link={ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}
          overview={filterData}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
          state={state}
          setState={setState}
          setEditData={setEditData}
        />
        {/* <TemplatesCommonCard
          link={ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}
          overview={filterData}
          setShowDeleteModal={setShowDeleteModal}
          showDeleteModal={showDeleteModal}
        /> */}
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
        {/* <Alert
          cancelBtntxt="Cancel"
          okBtntxt="Delete"
          state={showDeleteModal}
          setState={setShowDeleteModal}
          type="error"
          width={500}
          title=""
          children={<p>Are you sure you want to delete this?</p>}
        /> */}
      </div>
    </div>
  );
};

export default TemplatesContract;
