import React, { Fragment, useEffect, useState } from "react";
import { DepartmentAddIcon } from "../../../../assets/images";
import { Col, Row } from "antd";
import { Alert, ButtonThemePrimary, Loader, NoDataFound, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import useDepartmentCustomHook from "./actionHandler";
import AddNewDepaertmentModal from "./addNewDepaertmentModal";
import "./style.scss";

const SettingDepartment: React.FC = () => {
  const { settingDepartmentdata,
    getSettingDepartment,
    deleteSettingDepartment,
    loading } = useDepartmentCustomHook();
  const [state, setState] = useState<any>(
    {
      search: '',
      isEditModal: false,
      isDeleteModal: false,
    }
  )

  useEffect(() => {
    getSettingDepartment(state.search)
  }, [state.search])

  return (
    <div className="setting-department">
      <div className="flex justify-between location-header">

        <SearchBar 
          placeholder="Search by department"
          className="max-sm:w-full w-[375px]"
          size="middle"
          handleChange={(e: any) => setState({ ...state, search: e })}
        />
        <ButtonThemePrimary
          onClick={() => { setState({ ...state, isEditModal: true }); }}
        >
          <DepartmentAddIcon /> Add Department
        </ButtonThemePrimary>
      </div>
      {settingDepartmentdata?.length === 0 && <NoDataFound />} 
      <Row gutter={[20, 20]} className="mt-5">
        {settingDepartmentdata?.map((data: any) => (
          <Fragment key={data.id}>
            {loading ? <Loader /> : <Col className="gutter-row" xs={24} xl={12} xxl={8}>
              <div className="department-box-wrapper">
                <div className="flex justify-between gap-3">
                  <div className="flex flex-wrap flex-col break-all">
                    <p className="text-lg font-semibold text-primary-color">
                      {data?.name}
                    </p>
                    <p className="text-sm font-normal text-secondary-color w-[200px] sm:w-[250px] xl:w-[330px] text-ellipsis overflow-hidden whitespace-nowrap">
                      {data?.description}
                    </p>
                  </div>
                  <div className="float-right cursor-pointer">
                    <DropDownForSetting
                      state={state}
                      setState={setState}
                      editData={data}
                    />
                  </div>
                </div>
              </div>
            </Col>}
          </Fragment>
        ))
        }
      </Row> 
      {state.isEditModal &&
        <AddNewDepaertmentModal state={state} setState={setState} />
      }
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={570}
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteSettingDepartment(state.id)}
      />
    </div>
  );
};

export default SettingDepartment;
