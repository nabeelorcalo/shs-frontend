import { Row, Col } from "antd";
import { AnalyticsData, regionData, TotalUserData } from "./mock";
import {
  UserAnalytics,
  DashboardCharts,
  RegionCard,
  FunnelChart,
  GaugePlot,
  GrowthAnalyticsGraph,
} from "../../../components";
import RecentIssuesTable from "./RecentIssuesTable";
import "../style.scss";
import ActivityLogTable from "./ActivityLogTable";
import { useState } from "react";
import { gutter } from "..";
import AreaMapp from "../../../components/Graph/AreaMap";

const SystemAdmin = () => {
  const [isOpenRangePicker, setIsOpenRangePicker] = useState(false)
  return (
    <Row gutter={gutter}>
      <Col xs={24} xxl={12}>
        <UserAnalytics title="Total User" count={567} data={TotalUserData} />
      </Col>
      <Col xs={24} xxl={12}>
        <UserAnalytics title="Analytics" data={AnalyticsData} />
      </Col>
      <Col xs={24} xxl={14}>
        <GrowthAnalyticsGraph
          graphName={"Growth Analytics"}
          styling={{ height: 437}}
          isOpenRangePicker={isOpenRangePicker}
          setIsOpenRangePicker={setIsOpenRangePicker}
        />
      </Col>
      <Col xs={24} xxl={10}>
        <Row className="bg-white rounded-2xl p-5 wrapper-shadow">
          <Col xs={24} xl={12}>
            <RegionCard regionData={regionData} />
          </Col>
          <Col xs={24} xl={12}>
            {/* <AreaMapp /> */}
          </Col>
        </Row>
      </Col>
      <Col xs={24} xxl={14}>
        <Row gutter={gutter}>
          <Col xs={24}>
            <DashboardCharts
              barColor="#363565"
              bgColor="#ABAFB1"
              freeSpace="GB Free"
              heading="System Storage"
              height={65}
              memoryFree="55.5"
              memoryUsed="45.5"
              percent={0.3}
              usedSpace="GB Used"
            />
          </Col>
          <Col xs={24} xl={12} xxl={14}>
            <ActivityLogTable />
          </Col>
          <Col xs={24} xl={12} xxl={10} className="">
            <div className="bg-white px-[25px] py-5 rounded-2xl wrapper-shadow">
              <FunnelChart />
            </div>
          </Col>
        </Row>
      </Col>
      <Col xs={24} xxl={10}>
        <Row gutter={gutter}>
          <Col xs={24} xl={12} xxl={24} >
            <GaugePlot style={{height:234}} />
          </Col>
          <Col xs={24} xl={12} xxl={24}>
            <RecentIssuesTable />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SystemAdmin;
