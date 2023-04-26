import { useState } from "react";
import {
  Drawer,
  Slider,
  InputNumber,
  Button,
  Row,
  Col,
} from "antd";
import {
  CrossIcon,
  Home2,
  ProgressIcon,
  Boy,
  Cycle,
  Car,
  Bus,
} from "../../../../../assets/images";
import InputField from "../../../Input/input";
import "./Styles.scss";
import { DrawerWidth, DropDown, } from "../../../../../components";

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
  const { drawer, setDrawer } = props;
  const [selectedTransport, setSelectedTransport] = useState("");
  const [workType, setWorkType] = useState("");
  const [selectedWorkType, setSelectedWorkType] = useState([]);
  const mainDrawerWidth = DrawerWidth();
  return (
    <div className="drawer=-wrapper">
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
            <div className="flex justify-between align-middle">
              <p className="primary-color font-semibold text-2xl">Filter</p>
              <CrossIcon />
            </div>
            <div className="py-3">
              <label>Starting Point</label>
              <InputField
                placeholder={"Post code or address"}
                className="input-filed my-3"
              />
            </div>
            <label className="text-teriary-color font-normal text-base">
              Commute Time
            </label>
            <div className=" my-5 flex justify-between ">
              <Home2 className="-my-1 mr-2" />
              <Slider className="w-full" defaultValue={0} step={15} />
              <ProgressIcon className="-my-1 ml-2" />
            </div>

            <label className="text-teriary-color font-normal text-base">
              Transport
            </label>
            <div className="flex justify-around my-3">
              {transportData.map((data: any) => (
                <div
                  className={`transort ${
                    data.id === selectedTransport ? "transport-focus" : ""
                  }`}
                  onClick={() =>
                    setSelectedTransport(selectedTransport ? "" : data.id)
                  }
                >
                  {data.icon}
                </div>
              ))}
            </div>

            <label className="mt-2 text-teriary-color font-normal text-base">
              Type of Work
            </label>
            <div className="mt-3 mb-5">
              <DropDown
                name="drop down with checkbox"
                value={workType}
                options={["Paid", "Unpaid", "Part Time", "Full Time"]}
                setValue={setWorkType}
                requireCheckbox
                selectedList={selectedWorkType}
                setSelectedList={setSelectedWorkType}
              />
            </div>

            <label className="my-3 text-teriary-color font-normal text-base">
              Duration
            </label>
            <div className="my-5">
              <InputNumber className="w-full input-number" />
            </div>
            <div className="flex justify-end buttons-wrapper">
              <Button className="Reset-button mx-3">Reset</Button>
              <Button className="Apply-button">Apply</Button>
            </div>
          </Drawer>
        </Col>
      </Row>
    </div>
  );
};

export default DrawerBar;
