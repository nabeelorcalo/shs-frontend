import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';
import { perfomanceChart } from './MonthlyPerfomance';

const MonthlyPerfomanceChart = (props: any) => {
  const { XField = "city", YField = "value", seriesField = "type", isGroup = true,
    columnStyle = { radius: [20, 20, 0, 0] },
    color = ['#9BD5E8', '#F08D97', '#78DAAC'], marginRatio = ".5", columnWidth = 0.2
  } = props

  const [data, setData] = useState(perfomanceChart);
  const config = {
    data,
    xField: XField,
    yField: YField,
    seriesField: seriesField,
    isGroup: isGroup,
    columnStyle: columnStyle,
    columnWidthRatio: columnWidth,
    color: color,
  };
  return (
    <BoxWrapper>
      <Column 
      marginRatio={marginRatio} {...config} />
    </BoxWrapper>
  )
}

export default MonthlyPerfomanceChart