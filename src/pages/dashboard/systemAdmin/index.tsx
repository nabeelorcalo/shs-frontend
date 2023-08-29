import { Row, Col } from "antd";
import {
  UserAnalytics,
  DashboardCharts,
  RegionCard,
  FunnelChart,
  GaugePlot,
  GrowthAnalyticsGraph,
  UKMapChart,
} from "../../../components";
import RecentIssuesTable from "./RecentIssuesTable";
import "../style.scss";
import ActivityLogTable from "./ActivityLogTable";
import { useEffect, useRef, useState } from "react";
import { gutter } from "..";
import useCustomHook from "./actionHandler";

const SystemAdmin = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [isOpenRangePicker, setIsOpenRangePicker] = useState(false);
  const [rangeFilter, setRangeFilter] = useState<string[]>([]);
  const {
    totalMembersData: {
      totalUsers,
      totalActiveUsers: active_users,
      totalUniversities: universities,
      totalCompanies: companies,
      totalDelegates: delegate_agents,
      totalInterns: interns,
      totalPropertyAgents: property_agents,
      intenrshipVacancies: internship_vacancies,
      totalStudents: students,
    },
    issueData: {
      totalIssues: issue_count,
      resolvedIssues: issues_resolved,
      pendingIssues: issues_pending,
      issues,
      guageData,
    },
    growthAnalyticsData,
    regionAnalytics,
    adminActivity,
    filterGraphData,
    fetchAdminDahsboardData,
    fetchRoleBaseUsers,
  } = useCustomHook();

  const changeDateRange = (_: any, val: string[]) => {
    setRangeFilter(val);
    filterGraphData(val);
  };

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      fetchAdminDahsboardData();
      fetchRoleBaseUsers();
    }
  }, []);
  return (
    <Row gutter={gutter}>
      <Col xs={24} xxl={12}>
        <UserAnalytics
          title="Total User"
          count={totalUsers}
          data={{
            interns,
            students,
            universities,
            companies,
            delegate_agents,
            property_agents,
          }}
        />
      </Col>
      <Col xs={24} xxl={12}>
        <UserAnalytics
          title="Analytics"
          data={{
            active_users,
            internship_vacancies,
            issue_count,
            issues_resolved,
            issues_pending,
          }}
        />
      </Col>
      <Col xs={24} xxl={14}>
        <GrowthAnalyticsGraph
          graphName={"Growth Analytics"}
          styling={{ height: 437 }}
          isOpenRangePicker={isOpenRangePicker}
          setIsOpenRangePicker={setIsOpenRangePicker}
          onDateChange={changeDateRange}
          graphData={growthAnalyticsData}
        />
      </Col>
      <Col xs={24} xxl={10}>
        <div className="bg-white rounded-2xl p-5 wrapper-shadow">
          <Row gutter={gutter}>
            <Col xs={24} xl={12}>
              <RegionCard regionData={regionAnalytics} />
            </Col>
            <Col xs={24} xl={12}>
              <UKMapChart />
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={24} xxl={14}>
        <Row gutter={gutter}>
          <Col xs={24}>
            <DashboardCharts
              barColor="#363565"
              bgColor="#ABAFB1"
              freeSpace="GB Free"
              heading={<span className="text-xl font-medium">System Storage</span>}
              height={65}
              memoryFree="55.5"
              memoryUsed="45.5"
              percent={0.3}
              usedSpace="GB Used"
            />
          </Col>
          <Col xs={24} xl={12} xxl={14}>
            <ActivityLogTable adminActivity={adminActivity} />
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
          <Col xs={24} xl={12} xxl={24}>
            <GaugePlot style={{ height: 234 }} total={issue_count} dataArray={guageData} />
          </Col>
          <Col xs={24} xl={12} xxl={24}>
            <RecentIssuesTable issues={issues} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default SystemAdmin;
 