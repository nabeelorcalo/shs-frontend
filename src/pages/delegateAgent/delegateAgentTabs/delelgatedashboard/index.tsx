import React, { useEffect, useMemo, useState } from "react";
import { InfoCircleFilled } from "@ant-design/icons";
import { Col, Row, Tooltip, Typography } from "antd";
import { BoxWrapper } from "../../../../components";
import { RegisterAgentsAndRewardGraph } from "../../../../components";
import constants from "../../../../config/constants";
import { cardDelegate } from "./dalegateMock";
import { useRecoilState } from "recoil";
import { getDelegateAdminState } from "../../../../store/delegate";
import useCustomHook from "../../actionHandler";

const Dashboard = () => {
  const action = useCustomHook();
  const delegateAdmin = useRecoilState<any>(getDelegateAdminState);
  const totalMembersData = delegateAdmin[0].totalMembersData;
  const rewardsData = delegateAdmin[0].rewardData;

  const getTooltipLabel = (label: string) => {
    let newLabel = "";
    switch (label) {
      case "Total Universities":
        newLabel = totalMembersData?.totalUniversities;
        break;

      case "Total Companies":
        newLabel = totalMembersData?.totalCompanies;
        break;

      case "Total Interns":
        newLabel = totalMembersData?.totalInterns;
        break;

      case "Total Students":
        newLabel = totalMembersData?.totalStudents;
        break;

      case "Delegate Agents":
        newLabel = totalMembersData?.totalDelegates;
        break;
    }
    return newLabel;
  };

  const getTooltipInApp = (title1: string) => {
    let newAgent = "";
    switch (title1) {
      case "Agent1":
        newAgent = totalMembersData?.totalInAppUniversities;
        break;

      case "Agent2":
        newAgent = totalMembersData?.totalInAppCompanies;
        break;

      case "Agent3":
        newAgent = totalMembersData?.totalInAppInterns;
        break;

      case "Agent4":
        newAgent = totalMembersData?.totalInAppStudents;
        break;
    }
    return newAgent;
  };

  const getTooltipRewards = (title: string) => {
    let totalRewards = "";
    switch (title) {
      case "rewards5":
        totalRewards = (`£ ${rewardsData?.totalDelegateRewards}`);
        break;

      case "rewards2":
        totalRewards = (`£ ${rewardsData?.totalCompanyRewards}`);
        break;

      case "rewards4":
        totalRewards = (`£ ${rewardsData?.totalStudentRewards}`);
        break;

      case "rewards3":
        totalRewards = (`£ ${rewardsData?.totalInternRewards}`);
        break;

      case "rewards1":
        totalRewards = (`£ ${rewardsData?.totalUniversityRewards}`);
        break;
    }
    return totalRewards;
  };

  useEffect(() => {
    action.getDelegateAdmin();
  }, []);

  return (
    <div className="dashbaord-delegate">
      <Row gutter={[10, 10]}>
        {cardDelegate?.map((item, index) => {
          return (
            <>
              <Col xxl={6} xl={12} lg={12} md={12} sm={12} xs={24}>
                <div
                  className={item.id === "4" ? "four-card-main" : "card-main"}
                >
                  <div className="flex justify-end mr-2 mt-1 ">
                    {item.toolTip && (
                      <Tooltip
                        placement="bottom"
                        color="#363565"
                        title={
                          <div className="p-3">
                            <Row gutter={[15, 15]} className="pt-1 pb-2">
                              {item.toolTipData?.map((toolData: any) => {
                                return (
                                  <>
                                    <Col xxl={12} xl={12} lg={12} md={12} xs={12}>
                                      <Typography className="white-color font-normal text-xs">
                                        {toolData.label1 ? toolData.label1 : toolData.label}
                                      </Typography>
                                      <Typography className="white-color font-normal text-xs">
                                        {getTooltipLabel(toolData?.label)}
                                        {getTooltipInApp(toolData?.title1)}
                                        {getTooltipRewards(toolData?.title)}
                                      </Typography>
                                    </Col>
                                  </>
                                );
                              })}
                            </Row>
                          </div>
                        }
                      >
                        <InfoCircleFilled className="text-lg text-info-color cursor-pointer relative" />
                      </Tooltip>
                    )}
                  </div>
                  <div className="flex p-2">
                    <div
                      className="flex justify-center items-center h-[60px] w-[60px]"
                      style={{ background: `${item.bgColor}` }}
                    >
                      <div className="img-bg">
                        <img src={item.img} alt="" />
                      </div>
                    </div>
                    <div className="ml-5">
                      <Typography className="card-title">
                        {item.cardTitle}
                      </Typography>
                      <Typography className="card-number">
                        {item?.cardTitle === "Total Agents" &&
                          totalMembersData?.totalAgents}
                        {item?.cardTitle === "In-app Agents" &&
                          totalMembersData?.totalInAppAgents}
                        {item?.cardTitle === "Distributed Rewards" &&
                          rewardsData?.totalRewards}
                        {item?.cardTitle === "Standalone Agents" &&
                          totalMembersData?.standAloneAgents}
                      </Typography>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          );
        })}
      </Row>
      <Row gutter={[10, 10]} className="mt-2">
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          {/* total agents */}
          <BoxWrapper>
            <Typography className="text-secondary-color text-xl font-medium pb-3">
              Registered Agents
            </Typography>
            <RegisterAgentsAndRewardGraph
              graphName={constants.REGISTER_AGENTS}
            />
          </BoxWrapper>
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          {/* reward */}
          <BoxWrapper>
            <Typography className="text-secondary-color text-xl font-medium pb-3">
              Reward
            </Typography>
            <RegisterAgentsAndRewardGraph
              graphName={constants.REWARDS}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
