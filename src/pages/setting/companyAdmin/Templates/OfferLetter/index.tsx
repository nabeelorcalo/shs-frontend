import { useEffect, useState } from "react";
import { Divider, Input } from "antd";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { GlassMagnifier, NewTemplate } from "../../../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import useTemplatesCustomHook from "../actionHandler";
import { Alert, Breadcrumb, ButtonThemePrimary, Loader, NoDataFound } from "../../../../../components";
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
  const breadcrumbArray = [
    { name: "Offer Letter" },
    { name: "Settings", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Templates", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
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
    <div >
      <div>
        <Breadcrumb breadCrumbData={breadcrumbArray} />
        <Divider />
        <div className="flex max-sm:flex-col  justify-between gap-4">
          <div className="input-wrapper">
            <Input className='search-bar max-sm:w-full w-[375px]' placeholder="Search by offer letter"
              onChange={debouncedResults} prefix={<GlassMagnifier />} />
          </div>
          <ButtonThemePrimary
            icon={<NewTemplate />}
            onClick={() => { navigate(ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE, { state: { templateType } }) }}>
            New Template
          </ButtonThemePrimary>
        </div>
      </div>
      {filterData?.length === 0 ? <NoDataFound /> :
        !isLoading ?
          <TemplatesCommonCard
            link={ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}
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

export default TemplatesOfferLater;
