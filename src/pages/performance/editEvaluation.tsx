import { useState } from "react";
import { Col, Row, Typography, Form } from "antd";
import { ROUTES_CONSTANTS } from "../../config/constants";
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
import {
  Sad,
  SadColorLessEmoji,
  Neutral,
  NeutralColorLessEmoji,
  Happy,
  HappyColorLessIcon,
  Awesome,
  SatisfiedColorLessIcon,
  DownloadIconWithBg,
  Success,
} from '../../assets/images';
import EmojiMoodRating from "../../components/EmojiMoodRating";
import { header, tableData } from "./CompanyAdmin/pdfData";
import useCustomHook from "./actionHandler";
import { evaluationState } from "../../store";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

const ViewPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const action = useCustomHook();
  const evaluation = useRecoilValue(evaluationState);
  const editEvaluationBreadCrumb = [
    { name: "Evaluation Form " },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    { name: 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` }
  ];

  const user = {
    name: 'Calvin Grayson',
    profession: 'Manager',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    learningObjectives: '74',
    discipline: '61',
    personal: '92',
  };

  const detailedCards = [
    { id: 0, title: 'Learning Objectives', progressColor: '#9BD5E8' },
    { id: 1, title: 'Discipline', progressColor: '#E96F7C' },
    { id: 2, title: 'Personal', progressColor: '#6AAD8E' },
  ];

  const emojiData = [
    {
      name: "Unsatisfactory",
      comp: Sad,
      colorLessComp: SadColorLessEmoji,
    },
    {
      name: "Still Learning",
      comp: Neutral,
      colorLessComp: NeutralColorLessEmoji
    },
    {
      name: "Meeting Expectations",
      comp: Happy,
      colorLessComp: HappyColorLessIcon
    },
    {
      name: "Exceeding Expectations",
      comp: Awesome,
      colorLessComp: SatisfiedColorLessIcon
    },
  ];

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
            June 16, 2019
          </span>
        </p>

        <IconButton
          size='large'
          className='icon-btn'
          onClick={() => {
            action.downloadPdf(header, tableData);
            Notifications({ title: "Success", description: "Download Done", type: 'success' })
          }}
          icon={<DownloadIconWithBg />}
        />
      </div>
      <div className="innerContent">
        <Row gutter={[20, 10]}>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationCard
              name={evaluation.evaluatedBy.name}
              avatar={evaluation.evaluatedBy.avatar}
              profession={evaluation.evaluatedBy.role}
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationStatsCard
              name={"Learning Objectives"}
              percentage={evaluation.learningObjectives.percentage}
              color={'#9BD5E8'}
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationStatsCard
              name={"Discipline"}
              percentage={evaluation.discipline.percentage}
              color={'#E96F7C'}
            />
          </Col>
          <Col xs={24} md={12} xxl={6}>
            <EvaluationStatsCard
              name={"Personal"}
              percentage={evaluation.personal.percentage}
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
          {evaluation.learningObjectives.questions.map((question: any, index) =>
            <Col xs={24} xl={12} xxl={8} key={index}>
              <EvaluationRating
                title={question.title}
                value={question.value}
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
          {evaluation.discipline.questions.map((question: any, index) =>
            <Col xs={24} xl={12} xxl={8} key={index}>
              <EvaluationRating
                title={question.title}
                value={question.value}
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
          {evaluation.personal.questions.map((question: any, index) =>
            <Col xs={24} xl={12} xxl={8} key={index}>
              <EvaluationRating
                title={question.title}
                value={question.value}
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
            defaultValue='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book'
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