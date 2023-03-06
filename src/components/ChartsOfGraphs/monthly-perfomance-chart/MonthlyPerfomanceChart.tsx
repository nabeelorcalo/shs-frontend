import { Column } from '@ant-design/plots';
import { useEffect, useState } from 'react';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';
import { perfomanceChart } from './MonthlyPerfomance';

const MonthlyPerfomanceChart = (props: any) => {
  const { XField = "city", YField = "value", seriesField = "type", isGroup = true,
    columnStyle = { radius: [20, 20, 0, 0] },
    color = ['#9BD5E8', '#F08D97', '#78DAAC'], marginRatio = ".5", columnWidth = 0.2, heading,
    className,
    textColor = "#4E4B66", fontSize = "20px", fontWeight = "500"
  } = props

  const [data] = useState(perfomanceChart);
  const config: any = {
    data,
    xField: XField,
    yField: YField,
    seriesField: seriesField,
    isGroup: isGroup,
    columnStyle: columnStyle,
    columnWidthRatio: columnWidth,
    color: color,
    legend: {
      layout: 'horizontal',
      position: 'top-right',
    }
  };
  return (
    <BoxWrapper>
      {heading && <p style={{ fontSize: fontSize, color: textColor, fontWeight: fontWeight }}>{heading}</p>}
      <Column
        marginRatio={marginRatio} {...config} />
    </BoxWrapper>
  )
}

export default MonthlyPerfomanceChart