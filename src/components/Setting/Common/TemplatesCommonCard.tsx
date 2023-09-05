import React from "react";
import { Col, Row, Typography } from "antd";
import DropDownForSetting from "./CustomSettingDropdown";
import "./TemplatesCommonCard.scss";
interface ITEMPLATE {
  overview?: {
    name?: string;
    content?: string;
  }[];

  setShowDeleteModal?: React.Dispatch<React.SetStateAction<boolean>>;
  showDeleteModal?: boolean;
  link?: string;
  state?: any;
  setState?: any
  setEditData?: any
}

const { Text } = Typography;
const TemplatesCommonCard = (props: ITEMPLATE) => {
  const { overview, setEditData, link, state, setState } = props;

  const limitText = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="templates-common-card">
      <Row gutter={[20, 20]} className="mt-5">
        {overview?.map((item: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={12} lg={8} xl={6}>
              <div className="common-card-box-wrapper w-full">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Text className="text-sm font-normal md:text-lg md:font-semibold text-primary-color">
                        {item?.name}
                      </Text>
                      {item?.type === "offerLetter" ? 
                      <p className="my-2 w-[200px] sm:w-[250px] xl:w-[250px] text-ellipsis overflow-hidden whitespace-nowrap">{item?.subject}</p> : 
                      <p dangerouslySetInnerHTML={{
                        __html: limitText(item?.description, 100), 
                      }}
                        className="text-sm font-normal text-secondary-color max-lines
                        w-[200px] sm:w-[250px] xl:w-[250px] text-ellipsis overflow-hidden whitespace-nowrap
                        " />}
                    </div>
                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting
                        link={link}
                        SetEditData={setEditData}
                        state={state}
                        setState={setState}
                        editData={item}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default TemplatesCommonCard;
