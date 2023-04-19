import { Col, Row, Typography } from "antd";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";
import {
  PageHeader,
  IconButton,
  EvaluationCard,
  EvaluationStatsCard,
  TextArea,
  Breadcrumb,
  Notifications,
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
} from '../../assets/images';
import EmojiMoodRating from "../../components/EmojiMoodRating";
import { header, tableData } from "./CompanyAdmin/pdfData";
import useCustomHook from "./actionHandler";
import { currentUserRoleState } from "../../store"
import "./style.scss";
import { useRecoilValue } from "recoil";
import { useId } from "react";

const ViewPerformance = () => {
  const id = useId();
  const action = useCustomHook();
  const role = useRecoilValue(currentUserRoleState);

  const ViewPerformanceBreadCrumb = [
    { name: "Evaluation Form " },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    { name: role === constants.UNIVERSITY ? "View History" : (role === constants.INTERN || role === constants.MANAGER) ? '' : 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` },
    { name: (role === constants.UNIVERSITY || role === constants.MANAGER) && " Mino Marina", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.HISTORY}` },
  ];
  const user = {
    name: 'Calvin Grayson',
    profession: 'Manager',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    learningObjectives: '74',
    discipline: '61',
    personal: '92',
  };

  const data = [
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
    }
  ]

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
  const detailedCards = [
    { title: 'Learning Objectives', progressColor: '#9BD5E8' },
    { title: 'Descipline', progressColor: '#E96F7C' },
    { title: 'Personal', progressColor: '#6AAD8E' },
  ]
  return (
    <div className="view-evaluation">
      <PageHeader
        bordered
        title={
          <Breadcrumb breadCrumbData={ViewPerformanceBreadCrumb} />
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
            Notifications({ title: "Success", description: "Download Done", type: 'success' })
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
        {detailedCards.map((item: any) => (
          <Col xs={24} md={12} xxl={6} key={id}>
            <EvaluationStatsCard
              name={item.title}
              percentage={user.learningObjectives}
              color={item.progressColor}
            />
          </Col>
        ))}
      </Row>
      {
        data.map((obj: any) => {
          return (
            <Row gutter={[20, 10]} key={id}>
              <Col xs={24}>
                <div key={obj.name} className="mt-6 mb-2">
                  <Typography.Title level={3} className="evaluation-heading">
                    {obj.name}
                  </Typography.Title>
                </div>
              </Col>
              {obj.values.map((child: any) =>
                <Col xs={24} xl={12} xxl={8} key={id}>
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
    </div>
  )
}

export default ViewPerformance;