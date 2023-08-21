import { FC, ReactNode, useState } from "react";
import { Row, Radio, Divider } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Constants from "../../config/constants";
import ListItem from "./ListItem";
import "./style.scss";
import useCustomHook from "../../pages/dashboard/actionHandler";
import { NoDataFound } from "../NoData";
import Loader from "../Loader";
interface ITopPerformersList {
  image: string | ReactNode;
  name: string;
  designation: string;
  progress: string | number;
}
var monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const TopPerformers: FC<{
  topPerformersList: ITopPerformersList[];
  user?: string;
  loading?: boolean;
}> = (props) => {
  const { topPerformersList, user, loading } = props;
  const { getTopPerformerList } = useCustomHook();
  const currentMonth = new Date().getMonth();
  const [month, setMonth] = useState(currentMonth);
  // function for month chage
  const handleMonthChange = (e: any) => {
    getTopPerformerList({ month: e?.target?.value });
    setMonth(e?.target?.value);
  };

  return (
    <div className="wrapper-shadow bg-white p-5 rounded-2xl">
      <Row
        align="middle"
        justify="space-between"
        className={
          user === Constants?.COMPANY_ADMIN ? "mb-[12px]" : user === Constants?.UNIVERSITY ? `mb-[26px]` : `mb-[30px]`
        }
      >
        <p className="font-medium text-[20px] leading-[28px]">Top Performers</p>
        <Row align="middle" className="gap-[9px] flex-nowrap">
          <div className="text-primary-color text-base capitalize">{monthList[month]}</div>
          <Radio.Group onChange={handleMonthChange} value={month} size="small">
            <Radio.Button value={month === 0 ? 0 : +month - 1} disabled={month === 0}>
              <LeftOutlined />
            </Radio.Button>
            <Radio.Button value={month === currentMonth ? currentMonth : +month + 1} disabled={month === currentMonth}>
              <RightOutlined />
            </Radio.Button>
          </Radio.Group>
        </Row>
      </Row>
      {loading ? (
        <div className="h-[215px]">
          <Loader />
        </div>
      ) : (
        <Row>
          {topPerformersList?.length > 0 ? (
            topPerformersList?.map(({ image, name, designation, progress }, index) => (
              <div
                className={
                  user === Constants?.COMPANY_ADMIN
                    ? "w-full"
                    : user === Constants?.UNIVERSITY
                      ? "w-full py-[2px]"
                      : `py-2 w-full`
                }
              >
                <ListItem key={index} image={image} name={name} designation={designation} progress={progress} />
                <Divider className="m-0" />
              </div>
            ))
          ) : (
            <div className="max-h-[215px] flex items-center w-full justify-center">
              <NoDataFound isNoBorder={true} />
            </div>
          )}
        </Row>
      )}
    </div>
  );
};
