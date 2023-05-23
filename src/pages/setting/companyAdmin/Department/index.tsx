import React, { useEffect, useState } from "react";
import { DepartmentAddIcon } from "../../../../assets/images";
import { Col, Row, Typography, Button } from "antd";
import { Alert, NoDataFound, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import useCustomHook from "./actionHandler";
import { useRecoilState } from "recoil";
import { settingDepartmentState } from "../../../../store";
import AddNewDepaertmentModal from "./addNewDepaertmentModal";
import "./style.scss";

const SettingDepartment: React.FC = () => {
  const { settingDepartmentdata, getSettingDepartment, deleteSettingDepartment } = useCustomHook();
  const [edit, setEdit] = useState<any>({})
  // const [deleteModal, setDeleteModal] = useState<any>(false)
  const [state, setState] = useState<any>(
    {
      search: '',
      isEditModal: false,
      isDeleteModal: false,
      departmentId: null,
    }
  )

  useEffect(() => {
    getSettingDepartment(state.search)
  }, [state.search])

  return (
    <div className="setting-department">
      <div className="flex justify-between location-header">

        <SearchBar size="middle" handleChange={(e: any) => setState({ ...state, search: e })} />
        <Button
          size="middle"
          onClick={() => { setState({ ...state, isEditModal: true }); }}
          className="flex gap-2 setting-add-button white-color teriary-bg-color"
        >
          <DepartmentAddIcon /> Add Department
        </Button>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {settingDepartmentdata?.length === 0 ? <NoDataFound /> : null}
        {settingDepartmentdata?.map((data: any, index: number) => (
          <Col key={index} className="gutter-row" xs={24} xl={12} xxl={8}>
            <div className="department-box-wrapper">
              <div className="flex justify-between">
                <div>
                  <p className="text-lg font-semibold text-primary-color">
                    {data?.name}
                  </p>
                </div>
                <div className="float-right cursor-pointer">
                  <DropDownForSetting
                    state={state}
                    setState={setState}
                    id={data?.id}
                    editData={data}
                    SetEditData={setEdit}
                  />
                </div>
              </div>
              <p className="text-sm font-normal text-secondary-color ">
                {data?.description}
              </p>
            </div>
          </Col>
        ))
        }
      </Row>
      {state.isEditModal &&
        <AddNewDepaertmentModal state={state} setState={setState} edit={edit} setEdit={setEdit} />
      }
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={state.isDeleteModal}
        setState={setState}
        type="error"
        width={500}
        title=""
        children={<p>Are you sure you want to delete this?</p>}
        okBtnFunc={() => deleteSettingDepartment(state.departmentId)}
      />
    </div>
  );
};

export default SettingDepartment;
