import { Column } from '@ant-design/plots';
import { useState } from 'react';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';
import { GrievanceStatsData } from './GrievanceStatsData';

const GrievanceStats = (props: any) => {
    const { statsHeading, xField = 'product_type',
        yField = 'order_amt', isGroup = true, isStack = true,
        seriesField = 'product_sub_type', groupField = 'month', color = ["#9BD5E8", "#F08D97", "#78DAAC", "#FFC15D"],
        legend = {
            layout: 'horizontal',
            position: 'top-right'
        }
    } = props
    const [data] = useState(GrievanceStatsData);
    
    const config: any = {
        data,
        xField: xField,
        yField: yField,
        isGroup: isGroup,
        isStack: isStack,
        seriesField: seriesField,
        groupField: groupField,
        color: color,
        legend: legend
    };
    return (
        <BoxWrapper>
            {statsHeading && <p>{statsHeading}</p>}
            <Column {...config} columnWidthRatio={.3} />
        </BoxWrapper>
    )
}
export default GrievanceStats