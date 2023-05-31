import { useEffect, useState } from "react";
import { Divider, Button, Input } from "antd";
import { GlassMagnifier, NewTemplate } from "../../../../../assets/images";
import { Alert, Breadcrumb } from "../../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import useTemplatesCustomHook from "../actionHandler";

const TemplatesRejectionLetter = () => {
  // let overview = [
  //   {
  //     name: "Rejection Letter 01",
  //     content: "Join Our Team ",
  //   },
  //   {
  //     name: "Rejection Letter 02",
  //     content: "Be a Part of Our Team",
  //   },
  //   {
  //     name: "Rejection Letter 03",
  //     content: "Join Our World",
  //   },
  // ];
  const breadcrumbArray = [
    { name: "Rejection Letter" },
    { name: "Setting" },
    { name: "Template", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
  ];

  // const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
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
  return (
    <div className="template-contract">
      <div>
        <Breadcrumb breadCrumbData={breadcrumbArray} />
        <Divider />
        <div className="flex justify-between">
          <div className="input-wrapper">
            <Input className='search-bar' placeholder="Search"
              onChange={debouncedResults} prefix={<GlassMagnifier />} />
          </div>
          {/* <SearchBar size="middle" handleChange={handleChange} /> */}
          <Button
            size="middle"
            onClick={() => { navigate(ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE, { state: { templateType } }) }}
            className="flex gap-2 template-add-button white-color teriary-bg-color"
          >
            <NewTemplate /> New Template
          </Button>
          {/* <NavLink to={ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE}>
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <NewTemplate /> New Template
            </Button>
          </NavLink> */}
        </div>
      </div>
      {/* <TemplatesCommonCard
        link={ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE}
        overview={overview}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      /> */}
      <TemplatesCommonCard
        link={ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}
        overview={filterData}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        state={state}
        setState={setState}
        setEditData={setEditData}
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

export default TemplatesRejectionLetter;
