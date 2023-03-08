import React, { useState, useEffect } from 'react';
import GraphOne from './graphForRegisteredMembersAndFeedback';
import GraphTwo from './graphForAttendanceAndListings';
import GraphThree from './graphForRegisterAgentsAndRewards';
import GraphFour from './graphForGrowthAnalytics';
import GraphFive from './graphForLifeAssessment';
import constants from '../../config/constants';

import "./style.scss"
import BoxWrapper from '../BoxWrapper/boxWrapper';


const Graph = (props: any) => {
  return (
    <div className='p-4'>

      <BoxWrapper >
        <GraphFive monthName="Jan" />
      </BoxWrapper>

      <BoxWrapper >
        <GraphFour />
      </BoxWrapper>

      {/* Register Member Graph */}
      <BoxWrapper >
        <GraphOne graphName={constants.REGISTER_MEMBERS} />
      </BoxWrapper>

      {/* Feedback Graph */}
      <BoxWrapper >
        <GraphOne graphName={constants.FEEDBACk} />
      </BoxWrapper>

      {/* Attendance Graph */}
      <BoxWrapper >
        <GraphTwo graphName={constants.ATTENDANCE} />
      </BoxWrapper>

      {/* Listings Graph */}
      <BoxWrapper >
        <GraphTwo graphName={constants.LISTINGS} />
      </BoxWrapper>

      {/* Register Agents Graph */}
      <BoxWrapper >
        <GraphThree graphName={constants.REGISTER_AGENTS} />
      </BoxWrapper>

      {/* Rewards Graph */}
      <BoxWrapper >
        <GraphThree graphName={constants.REWARDS} />
      </BoxWrapper>
    </div>
  );
};

export default Graph;