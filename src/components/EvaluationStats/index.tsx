import React from 'react';
import { Progress, Typography } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import './style.scss';

interface EvaluationStatProps {
  name: string,
  percentage: number,
  color: any,
}

export const EvaluationStatsCard: any = (props: EvaluationStatProps) => {
  const { name, percentage, color } = props;

  return (
    <BoxWrapper className='mt-4'>
      <div className='flex flex-col gap-4 evaluation-stats-card'>

        <div className='flex flex-col gap-0'>
          <Typography.Title
            level={4}
            className="evaluation-stats-name"
          >
            {name}
          </Typography.Title>

          <Typography.Title
            level={2}
            className="percentage-txt"
            style={{ color: color }}
          >
            {percentage}%
          </Typography.Title>

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