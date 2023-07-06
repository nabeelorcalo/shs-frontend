import { useEffect, useState } from "react";
import { Col, Row, Typography, Spin, Form } from "antd";
import { useParams, useSearchParams } from "react-router-dom";
import dayjs from 'dayjs';
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import "./style.scss";
import { useRecoilValue } from "recoil";
import { header, tableData } from "./CompanyAdmin/pdfData";
import usePerformanceHook from "./actionHandler"
import { currentUserRoleState } from "../../store";
import getUserRoleLable from "../../helpers/roleLabel";
import { LoadingOutlined } from "@ant-design/icons";
import "./style.scss";
import {
  PageHeader,
  IconButton,
  EvaluationCard,
  EvaluationStatsCard,
  Breadcrumb,
  Notifications,
  EvaluationRating
} from "../../components";
import {
  DownloadIconWithBg,
} from '../../assets/images';


const ViewPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {evalId} = useParams();
  const [searchParams] = useSearchParams();
  const performanceRatingId = searchParams.get('performanceRatingId')
  const [formEvaluation] = Form.useForm();
  const {getPerformanceDetail, performanceDetail, downloadPdf } = usePerformanceHook()
  const role = useRecoilValue(currentUserRoleState);
  const [loadingPerfDetail, setLoadingPerfDetail] = useState(false);
  const ViewPerformanceBreadCrumb = [
    { name: "Evaluation Form " },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    { name: role === constants.UNIVERSITY ? "View History" : (role === constants.INTERN || role === constants.MANAGER) ? '' : 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` },
    { name: (role === constants.UNIVERSITY || role === constants.MANAGER) && ` ${performanceDetail?.evaluatedUserName}`, onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${evalId}/${ROUTES_CONSTANTS.DETAIL}` },
  ];

  const performaceDetailParams = {
    performanceRatingId
  }

  console.log("searchParams::: ", searchParams)
  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getPerformanceDetail(setLoadingPerfDetail, evalId, performaceDetailParams);
  }, [])

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const avatarPlaceholder = (name:any) => name?.split(' ').map((word:any) => word.charAt(0))

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="view-evaluation">
      <PageHeader
        bordered
        title={
          <Breadcrumb breadCrumbData={ViewPerformanceBreadCrumb} />
        }
      />
      <Spin spinning={loadingPerfDetail} indicator={<LoadingOutlined />}>
        {performanceDetail &&
          <>
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
                    name={performanceDetail?.evaluatedUserName}
                    avatar={performanceDetail?.evaluatedByAvatar}
                    avatarPlaceholder={avatarPlaceholder(performanceDetail?.evaluatedUserName)}
                    profession={getUserRoleLable(performanceDetail?.evaluatedUserRole)}
                  />
                </Col>
                <Col xs={24} md={12} xxl={6}>
                  <EvaluationStatsCard
                    name={"Learning Objectives"}
                    percentage={Math.round(performanceDetail?.learningObjectiveRating)}
                    color={'#9BD5E8'}
                  />
                </Col>
                <Col xs={24} md={12} xxl={6}>
                  <EvaluationStatsCard
                    name={"Discipline"}
                    percentage={Math.round(performanceDetail?.disciplineRating)}
                    color={'#E96F7C'}
                  />
                </Col>
                <Col xs={24} md={12} xxl={6}>
                  <EvaluationStatsCard
                    name={"Personal"}
                    percentage={Math.round(performanceDetail?.personalRating)}
                    color={'#6AAD8E'}
                  />
                </Col>
              </Row>
              <Form
                form={formEvaluation}
                layout="vertical"
                name="historyDetail"
              >
                {/* Learning Objectives */}
                <Row gutter={[20, 10]}>
                  <Col xs={24}>
                    <div className="mt-6 mb-2">
                      <Typography.Title level={3} className="evaluation-heading">
                        Learning Objectives
                      </Typography.Title>
                    </div>
                  </Col>
                  {performanceDetail?.LEARNING_OBJECTIVE?.map((question:any, index:any) => {
                    return (<Col xs={24} xl={12} xxl={8} key={index}>
                      <Form.Item name={`learningObj${index}`} shouldUpdate>
                        <EvaluationRating
                          title={question.title}
                          rating={question.rating}
                          disabled={true}
                        />
                      </Form.Item>
                    </Col>)}
                  )}
                </Row>

                {/* Discipline */}
                <Row gutter={[20, 10]}>
                  <Col xs={24}>
                    <div className="mt-6 mb-2">
                      <Typography.Title level={3} className="evaluation-heading">
                        Discipline
                      </Typography.Title>
                    </div>
                  </Col>
                  {performanceDetail?.DISCIPLINE?.map((question: any, index:any) =>
                    <Col xs={24} xl={12} xxl={8} key={index}>
                      <Form.Item name={`discipline${index}`} shouldUpdate>
                        <EvaluationRating
                          title={question.title}
                          rating={question.rating}
                          disabled={true}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
                
                {/* Personal */}
                <Row gutter={[20, 10]}>
                  <Col xs={24}>
                    <div className="mt-6 mb-2">
                      <Typography.Title level={3} className="evaluation-heading">
                        Personal
                      </Typography.Title>
                    </div>
                  </Col>
                  {performanceDetail?.PERSONAL?.map((question: any, index:any) =>
                    <Col xs={24} xl={12} xxl={8} key={index}>
                      <Form.Item name={`personal${index}`} shouldUpdate>
                        <EvaluationRating
                          title={question.title}
                          rating={question.rating}
                          disabled={true}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </Form>
              <div className="my-4">
                <Typography.Title level={3} className="evaluation-heading">
                  Comments
                </Typography.Title>

                <div className="comment-area-box">
                  {performanceDetail.comment}
                </div>
              </div>
            </div>
          </>
        }
      </Spin>
    </div>
  )
}

export default ViewPerformance;