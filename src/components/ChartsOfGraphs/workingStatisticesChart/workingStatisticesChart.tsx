import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import { BoxWrapper } from '../../BoxWrapper/BoxWrapper';
import { statisticesData } from './workingChart';


export const WorkingStatisticesChart = (props: any) => {
  const { isStack = true, xField = "days", yField = "value", seriesField = "type",
    heading, legend = { layout: "horizontal", position: 'top-right' } } = props
  const [data] = useState<any>(statisticesData);

  const config: any = {
    data,
    isStack: isStack,
    xField: xField,
    yField: yField,
    seriesField: seriesField,
    legend: legend,

    color: ({ type }: any) => {
      console.log("type", type)
      if (type == 'Under Time') {
        return '#F3B8B7';
      }
      else if (type === 'Over Time') {
        return '#A9E2B8';
      }
      else if (type === 'Shift') {
        return '#94D5EA';
      }
      else if (type === 'Holiday') {
        return '#E8ECED';
      }
      else {
        return 'red'
      }
    }
  };
  return (
    <BoxWrapper className='my-4'>
      {heading && <p className='text-xl font-medium text-secondary-color'>{heading}</p>}
      <Column {...config} maxColumnWidth={50} />
    </BoxWrapper>
  )

}
