import { useState } from "react";
import { Drawer, Slider, Input, Button, Row, Col } from "antd";
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
import { DropDown } from "../../../../../components";

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
  const formatter = (value: any) => `${value}%`;

  return (
    <div className="drawer=-wrapper">
      <Row>
        <Col sm={8} xs={24}>
          <Drawer
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
              <Slider className="w-full" tooltip={{ formatter }} />
              <ProgressIcon className="-my-1 ml-2" />
            </div>

            <label className="text-teriary-color font-normal text-base">
              Transport
            </label>
            <div className="flex justify-around my-3">
              {transportData.map((data: any) => (
                <div
                  className={`transort ${
                    data.id === selectedTransport ? "focus" : ""
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
                options={["item 1", "item 2", "item 3"]}
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
              <Input
                placeholder="Enter months"
                className="input-field-wrapper"
                type="number"
              />
            </div>
            <div className="text-end buttons-wrapper">
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
