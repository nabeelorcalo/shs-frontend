import { useEffect, useState } from "react";
import { Col, Collapse, Row } from "antd";
import { CircleMinusIcon, CirclePlusIcon, ClockDarkIcon, TaskListIcon } from "../../../assets/images";
import TimesheetTable from "./timesheetTable";
const { Panel } = Collapse;
import "./style.scss";

const colorCodes = ["#5D89F4", "#FFC200", "#E76864"];

const RenderPanel = (props: any) => {
  const { dateTime, totalTasks, totalTime } = props;
  return (
    <Row gutter={[20, 20]} className=" items-center panel-main">
      <Col xxl={16} xl={16} lg={12} md={24} className="capitalize">
        <Row gutter={15}>
          <Col>
            <p className="md:w-[220px]">{dateTime}</p>
          </Col>
          <div className="seperator"></div>
          <Col>
            <div className="flex items-center">
              <TaskListIcon className="mr-[10px]" />
              <p className="tasks">
                Tasks: &nbsp;
                {totalTasks < 10 ? `0${totalTasks}` : totalTasks}
              </p>
            </div>
          </Col>
          <div className="seperator"></div>
          <Col>
            <div className="flex items-center">
              <ClockDarkIcon className="mr-[10px]" />
              <p className="tasks">{totalTime}</p>
            </div>
          </Col>
        </Row>
      </Col>
      <Col xxl={8} xl={8} lg={12} md={24} className="flex-end">
        <Row>
          <Col>
            <div className="flex justify-end flex-1 gap-3 flex-wrap panel-right">
              {colorCodes.map((color) => (
                <div className="h-[30px] w-[100px] rounded-[4px]" style={{ background: color }}></div>
              ))}
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
    // <div className='flex flex-wrap items-center panel-main'>
    //     <div className="flex items-center gap-3 capitalize panel-left">
    //         <p className='md:w-[220px]'>{dateTime}</p>
    //         <div className="seperator"></div>
    //         <div className="flex items-center">
    //             <TaskListIcon className='mr-[10px]' />
    //             <p className='tasks'>Tasks: &nbsp;
    //                 {totalTasks < 10 ? `0${totalTasks}` : totalTasks}
    //             </p>
    //         </div>
    //         <div className="seperator"></div>
    //         <div className="flex items-center">
    //             <ClockDarkIcon className='mr-[10px]' />
    //             <p className='tasks'>{totalTime}</p>
    //         </div>
    //     </div>
    //     <div className='flex justify-end flex-1 gap-3 flex-wrap panel-right'>
    //         {['#5D89F4', '#FFC200', '#E76864'].map(color => (
    //             <div
    //                 className='h-[30px] w-[100px] rounded-[4px]'
    //                 style={{ background: color }}>
    //             </div>
    //         ))}
    //     </div>
    // </div>
  );
};

const CommonTableCollapsible = (props: any) => {
  const { id, dateTime, totalTasks, totalTime, tableData, setSelectedHistory, isOpen, setCollapseOpen } = props;
  const handleCollapseChange = (e: any) => {
    const newToggleState = !isOpen;
    setCollapseOpen(newToggleState);
    setSelectedHistory(newToggleState ? dateTime : null);
  };
  return (
    <Collapse
      size="large"
      expandIcon={isOpen ? CircleMinusIcon : CirclePlusIcon}
      onChange={handleCollapseChange}
      key={id}
      collapsible="icon"
      className={` bg-white border-0 history-detail rounded-[16px] mt-[10px]`}
    >
      <Panel header={<RenderPanel dateTime={dateTime} totalTasks={totalTasks} totalTime={totalTime} />} key={id}>
        {isOpen && <TimesheetTable tableData={tableData} />}
      </Panel>
    </Collapse>
  );
};

export default CommonTableCollapsible;
