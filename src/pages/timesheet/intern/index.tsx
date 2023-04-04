import { Button, Col, Row } from "antd";
import { useState } from "react";
import { AddIcon } from "../../../assets/images";
import { DropDown, BoxWrapper, SimpleTimer, PageHeader } from "../../../components";
import TimelineCalendar from "../timelineCalendar";
import InternTable from "./internTable";
import TaskDetails from "./taskDetails";
import { useNavigate } from "react-router-dom";
import './style.scss';

const Intern = () => {

  const boxShadow = '0px 0px 8px 1px rgba(9, 161, 218, 0.1)';
  const [category, setCategory] = useState('');
  const id = '1';
  const navigate = useNavigate();

  return (
    <div className="time-sheet-intern">

      <PageHeader title='TimeSheet' bordered actions>
        <Button
          className="view-history text-base font-semibold"
          onClick={() => navigate(`/timesheet/view-history/${id}`)}
        >View History
        </Button>
      </PageHeader>

      {/* <div className="timesheet-top-heading text-2xl flex items-center justify-between gap-3 font-semibold pb-[30px] mb-[30px] capitalize">
        TimeSheet

      </div> */}
      <Row gutter={[25, 25]}>
        <Col xl={16} xs={24}>
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
          <InternTable />
        </Col>
        <Col xl={8} xs={24}>
          <TaskDetails />
        </Col>
      </Row>
    </div>
  )
}

export default Intern