import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';

const MockData = [
  {
    days: "Mon",
    value: 0.5,
    type: "Under Time"
  },
  {
    days: "Tue",
    value: 5,
    type: "Under Time"
  },

  {
    days: "Wed",
    value: 6,
    type: "Shift"
  },
  {
    days: "Thu",
    value: 5,
    type: "Over Time"
  },
  {
    days: "Fri",
    value: 10,
    type: "Over Time"
  },
  {
    days: "Sat",
    value: 2,
    type: "Holiday"
  },
  {
    days: "Sun",
    value: 8,
    type: "Holiday"
  },
]
const WorkingStatisticesChart = (props: any) => {
  const { isStack = true, xField = "days", yField = "value",
    seriesField = "type", legend = { layout: "horizontal", position: 'top-right' } } = props
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    setData(MockData)
  }, [])

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
    <BoxWrapper>
      <p className='text-xl font-medium text-secondary-color'>Work Statistices</p>
      <Column {...config} maxColumnWidth={50} />
    </BoxWrapper>
  )

}

export default WorkingStatisticesChart