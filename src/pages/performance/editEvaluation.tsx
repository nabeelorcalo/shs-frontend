import { useState, useEffect } from "react";
import { Col, Row, Typography, Form } from "antd";
import { useParams } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../config/constants";
import dayjs from 'dayjs';
import "./style.scss";
import {
  PageHeader,
  IconButton,
  EvaluationCard,
  EvaluationStatsCard,
  TextArea,
  Button,
  Breadcrumb,
  Notifications,
  EvaluationRating
} from "../../components";
import { DownloadIconWithBg } from '../../assets/images';
import { header, tableData } from "./CompanyAdmin/pdfData";
import usePerformanceHook from "./actionHandler";
import { evaluationState, performanceDetailState } from "../../store";
import { useRecoilValue } from "recoil";
import type { RadioChangeEvent } from 'antd';

const ViewPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {evalId} = useParams();
  const [form] = Form.useForm();
  const {getPerformanceDetail, downloadPdf } = usePerformanceHook();
  const evaluation = useRecoilValue(evaluationState);
  const performanceDetail:any = useRecoilValue(performanceDetailState);
  const [loadingPerfDetail, setLoadingPerfDetail] = useState(false);
  const [evaluationValues, setEvaluationValues] = useState({})
  const editEvaluationBreadCrumb = [
    { name: "Evaluation Form " },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    { name: 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` }
  ];

console.log("performanceDetail:: ", performanceDetail)
  const data = [
    // {
    //   id: 0,
    //   name: "Learning Objectives",
    //   values: [
    //     { id: 0, title: "Works to full potential", value: 0 },
    //     { id: 1, title: "Quality of work", value: 1 },
    //     { id: 2, title: "Work Consistency", value: 2 },
    //     { id: 3, title: "Independency in work", value: 3 },
    //     { id: 4, title: "Business skills", value: 4 },
    //     { id: 5, title: "Technical skills", value: 5 },
    //   ]
    // },
    {
      id: 1,
      name: "Discipline",
      values: [
        { id: 6, title: "Punctuality", value: 1 },
        { id: 7, title: "Attendance", value: 3 },
        { id: 8, title: "Coworker relationship", value: 2 },
        { id: 9, title: "Team work", value: 0 }
      ]
    },
    // {
    //   id: 2,
    //   name: "Personal",
    //   values: [
    //     { id: 10, title: "Creativity", value: 1 },
    //     { id: 11, title: "Honesty", value: 2 },
    //     { id: 12, title: "Integrity", value: 4 },
    //     { id: 13, title: "Communication skills", value: 1 },
    //     { id: 14, title: "Task Initiatives", value: 3 }
    //   ]
    // },
  ]

  const [state, setState] = useState({
    data: data,
  });

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getPerformanceDetail(setLoadingPerfDetail, evalId)
  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const emojiClick = (e: any) => {
    const newData = [...data];
    const classList = e.currentTarget.classList;
    let lastClassName = classList[classList.length - 1];
    let [cardIndex, performanceId, val] = lastClassName.split("_");

    const performanceIndex = newData[cardIndex].values.findIndex(item =>
      item.id === parseInt(performanceId)
    );

    const updatedValueItem = {
      ...newData[cardIndex].values[performanceIndex],
      value: val,
    };

    newData[cardIndex].values[performanceIndex] = updatedValueItem;

    console.log(JSON.stringify(newData, null, 4));

    // setState({data: newData});
  }

  const onSaveClick = () => {
    alert("Save");
  }

  const onCancelClick = () => {
    alert("Cancel");
  }

  const onFinish = (values:any) => {
    console.log('Values::: ', values)
  }

  const avatarPlaceholder = (name:any) => name?.split(' ').map((word:any) => word.charAt(0))

  const handleRadioChange = (event: RadioChangeEvent) => {
    const { name, value }:any = event.target
    setEvaluationValues({
      ...evaluationValues,
      [name]: value
    })
  };

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="view-evaluation">
      <PageHeader
        bordered
        title={
          <Breadcrumb breadCrumbData={editEvaluationBreadCrumb} />
        }
      />

      <div className="flex flex-row items-center">
        <p className="evaluation-txt text-teriary-color">
          Evaluation Date:
          <span className="mx-2 font-semibold text-secondary-color">
            {dayjs(performanceDetail?.updatedAt).format('MMMM D, YYYY')}
          </span>
        </p>

        <IconButton
          size='large'
          className='icon-btn'
          onClick={() => {
            downloadPdf(header, tableData);
            Notifications({ title: "Success", description: "Download Done", type: 'success' })
          }}
          icon={<DownloadIconWithBg />}
        />
      </div>
      <div className="innerContent">
        <Row gutter={[20, 10]}>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationCard
              name={performanceDetail?.ratedByUserName}
              avatar={performanceDetail?.evaluatedByAvatar}
              avatarPlaceholder={avatarPlaceholder(performanceDetail?.ratedByUserName)}
              profession={performanceDetail?.ratedByUserRole}
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationStatsCard
              name={"Learning Objectives"}
              percentage={performanceDetail?.learningObjectiveRating}
              color={'#9BD5E8'}
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationStatsCard
              name={"Discipline"}
              percentage={performanceDetail?.disciplineRating}
              color={'#E96F7C'}
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationStatsCard
              name={"Personal"}
              percentage={performanceDetail?.personalRating}
              color={'#6AAD8E'}
            />
          </Col>
        </Row>
        <Row gutter={[20, 10]}>
          <Col xs={24}>
            <div className="mt-6 mb-2">
              <Typography.Title level={3} className="evaluation-heading">
                Learning Objectives
              </Typography.Title>
            </div>
          </Col>
          {performanceDetail?.LEARNING_OBJECTIVE.map((question: any, index:any) =>
            <Col xs={24} xl={12} xxl={8} key={index}>
              <EvaluationRating
                name={`learningObj${index}`}
                title={question.title}
                value={question.rating}
                onChange={handleRadioChange}
              />
            </Col>
          )}
        </Row>

        <Row gutter={[20, 10]}>
          <Col xs={24}>
            <div className="mt-6 mb-2">
              <Typography.Title level={3} className="evaluation-heading">
                Discipline
              </Typography.Title>
            </div>
          </Col>
          {performanceDetail?.DISCIPLINE.map((question: any, index:any) =>
            <Col xs={24} xl={12} xxl={8} key={index}>
              <EvaluationRating
                name={`discipline${index}`}
                title={question.title}
                value={question.rating}
                onChange={handleRadioChange}
              />
            </Col>
          )}
        </Row>

        <Row gutter={[20, 10]}>
          <Col xs={24}>
            <div className="mt-6 mb-2">
              <Typography.Title level={3} className="evaluation-heading">
                Personal
              </Typography.Title>
            </div>
          </Col>
          {performanceDetail?.PERSONAL.map((question: any, index:any) =>
            <Col xs={24} xl={12} xxl={8} key={index}>
              <EvaluationRating
                name={`personal${index}`}
                title={question.title}
                value={question.rating}
                onChange={handleRadioChange}
              />
            </Col>
          )}
        </Row>
        <div className="my-4">
          <Typography.Title level={3} className="evaluation-heading">
            Comments
          </Typography.Title>

          <TextArea
            rows={6}
            classNme='light-blue-bg-color text-primary-color'
            placeholder="placeholder"
            defaultValue={performanceDetail.comment}
          />
        </div>

        <div className="flex justify-end gap-4 my-4">
          <Button
            label="Cancel"
            type="default"
            onClick={onCancelClick}
            className="border-visible-btn"
          />

          <Button
            label="Save"
            onClick={onSaveClick}
            className="bg-visible-btn"
          />
        </div>
        
      </div>
    </div>
  )
}

export default ViewPerformance;