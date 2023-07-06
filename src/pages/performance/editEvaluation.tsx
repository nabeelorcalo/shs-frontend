import { useState, useEffect } from "react";
import { Col, Row, Typography, Form, Spin } from "antd";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../config/constants";
import getUserRoleLable from "../../helpers/roleLabel";
import { LoadingOutlined } from "@ant-design/icons";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";
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
import type { RadioChangeEvent } from 'antd';

const ViewPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const { state } = useLocation();
  
  const { evalId } = useParams();
  const [formEvaluation] = Form.useForm();
  const editEvaluationBreadCrumb = [
    { name: "Evaluation Form " },
    state !== 'fromInterns' && { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    state !== 'fromInterns' && { name: 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` }
  ];
  const {
    getPerformance,
    singlePerformance,
    getPerformanceDetail,
    performanceDetail,
    downloadPdf,
    postPerformanceEvaluation
  } = usePerformanceHook();
  const [loadingPerfDetail, setLoadingPerfDetail] = useState(false);
  const [loadingPer, setLoadingPer] = useState(false);
  const initEvalValues: any = {
    inEvaluationUserId: evalId,
    data: [],
    comment: ""
  }
  const [evaluationValues, setEvaluationValues]: any = useState(initEvalValues);
  const [loadingEvaluation, setLoadingEvaluation] = useState(false)


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getPerformanceDetail(setLoadingPerfDetail, evalId)
    getPerformance(setLoadingPer, { page: 1, limit: 40 })
  }, [])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const onCancelClick = () => {
    navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`)
  }

  const avatarPlaceholder = (name: any) => name?.split(' ').map((word: any) => word.charAt(0))

  const handleRadioChange = (event: any, performanceId: any, pType: any) => {
    const { value }: any = event.target;

    const updatedData = evaluationValues.data.map((item: any) => {
      if (item.performanceId === performanceId) {
        return { ...item, rating: value };
      }
      return item;
    });

    // Check if the object with the specified performanceId doesn't exist in the array
    if (!updatedData.some((item: any) => item.performanceId === performanceId)) {
      // Add a new object to the array
      updatedData.push({
        performanceId: performanceId,
        pType: pType,
        rating: value
      });
    }

    setEvaluationValues((prev: any) => ({
      ...prev,
      data: updatedData
    }));
  };

  const handleCommentChange = (event: any) => {
    setEvaluationValues((prev: any) => ({
      ...prev,
      comment: event.target.value
    }));
  }

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function submitEvaluation() {
    try {
      const values = await formEvaluation.validateFields();
    } catch (errorInfo) {
      return;
    }
    setLoadingEvaluation(true);
    const response = await postPerformanceEvaluation(evaluationValues);
    if (!response.error) {
      Notifications({ title: "Success", description: "Evaluation submitted successfully", type: 'success' });
      setLoadingEvaluation(false);
      navigate(-1);
    }
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="view-evaluation">
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={editEvaluationBreadCrumb} />} />
      <Spin spinning={loadingPerfDetail} indicator={<LoadingOutlined />}>
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
                profession={getUserRoleLable(performanceDetail?.ratedByUserRole)}
              />
            </Col>
            <Col xs={24} md={12} xxl={6}>
              <EvaluationStatsCard
                name={"Learning Objectives"}
                percentage={0}
                color={'#9BD5E8'}
              />
            </Col>
            <Col xs={24} md={12} xxl={6}>
              <EvaluationStatsCard
                name={"Discipline"}
                percentage={0}
                color={'#E96F7C'}
              />
            </Col>
            <Col xs={24} md={12} xxl={6}>
              <EvaluationStatsCard
                name={"Personal"}
                percentage={0}
                color={'#6AAD8E'}
              />
            </Col>
          </Row>
          {singlePerformance &&
            <Form
              form={formEvaluation}
              layout="vertical"
              name="evaluateForm"
              requiredMark={false}
              validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
            >
              {singlePerformance?.learningObjective?.length !== 0 &&
                <Row gutter={[20, 10]}>
                  <Col xs={24}>
                    <div className="mt-6 mb-2">
                      <Typography.Title level={3} className="evaluation-heading">
                        Learning Objectives
                      </Typography.Title>
                    </div>
                  </Col>
                  {singlePerformance?.learningObjective?.map((question: any, index: any) =>
                    <Col xs={24} xl={12} xxl={8} key={index}>
                      <Form.Item name={`learningObj${index}`} rules={[{ required: true }]}>
                        <EvaluationRating
                          title={question?.title}
                          onChange={(event: RadioChangeEvent) => handleRadioChange(event, question.id, question.pType)}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              }
              {singlePerformance?.discipline?.length !== 0 &&
                <Row gutter={[20, 10]}>
                  <Col xs={24}>
                    <div className="mt-6 mb-2">
                      <Typography.Title level={3} className="evaluation-heading">
                        Discipline
                      </Typography.Title>
                    </div>
                  </Col>
                  {singlePerformance?.discipline?.map((question: any, index: any) =>
                    <Col xs={24} xl={12} xxl={8} key={index}>
                      <Form.Item name={`discipline${index}`} rules={[{ required: true }]}>
                        <EvaluationRating
                          title={question.title}
                          onChange={(event: RadioChangeEvent) => handleRadioChange(event, question.id, question.pType)}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              }
              {singlePerformance?.personal?.length !== 0 &&
                <Row gutter={[20, 10]}>
                  <Col xs={24}>
                    <div className="mt-6 mb-2">
                      <Typography.Title level={3} className="evaluation-heading">
                        Personal
                      </Typography.Title>
                    </div>
                  </Col>
                  {singlePerformance?.personal?.map((question: any, index: any) =>
                    <Col xs={24} xl={12} xxl={8} key={index}>
                      <Form.Item name={`personal${index}`} rules={[{ required: true }]}>
                        <EvaluationRating
                          title={question.title}
                          onChange={(event: RadioChangeEvent) => handleRadioChange(event, question.id, question.pType)}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              }
              <div className="my-4">
                <Typography.Title level={3} className="evaluation-heading">
                  Comments
                </Typography.Title>
                <Form.Item name='comment' rules={[{ required: true }]}>
                  <TextArea
                    rows={6}
                    classNme='light-blue-bg-color text-primary-color'
                    placeholder="Type your comments here..."
                    onChange={handleCommentChange}
                  />
                </Form.Item>
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
                  onClick={submitEvaluation}
                  className="bg-visible-btn"
                  loading={loadingEvaluation}
                />
              </div>
            </Form>
          }
        </div>
      </Spin>
    </div>
  )
}

export default ViewPerformance;