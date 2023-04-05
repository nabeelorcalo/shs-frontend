import { useState } from "react";
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";
import {
  PageHeader,
  IconButton,
  EvaluationCard,
  EvaluationStatsCard,
  TextArea,
  Button,
  Breadcrumb,
  Notifications
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

const ViewPerformance = () => {
  const action = useCustomHook();
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

  const [state, setState] = useState({
    data: [
      {
        id: 1,
        name: "Learning Objectives",
        values: [
          { title: "Works to full potential", value: 1 },
          { title: "Quality of work", value: 2 },
          { title: "Work Consistency", value: 3 },
          { title: "Independency in work", value: 4 },
          { title: "Business skills", value: 2 },
          { title: "Technical skills", value: 3 },
        ]
      },
      {
        id: 2,
        name: "Discipline",
        values: [
          { title: "Punctuality", value: 4 },
          { title: "Attendance", value: 3 },
          { title: "Coworker relationship", value: 2 },
          { title: "Team work", value: 1 }
        ]
      },
      {
        id: 3,
        name: "Personal",
        values: [
          { title: "Creativity", value: 1 },
          { title: "Honesty", value: 2 },
          { title: "Integrity", value: 4 },
          { title: "Communication skills", value: 1 },
          { title: "Task Initiatives", value: 3 }
        ]
      },
    ]
  });

  const downloadClick = () => {
    alert('download popup');
  }

  const onSaveClick = () => {
    alert("Save");
  }

  const onCancelClick = () => {
    alert("Cancel");
  }
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
          <span className="mx-2 font-medium text-secondary-color">
            June 16, 2019
          </span>
        </p>

        <IconButton
          size='large'
          className='icon-btn'
          onClick={() => {
            action.downloadPdf(header, tableData);
            Notifications({title:"Success", description:"Download Done",type:'success'})
          }}
          icon={<DownloadIconWithBg />}
        />
      </div>
      <Row gutter={[20, 10]}>
        <Col xs={24} md={12} xxl={6}>
          <EvaluationCard
            name={user.name}
            avatar={user.avatar}
            profession={user.profession}
          />
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <EvaluationStatsCard
            name='Learning Objectives'
            percentage={user.learningObjectives}
            color='#9BD5E8'
          />
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <EvaluationStatsCard
            name='Discipline'
            percentage={user.discipline}
            color='#E96F7C'
          />
        </Col>
        <Col xs={24} md={12} xxl={6}>
          <EvaluationStatsCard
            name='Personal'
            percentage={user.personal}
            color='#6AAD8E'
          />
        </Col>
      </Row>
      {
        state.data.map((obj: any) => {
          return (
            <Row gutter={[20,10]}>
              <Col xs={24}>
                <div key={obj.name} className="mt-6 mb-2">
                  <Typography.Title level={3} className="evaluation-heading">
                    {obj.name}
                  </Typography.Title>
                </div>
              </Col>
              {obj.values.map((child: any, index: number) =>
                <Col xs={24} xl={12} xxl={8}>
                  <div key={child.title}>
                    <EmojiMoodRating
                      size={5}
                      data={emojiData}
                      title={child.title}
                      activeIconIndex={child.value}
                    />
                  </div>
                </Col>
              )}
            </Row>
          )
        })
      }
      <div className="my-4">
        <Typography.Title level={3} className="evaluation-heading">
          Comments
        </Typography.Title>

        <TextArea
          disabled
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
  )
}

export default ViewPerformance;