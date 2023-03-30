import { FC, ReactNode, useState } from "react";
import { Row, Radio, Divider } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import ListItem from "./ListItem";
import "./style.scss";

interface ITopPerformersList {
  image: string | ReactNode;
  name: string;
  designation: string;
  progress: string | number;
}
var monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const TopPerformers: FC<{
  topPerformersList: ITopPerformersList[];
  user?: string;
}> = (props) => {
  const { topPerformersList, user } = props;

  const currentMonth = new Date().getMonth();

  const [month, setMonth] = useState(currentMonth);

  // function for month chage
  const handleMonthChange = (e: any) => {
    setMonth(e?.target?.value);
  };

  return (
    <div className="wrapper-shadow bg-white p-5 rounded-2xl">
      <Row
        align="middle"
        justify="space-between"
        className={user === "companyAdmin" ? "mb-[12px]" : `mb-[30px]`}
      >
        <p className="font-medium text-[20px] leading-[28px]">Top Performers</p>
        <Row align="middle" className="gap-[9px]">
          <div className="text-primary-color text-base capitalize">
            {monthList[month]}
          </div>
          <Radio.Group onChange={handleMonthChange} value={month} size="small">
            <Radio.Button value={+month - 1}>
              <LeftOutlined />
            </Radio.Button>
            <Radio.Button value={+month + 1}>
              <RightOutlined />
            </Radio.Button>
          </Radio.Group>
        </Row>
      </Row>
      <Row>
        {topPerformersList?.map(
          ({ image, name, designation, progress }, index) => (
            <div className={user === "companyAdmin" ? "w-full" : `py-2 w-full`}>
              <ListItem
                key={index}
                image={image}
                name={name}
                designation={designation}
                progress={progress}
              />
              <Divider className="m-0" />
            </div>
          )
        )}
      </Row>
    </div>
  );
};
