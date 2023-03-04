import React, { useState, useEffect } from 'react';
import GraphOne from './graphForRegisteredMembersAndFeedback';
import GraphTwo from './graphForAttendanceAndListings';

const Graph = (props: any) => {
  return (
    <GraphOne graphName="resolutionFeedback" />
  );
};

export default Graph;