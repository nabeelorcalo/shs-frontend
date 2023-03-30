import React, { useState, useEffect } from 'react';
import constants from '../../config/constants';
import { AttendanceAndListingGraph } from './graphForAttendanceAndListings';
import { GrowthAnalyticsGraph } from './graphForGrowthAnalytics';
import {LifeAssessmentGraph} from './graphForLifeAssessmentAndLifeBalance/lifeAssessment';
import {LifeBalanceGraph} from './graphForLifeAssessmentAndLifeBalance/lifeBalance';
import { RegisterAgentsAndRewardGraph } from './graphForRegisterAgentsAndRewards';
import {RegisterMemberAndFeddbackGraph} from './graphForRegisteredMembersAndFeedback';
import {BoxWrapper} from '../../components/BoxWrapper/BoxWrapper';

const Graph = (props: any) => {
  return (
    <div className='p-4'>

      <BoxWrapper >
        <LifeBalanceGraph monthName="Jan" />
      </BoxWrapper>

      <BoxWrapper >
        <LifeAssessmentGraph monthName="Jan" />
      </BoxWrapper>

      <BoxWrapper >
        {/* <GrowthAnalyticsGraph /> */}
      </BoxWrapper>

      {/* Register Member Graph */}
      <BoxWrapper >
        <RegisterMemberAndFeddbackGraph graphName={constants.REGISTER_MEMBERS} />
      </BoxWrapper>

      {/* Feedback Graph */}
      <BoxWrapper >
        <RegisterMemberAndFeddbackGraph graphName={constants.FEEDBACk} />
      </BoxWrapper>

      {/* Attendance Graph */}
      <BoxWrapper >
        <AttendanceAndListingGraph title="Graph Name" level={3} graphName={constants.ATTENDANCE} />
      </BoxWrapper>

      {/* Listings Graph */}
      <BoxWrapper >
        <AttendanceAndListingGraph title="Graph Name" level={3} graphName={constants.LISTINGS} />
      </BoxWrapper>

      {/* Register Agents Graph */}
      <BoxWrapper >
        <RegisterAgentsAndRewardGraph graphName={constants.REGISTER_AGENTS} />
      </BoxWrapper>

      {/* Rewards Graph */}
      <BoxWrapper >
        <RegisterAgentsAndRewardGraph graphName={constants.REWARDS} />
      </BoxWrapper>
    </div>
  );
};

export default Graph;