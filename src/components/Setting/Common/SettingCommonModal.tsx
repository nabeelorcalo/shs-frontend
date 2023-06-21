import { useEffect, useState } from "react";
import { PopUpModal } from "../../Model";
import { SearchBar } from "../../SearchBar/SearchBar";
import { Avatar, Button } from "antd";
import { BoxWrapper } from "../../../components";
import { SettingRightArrrow } from "../../../assets/images";
import "./SettingCommonModal.scss";
interface ISETTINGCOMMONARRAY {
  selectArray: any;
  deselectArray: any;
  openModal: boolean;
  setOpenModal: any;
  state: any
}
export const SettingCommonModal = (props: ISETTINGCOMMONARRAY) => {
  const { selectArray, deselectArray, openModal, setOpenModal, state } = props;
  const [selectArrayData, setSelectArrayData] = useState<any>(selectArray);
  const [deselectArrayData, setDeselectArrayData] =
    useState<any>(deselectArray);

  const selectArrayDataCpy = [...selectArrayData];
  const deselectArrayCpy = [...deselectArrayData];

  const SelectHandler = (index: any) => {
    deselectArrayCpy.push(selectArrayData[index]);
    selectArrayDataCpy.splice(index, 1);

    setDeselectArrayData(deselectArrayCpy);
    setSelectArrayData(selectArrayDataCpy);
  };

  const DeselectHandler = (index: any) => {
    selectArrayDataCpy.push(deselectArrayData[index]);
    deselectArrayCpy.splice(index, 1);

    setSelectArrayData(selectArrayDataCpy);
    setDeselectArrayData(deselectArrayCpy);
  };
  const SelectAllHandler = (data: any) => {
    setSelectArrayData([]);
    setDeselectArrayData([...deselectArrayData, ...data]);
  };
  const DeselectAllHandler = (data: any) => {
    setDeselectArrayData([]);
    setSelectArrayData([...selectArrayData, ...data]);
  };

  const handleChange = (e: any) => {
    if (e.trim() === '') setSelectArrayData(selectArray)
    else {
      const searchedData = selectArray?.filter((emp: any) => emp?.name?.toLowerCase()?.includes(e))
      setSelectArrayData(searchedData)
    }
  }

  const HandlerSubmit = () => {
    setOpenModal({ ...state, openModal: false, internValue: 2, interns: deselectArrayData })
  }


  return (
    <div>
      <PopUpModal
        open={openModal}
        width={700}
        close={() => setOpenModal(false)}
        title="Select Interns"
        footer=""
      >
        <div className="setting-common-modal">
          <SearchBar size="middle" handleChange={handleChange} />
          <div className="gap-2 flex my-5">
            <BoxWrapper className="w-full h-[400px] relative box-wrapper">
              <div>
                <p
                  className="flex justify-end cursor-pointer font-semibold text-success-placeholder-color"
                  onClick={() => {
                    SelectAllHandler(selectArrayData);
                  }}
                >
                  Select all
                </p>
                <div className="h-[320px] box-wrapper-content">
                  {selectArrayData?.map((data: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="py-3 flex  justify-between cursor-pointer"
                        onClick={() => {
                          SelectHandler(index);
                        }}
                      >
                        <div>
                          <Avatar size={30} src={data.image} >
                            <span className="text-sm">{data?.name}</span>
                          </Avatar>
                          <span className="px-3 text-base font-medium">
                            {data.name}
                          </span>
                        </div>
                        <div>
                          <SettingRightArrrow className="" />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <span className="absolute bottom-[5px]">
                  Total : {selectArrayData.length}
                </span>
              </div>
            </BoxWrapper>
            <BoxWrapper className="w-full h-[400px] relative">
              <div>
                <p
                  className="flex justify-end cursor-pointer font-semibold text-success-placeholder-color"
                  onClick={() => {
                    DeselectAllHandler(deselectArrayData);
                  }}
                >
                  Deselect
                </p>
                {!!deselectArrayData.length && (
                  <div className="h-[320px] box-wrapper-content">
                    {deselectArrayData.map((data: any, index: number) => {
                      return (
                        <div
                          key={index}
                          className="py-3 flex justify-between cursor-pointer "
                          onClick={() => {
                            DeselectHandler(index);
                          }}
                        >
                          <div>
                            <Avatar size={30} src={data.image} >
                              <span className="text-sm">{data?.name}</span>
                            </Avatar>
                            <span className="px-3 text-base font-medium">
                              {data?.name}
                            </span>
                          </div>
                          <div>
                            <SettingRightArrrow />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                <span className="absolute bottom-[5px]">
                  Total : {deselectArrayData.length}
                </span>
              </div>
            </BoxWrapper>
          </div>
          <div className="setting-common-modal-footer gap-2 flex justify-end">
            <Button key="Cancel" className="footer-cancel-btn " onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button key="submit" className="footer-submit-btn" onClick={HandlerSubmit}>
              Add
            </Button>
          </div>
        </div>
      </PopUpModal>
    </div>
  );
};

export default SettingCommonModal;