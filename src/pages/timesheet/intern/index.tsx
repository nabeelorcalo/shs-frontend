import { Button, Col, Row } from "antd";
import { useState } from "react";
import { AddIcon } from "../../../assets/images";
import { DropDown, BoxWrapper, SimpleTimer } from "../../../components";
import TimelineCalendar from "../timelineCalendar";
import './style.scss';

const Intern = () => {

  const boxShadow = '0px 0px 8px 1px rgba(9, 161, 218, 0.1)';
  const [category, setCategory] = useState('');

  return (
    <div className="time-sheet-intern">
      <div className="timesheet-top-heading text-2xl flex items-center justify-between gap-3 font-semibold pb-[30px] mb-[30px] capitalize">
        TimeSheet
        <Button className="view-history text-base font-semibold">View History</Button>
      </div>
      <Row gutter={[25, 25]}>
        <Col xl={16}>
          <BoxWrapper boxShadow={boxShadow} className="add-new-wrapper flex items-center justify-between flex-wrap gap-4">
            <div className="add-new-task flex items-center gap-3 cursor-pointer">
              <AddIcon />
              <p className="text-lg font-normal">Add New Task</p>
            </div>
            <div className="category-and-timer flex items-center flex-wrap gap-4">
              <DropDown
                pilled
                name="Category"
                value={category}
                setValue={setCategory}
                options={['design', 'research/R&D', 'requirements on confluence', 'user stories on jira', 'others']}
              />
              <div className="bar"></div>
              <SimpleTimer />
            </div>
          </BoxWrapper>
          <TimelineCalendar />
          <BoxWrapper boxShadow={boxShadow}></BoxWrapper>
        </Col>
        <Col xl={8}>
          <BoxWrapper boxShadow={boxShadow}></BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}

export default Intern