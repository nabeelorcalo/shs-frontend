import { Col, Row, Typography } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { BoxWrapper } from "../../../components";
import {
  AllGrievances,
  Clock24h,
  ClockGrievances,
  GrievancesArrowForward,
  GrievancesAvater,
  GrievancesDisLike,
  GrievancesLike,
  InProgressGrievances,
  LineGrievances,
  NewGrievances,
  ResolevedGrievances,
} from "../../../assets/images";
import { Button, PageHeader, RegisterMemberAndFeddbackGraph } from "../../../components";
import { GrievanceStats } from "../../../components/ChartsOfGraphs/grievanceStats/grievanceStats";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import "./style.scss";

const { Text } = Typography;
const Grievance = (props: any) => {
  const { dashbaordData, responseTime, feedbackChart, resolutionFeedBack, grievanceList, statsChart } = props;
  const navigate = useNavigate();
  const statusMapping: any = {
    ALL: <AllGrievances />,
    NEW: <NewGrievances />,
    OPEN: <InProgressGrievances />,
    REOPEN: <InProgressGrievances />,
    RESOLVED: <ResolevedGrievances />,
  };
  const overview = dashbaordData
    .filter((item: any) => item.status !== "INPROGRESS") // Filter out the "INPROGRESS" status
    .map((item: any) => ({
      name:
        item?.status === "OPEN" || item?.status === "REOPEN"
          ? "Re-Open Grievances"
          : item.status.charAt(0) + item.status.slice(1).toLowerCase() + " Grievances",
      count: item.count.toString(),
      icon: statusMapping[item.status],
    }));

  const handleChange = () => {};
  return (
    <div className="grievances">
      <div>
        <PageHeader actions bordered title="Grievances">
          <div className="flex items-center justify-end header-btn">
            <Button className="button font-semibold px-8" onClick={() => navigate(`${ROUTES_CONSTANTS.ALL_GRIEVANCES}`)} label="All Grievances" />
          </div>
        </PageHeader>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={12} xxl={6}>
              <BoxWrapper className="grievances-box-wrapper w-full h-[150px]">
                <div className="flex row gap-2 ">
                  <div>{data.icon}</div>
                  <div className="flex my-5 mx-3 flex-col ">
                    <Text className="text-xl font-semibold text-primary-color">{data.name}</Text>
                    <Text className="text-[38px] font-medium text-secondary-color">{data.count}</Text>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          );
        })}
      </Row>
      <Row gutter={[20, 20]} className="mt-5">
        <Col className="gutter-row flex " xs={24} md={24} xl={12}>
          <BoxWrapper className="grievances-box-wrapper w-full min-h-[106px] ">
            <div className="flex xs:flex-col sm:flex-row justify-between gap-2 ">
              <div className="flex flex-row w-full">
                <div className="flex flex-row">
                  <span className="flex justify-center items-center">
                    <Clock24h />
                  </span>
                  <div className="flex flex-col m-auto">
                    <Text className="text-base font-normal mx-2 primary-color">Avg Resolution Time</Text>
                    <Text className="text-2xl font-semibold mx-2 teriary-color">
                      {responseTime?.avgResolutionTime?.HH || 0}:{responseTime?.avgResolutionTime?.MM || 0}
                      <span className="text-base">hrs</span>
                    </Text>
                  </div>
                </div>
              </div>
              <div className="flex flex-row  w-full ">
                <div className="xs:mr-0 xs:hidden sm:block sm:mr-5">
                  <LineGrievances />
                </div>
                <div className="flex flex-row">
                  <span className="flex justify-center items-center">
                    <ClockGrievances />
                  </span>
                  <div className="flex flex-col  m-auto">
                    <Text className="text-base font-normal mx-2 primary-color">Avg Response Time</Text>
                    <Text className="text-2xl font-semibold mx-2 teriary-color">
                      {responseTime?.avgResponseTime?.HH || 0}:{responseTime?.avgResponseTime?.MM || 0}
                      <span className="text-base">hrs</span>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} xl={12}>
          {grievanceList?.data &&
            grievanceList?.data?.slice(0, 1).map((grieved: any) => (
              <div
                className="card-share-wrapper"
                onClick={() => navigate(ROUTES_CONSTANTS.GRIEVANCES_DETAILS, { state: { grievanceId: grieved.id } })}
              >
                <div className="card-share">
                  <div>
                    <NavLink
                      to={ROUTES_CONSTANTS.GRIEVANCES_DETAILS}
                      state={{ grievanceId: grieved.id }}
                      className="white-color cursor-pointer border-0"
                    >
                      View <GrievancesArrowForward />
                    </NavLink>
                  </div>
                </div>
                <div className="top-card card-user-welcome">
                  <Row gutter={15}>
                    <Col xs={24} lg={12}>
                      <div className="top-card-inner">
                        <div className="flex-col sm:flex  w-full">
                          <div className="flex flex-col md:flex-row ">
                            <GrievancesAvater />
                            <div className="flex flex-col md:mx-2 ">
                              <Text className="text-sm font-normal text-primary-color ">
                                {grieved?.creator?.firstName + " " + grieved?.creator?.lastName}
                              </Text>
                              <Text className="text-sm font-normal text-secondary-color">{grieved?.creator?.role}</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} lg={12}>
                      <div className="top-card-inner ref-number">
                        <div className="user-reference-no flex flex-col sm:flex-row">
                          <span>Grievances Type:</span>
                          <span className="discipline capitalize">{grieved?.type?.toLowerCase()}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-5">
        <Col xs={24} md={24} lg={12}>
          <BoxWrapper>
            <div className="flex justify-between">
              <Text className="text-xl font-medium w-full">Resolution Feedback </Text>
              <div className="flex justify-end gap-5 w-full">
                <div>
                  {" "}
                  <GrievancesLike />
                  <span className="text-sm teriary-color "> {resolutionFeedBack?.satisfiedPercentage}% Positive</span>
                </div>
                <div>
                  <GrievancesDisLike />
                  <span className="text-sm secondary-color"> {resolutionFeedBack?.unsatisfiedPercentage}% Negative</span>
                </div>
              </div>
            </div>
            <RegisterMemberAndFeddbackGraph graphName="feedback" graphData={feedbackChart} />
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <BoxWrapper className="px-5">
            <div className="rievance Stats">
              <div className="flex justify-between">
                <Text className="text-xl font-medium">Grievance Stats</Text>
              </div>
              <GrievanceStats
                color={["#9BD5E8", "#F08D97", "#78DAAC", "#FFC15D"]}
                groupField="month"
                isGroup
                isStack
                legend={{
                  layout: "horizontal",
                  position: "top-right",
                }}
                seriesField="name"
                statsHeading=""
                xField="date"
                yField="value"
                data={statsChart}
              />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default Grievance;
