import React, { useState, useEffect } from 'react';
import GraphOne from './graphForRegisteredMembersAndFeedback';
import GraphTwo from './graphForAttendanceAndListings';
import GraphThree from './graphForRegisterAgentsAndRewards';
import GraphFour from './graphForGrowthAnalytics';
import GraphFive from './graphForLifeAssessmentAndLifeBalance/lifeAssessment';
import GraphSix from './graphForLifeAssessmentAndLifeBalance/lifeBalance';
import constants from '../../config/constants';
import {BoxWrapper} from '../../components/BoxWrapper/boxWrapper';
import "./style.scss"



const Graph = (props: any) => {
  return (
    <div className='p-4'>

      <BoxWrapper >
        <GraphSix monthName="Jan" />
      </BoxWrapper>

      <BoxWrapper >
        <GraphFive monthName="Jan" />
      </BoxWrapper>

      {/* <BoxWrapper >
        <GraphFour />
      </BoxWrapper> */}

      {/* Register Member Graph */}
      {/* <BoxWrapper >
        <GraphOne graphName={constants.REGISTER_MEMBERS} />
      </BoxWrapper> */}

      {/* Feedback Graph */}
      {/* <BoxWrapper >
        <GraphOne graphName={constants.FEEDBACk} />
      </BoxWrapper> */}

      {/* Attendance Graph */}
      {/* <BoxWrapper >
        <GraphTwo graphName={constants.ATTENDANCE} />
      </BoxWrapper> */}

      {/* Listings Graph */}
      {/* <BoxWrapper >
        <GraphTwo graphName={constants.LISTINGS} />
      </BoxWrapper> */}

      {/* Register Agents Graph */}
      {/* <BoxWrapper >
        <GraphThree graphName={constants.REGISTER_AGENTS} />
      </BoxWrapper> */}

      {/* Rewards Graph */}
      {/* <BoxWrapper >
        <GraphThree graphName={constants.REWARDS} />
      </BoxWrapper> */}
    </div>
  );
};

export default Graph;