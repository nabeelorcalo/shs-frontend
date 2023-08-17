import { useEffect, useState } from "react";
import { Typography, Row, Col, Input, Button } from "antd";
import { GlassMagnifier, SettingTimesheetIcon, } from "../../../../assets/images";
import { Alert, Loader, NoDataFound } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import useTimesheetCustomHook from "./actionHandler";;
import AddCategory from "./AddCategory";
import "./style.scss";

const { Text } = Typography;

const SettingTimesheet = () => {
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

  const { getTimeSheetsData, timeSheetData,
    debouncedSearch, deleteTimeSheet, isLoading } = useTimesheetCustomHook();

  useEffect(() => {
    getTimeSheetsData(searchValue)
  }, [searchValue])


  // handle search timesheets 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  return (
    <div className="setting-time-sheet">
      <div className="flex justify-between location-header">
        <div className="input-wrapper">
          <Input className='search-bar max-sm:w-full w-[375px]' placeholder="Search by timesheet"
            onChange={debouncedResults} prefix={<GlassMagnifier />} />
        </div>
        <Button
          size="middle"
          onClick={() => { setState({ ...state, isEditModal: true, action: 'add' }) }}
          className="flex gap-2 setting-add-button white-color teriary-bg-color"
        >
          <SettingTimesheetIcon /> Add Category
        </Button>
      </div>
      {timeSheetData?.length === 0 ? <NoDataFound /> :
        <Row gutter={[20, 20]} className="mt-5">
          {
            !isLoading ? timeSheetData?.map((data: any, index: any) => {
              return (
                <Col key={index} className="gutter-row flex" xs={24} lg={12} xl={8}>
                  <div className="w-full setting-time-sheet-box-wrapper">
                    <div className="flex">
                      <div className="flex px-3 justify-between mt-2 w-full">
                        <div className="flex flex-col">
                          <Text className="text-sm font-normal md:text-lg md:font-semibold text-primary-color ">
                            {data?.name}
                          </Text>
                          <Text className="text-sm py-2 text-secondary-color ">
                            {data?.description}
                          </Text>
                        </div>
                        <span className="float-right cursor-pointer w-[40px]">
                          <DropDownForSetting
                            SetEditData={setEditData}
                            state={state}
                            setState={setState}
                            editData={data}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            }) : <Loader />
          }
        </Row>}


      {state.isEditModal && <AddCategory
        setEditData={setEditData}
        editData={editData}
        state={state}
        setState={setState}
      />}

      {state.isDeleteModal &&
        <Alert
          cancelBtntxt="Cancel"
          okBtntxt="Delete"
          state={state.isDeleteModal}
          setState={setState}
          type="error"
          width={570}
          okBtnFunc={() => deleteTimeSheet(state.id)}
          children={<p>Are you sure you want to delete this?</p>}
        />}
    </div>
  );
};

export default SettingTimesheet;
