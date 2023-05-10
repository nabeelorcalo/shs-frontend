import React from 'react';
import { Progress, Typography } from 'antd';
import { BoxWrapper } from '../../components';
import './style.scss';

interface EvaluationStatProps {
  name: string,
  percentage: number,
  color: any,
}

export const EvaluationStatsCard: any = (props: EvaluationStatProps) => {
  const { name, percentage, color } = props;

  return (
    <BoxWrapper className={`evaluation-stats-card mt-4`}>
      <div className='flex flex-col'>
        <div className='flex flex-col'>
          <p className="evaluation-stats-name text-xl font-medium" > {name} </p>
          <p className="percentage-txt font-medium text-3xl" style={{ color: color }} >
            {percentage}%
          </p>
          <Progress
            percent={percentage}
            showInfo={false}
            strokeColor={color}
          />
        </div>
      </div>
    </BoxWrapper>
  )
}