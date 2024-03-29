import { useEffect, useRef, useState } from "react";
import { Drawer, Slider, InputNumber, Button, Row, Col, Select } from "antd";
import { CrossIcon, Home2, ProgressIcon, Boy, Cycle, Car, Bus } from "../../../../../assets/images";
import InputField from "../../../Input/input";
import { ButtonThemePrimary, ButtonThemeSecondary, DrawerWidth, Notifications } from "../../../../../components";
import UserSelector from "../../../../../components/UserSelector";
import useCustomHook from "../../../actionHandler";
import "./Styles.scss";

const { Option } = Select;

const transportData = [
  {
    id: "1",
    icon: <Boy />,
  },
  {
    id: "2",
    icon: <Cycle />,
  },
  {
    id: "3",
    icon: <Car />,
  },
  {
    id: "4",
    icon: <Bus />,
  },
];
const DrawerBar = (props: any) => {
  const isIntial = useRef(true)
  const { drawer, setDrawer } = props;
  const [selectedTransport, setSelectedTransport] = useState("");
  const [workType, setWorkType] = useState(undefined);
  const [duration, setDuration] = useState<any>(undefined);
  const { getSearchJob } = useCustomHook();

  // useEffect(() => {
  //   if (isIntial.current) {
  //     isIntial.current = false;
  //     getSearchJob(null, workType, duration);
  //   }
  //   }, []);

  const mainDrawerWidth = DrawerWidth();
  const typeOfWorkArr = [
    {
      value: "ALL",
      label: "All",
    },
    {
      value: "PAID",
      label: "Paid",
    },
    {
      value: "UNPAID",
      label: "Unpaid",
    },
    {
      value: "PART_TIME",
      label: "Part Time",
    },
    {
      value: "FULL_TIME",
      label: "Full Time",
    },
  ];
  const handleApply = () => {
    getSearchJob(null, workType, duration);
    setDrawer(false);
    Notifications({ title: "Success", description: "Filter Apply Successfully", type: "success" });
  };
  const handleResetBtn = () => {
    setDrawer(false);
    setWorkType(undefined);
    setDuration(undefined);
    getSearchJob();
  };
  return (
    <div className="drawer-wrapper">
      <Row>
        <Col sm={8} xs={24}>
          <Drawer
            className="white-bg-color"
            width={mainDrawerWidth > 1400 ? 380 : 300}
            closable={false}
            placement="right"
            onClose={() => setDrawer(false)}
            open={drawer}
          >
            <div className="flex justify-between align-middle ">
              <p className="primary-color font-semibold text-2xl ">Filter</p>
              <CrossIcon onClick={() => setDrawer(false)} className="cursor-pointer" />
            </div>
            <div className="py-3">
              <label className="text-teriary-color text-base ">Starting Point</label>
              <InputField placeholder={"Post code or address"} className="input-filed my-3" />
            </div>
            <label className="text-teriary-color font-normal text-base">Commute Time</label>
            <div className=" my-5 flex justify-between ">
              <Home2 className="-mt-2 mr-3" />
              <Slider className="w-full" defaultValue={0} step={15} />
              <ProgressIcon className="-mt-2 ml-2" />
            </div>

            <label className="text-teriary-color font-normal text-base">Transport</label>
            <div className="flex justify-around my-3 cursor-pointer">
              {transportData.map((data: any, i: any) => (
                <div
                  key={i}
                  className={`transort ${data.id === selectedTransport ? "transport-focus" : ""}`}
                  onClick={() => setSelectedTransport(selectedTransport ? "" : data.id)}
                >
                  {data.icon}
                </div>
              ))}
            </div>
            <div>
              <UserSelector
                label="Type of work"
                className="w-full mt-3 mb-5"
                options={typeOfWorkArr}
                value={workType}
                placeholder="Select"
                onChange={(e: any) => setWorkType(e)}
              />
            </div>
            <label className="my-3 text-teriary-color font-normal text-base">Duration</label>
            <div className="my-5">
              <InputNumber
                type="number"
                max={12}
                min={1}
                value={duration}
                formatter={(value) => `${value}`}
                onChange={(e: any) => {
                  setDuration(e);
                }}
                placeholder="Enter months"
                className="w-full input-number h-[30px]"
              />
            </div>
            <div className="flex justify-end">
              {/* <ButtonThemeSecondary className="mx-3 font-semibold text-base" onClick={handleResetBtn}>Reset</ButtonThemeSecondary>
              <ButtonThemePrimary className="font-semibold text-base" onClick={handleApply}>Apply</ButtonThemePrimary> */}
              <div className="flex justify-end mt-4 gap-2">
                <ButtonThemeSecondary key="Cancel" onClick={handleResetBtn}>Reset</ButtonThemeSecondary>
                <ButtonThemePrimary key="submit" onClick={handleApply}>Apply</ButtonThemePrimary>
              </div>
            </div>
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

export default DrawerBar;
