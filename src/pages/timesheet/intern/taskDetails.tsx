import React, { useState } from "react";
import {
  BoxWrapper,
  Button,
  CommonDatePicker,
  DropDown,
  Input,
  TimePickerFormat,
  TimesheetCategories,
} from "../../../components";
import { TagPrimaryIcon, TagSuccessIcon, TagWarningIcon } from "../../../assets/images";
import { Row, Col, Form } from "antd";
import TimePickerComp from "../../../components/calendars/TimePicker/timePicker";
import dayjs from "dayjs";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";

const TaskDetails = (props: any) => {
  const {
    categoriesList,
    graphData,
    categories,
    addModal,
    editModal,
    setEditModal,
    totalTime,
    editData,
    setEditData,
    form,
    addTask,
    updateTask,
    getAllTasks,
    fetchTimelineTasks,
  } = props;
  const [taskDetailVal, setTaskDetailVal] = useState({
    taskName: "",
    date: "",
    category: "",
    startTime: "",
    endTime: "",
    // categoriesList: [
    //   { id: "1", title: "design task", hours: "21h:29m" },
    //   { id: "2", title: "outdoor activities", hours: "21h:29m" },
    //   { id: "3", title: "research", hours: "21h:29m" },
    // ],
  });
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (editData) {
    form.setFieldsValue({
      taskName: editData?.taskName,
      taskCategory: editData?.taskCategory,
      taskDate: editData?.taskDate,
      startTime: editData?.startTime,
      endTime: editData?.endTime,
    });
  }
  const [loadMore, setLoadMore] = useState(3);

  const [openTime, setOpenTime] = useState({ start: false, end: false });

  // const categories = ["design", "research/R&D", "requirement on confluence", "user stories on jira", "others"];

  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleChange = (e: string, type: string) => {
    setTaskDetailVal((prevState) => ({ ...prevState, [type]: e }));
  };

  const handleLoadMore = () => {
    setLoadMore((prevLoadMore) => prevLoadMore + 3);
  };
  const handleFinish = (values: any) => {
    if (addModal) {
      const { taskName, taskCategory } = values;
      addTask({ taskName, taskCategory, startTime: dayjs().toISOString() });
    } else if (editModal) {
      const { taskName, taskCategory } = values;
      updateTask(
        {
          taskName,
          taskId: editData?.id,
          taskCategory,
          startTime: startTime ? dayjs(startTime, "hh:mm").toISOString() : editData?.startTime,
          endTime: endTime ? dayjs(endTime, "hh:mm").toISOString() : editData?.endTime,
        },
        () => {
          getAllTasks();
          fetchTimelineTasks();
        }
      );
      setEditModal(!editModal);
    }
  };

  return (
    <BoxWrapper boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="intern-task-detail">
      {(addModal || editModal) && (
        <Form id="taskForm" form={form} onFinish={handleFinish} validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
          <p className="font-medium text-xl task-heading mb-[20px]">Task Details</p>
          <Form.Item name="taskName" rules={[{ required: true }]}>
            <Input
              type="text"
              className="task-name "
              name="taskName"
              placeholder="Task Name"
              // value={editData?.taskName || taskDetailVal.taskName}
              handleChange={(e: any) => handleChange(e.target.value, "taskName")}
            />
          </Form.Item>

          <CommonDatePicker
            className="task-date-picker mb-[30px]"
            open={openDatePicker}
            setOpen={setOpenDatePicker}
            setValue={(e: string) => handleChange(e, "datePicker")}
            disabled
          />
          <Form.Item name="taskCategory" rules={[{ required: true }]}>
            <DropDown
              options={categories.map((cat: any) => cat.name)}
              name="Category"
              // value={editData?.taskCategory || taskDetailVal.category}
              setValue={(e: string) => form.setFieldsValue({ taskCategory: e })}
            />
          </Form.Item>

          <Row className="mb-[30px]" gutter={[20, 20]}>
            <Col lg={12}>
              <TimePickerFormat
                disabled={!editModal}
                label={"Start Time"}
                open={openTime.start}
                setOpen={() => setOpenTime({ start: !openTime.start, end: false })}
                setValue={(val: string) => setStartTime(val)}
                optionalTime={editData && dayjs(editData?.startTime)}
              />
            </Col>
            <Col lg={12}>
              <TimePickerFormat
                disabled={!editModal}
                label={"End Time"}
                open={openTime.end}
                setOpen={() => setOpenTime({ end: !openTime.end, start: false })}
                setValue={(val: string) => setEndTime(val)}
                optionalTime={editData && dayjs(editData?.endTime)}
              />
            </Col>
          </Row>
          {editModal && (
            <Row className="mb-[30px]">
              <Button htmlType="submit" className="w-full add-task-button" label="Save Changes" />
            </Row>
          )}
        </Form>
      )}
      <div className="task-categories">
        <p className="font-medium text-xl task-heading mb-[20px]">Categories</p>

        {Object.keys(categoriesList)
          .slice(0, loadMore)
          .map((category: any, i) => (
            <div key={i} className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center  gap-3 capitalize mb-[20px]">
                {category?.toLowerCase().includes("design") ? (
                  <TagPrimaryIcon />
                ) : category?.toLowerCase().includes("development") ? (
                  <TagSuccessIcon />
                ) : (
                  <TagWarningIcon />
                )}
                <p className="task-category-title">{category}</p>
              </div>
              <p className="text-xs task-category-hours">{categoriesList[category]}</p>
            </div>
          ))}
        <div className="text-center">
          <Button
            onClick={handleLoadMore}
            label="Load More"
            className="load-more text-input-bg-color light-grey-color my-[20px]"
          />
          <TimesheetCategories
            totalTime={totalTime}
            categoriesData={graphData}
            legend={""}
            color={["#5D89F4", "#E76864", "#FFC200"]}
            height={250}
            width={250}
          />
        </div>
      </div>
    </BoxWrapper>
  );
};

export default TaskDetails;
