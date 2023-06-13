import { Button, Col, Form, Row } from "antd";
import { useEffect, useState } from "react";
import { AddIcon } from "../../../assets/images";
import { DropDown, BoxWrapper, SimpleTimer, PageHeader } from "../../../components";
import TimelineCalendar from "../timelineCalendar";
import InternTable from "./internTable";
import TaskDetails from "./taskDetails";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import InternTimeSheetHook from "./actionHandler";
import dayjs from "dayjs";

const Intern = () => {
  const boxShadow = "0px 0px 8px 1px rgba(9, 161, 218, 0.1)";
  const [category, setCategory] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().startOf("week").format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(dayjs().endOf("week").format("YYYY-MM-DD"));
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();
  const {
    fetchTasks,
    timesheetTasks,
    graphData,
    fetchCategories,
    categoriesList,
    timelineData,
    fetchInternTimeline,
    addTask,
    addedId,
    updateTask,
  } = InternTimeSheetHook();
  const [form] = Form.useForm();
  useEffect(() => {
    fetchTimelineTasks();
  }, [startDate]);
  useEffect(() => {
    getAllTasks();
  }, []);
  const getAllTasks = () => {
    const date = dayjs().format("YYYY-MM-DD");
    fetchTasks({ date });
    fetchCategories();
  };
  const fetchTimelineTasks = () => {
    fetchInternTimeline({ startDate, endDate });
  };
  const handleAdd = () => {
    setAddModal(true);
    setEditData(null);
    setEditModal(false);
    form.resetFields();
    form.setFieldValue("taskCategory", category);
  };
  const updateTrigger = () => {
    updateTask({ taskId: addedId, endTime: dayjs().toISOString() }, () => {
      getAllTasks();
      fetchTimelineTasks();
    });
    setAddModal(false);
    // getAllTasks();
    // fetchTimelineTasks();
  };

  return (
    <div className="time-sheet-intern">
      <Row gutter={[25, 25]}>
        <Col xs={24}>
          <PageHeader title="TimeSheet" actions>
            <Button
              className="view-history text-base font-semibold"
              onClick={() => navigate(`/${ROUTES_CONSTANTS.INTERNTIMESHEETHISTORY}`)}
            >
              View History
            </Button>
          </PageHeader>
        </Col>
        <Col xl={16} xs={24}>
          <BoxWrapper
            boxShadow={boxShadow}
            className="add-new-wrapper flex items-center justify-between flex-wrap gap-4"
          >
            <div onClick={handleAdd} className="add-new-task flex items-center gap-3 cursor-pointer">
              <AddIcon />
              <p className="text-lg font-normal">Add New Task</p>
            </div>
            <div className="category-and-timer flex items-center flex-wrap gap-4">
              <DropDown
                pilled
                name="Category"
                value={category}
                setValue={(e: string) => {
                  setCategory(e);
                  form.setFieldsValue({ taskCategory: e });
                }}
                options={categoriesList.map((cat: any) => cat?.name)}
              />
              <div className="bar"></div>
              <SimpleTimer
                hideCounter={!addModal}
                hideIcon={!addModal}
                form={form}
                addedId={addedId}
                updateTrigger={updateTrigger}
              />
            </div>
          </BoxWrapper>
          <TimelineCalendar setStartDate={setStartDate} setEndDate={setEndDate} timelineData={timelineData} />
          <InternTable
            setEditData={setEditData}
            setEditModal={setEditModal}
            setAddModal={setAddModal}
            editModal={editModal}
            editData={editData}
            tableData={timesheetTasks?.tasks}
            totalTime={timesheetTasks?.totalTime}
          />
        </Col>
        <Col xl={8} xs={24}>
          <TaskDetails
            form={form}
            addModal={addModal}
            editModal={editModal}
            setEditModal={setEditModal}
            editData={editData}
            setEditData={setEditData}
            addTask={addTask}
            updateTask={updateTask}
            fetchTimelineTasks={fetchTimelineTasks}
            getAllTasks={getAllTasks}
            graphData={graphData}
            categoriesList={timesheetTasks?.totalTimeByCatgory}
            totalTime={timesheetTasks?.totalTime}
            categories={categoriesList}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Intern;
