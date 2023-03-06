import { Pie } from '@ant-design/plots';
import { useState } from 'react';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';
import { TimeSheetCategories } from './timeSheet';
const TimesheetCategories = () => {
    const [data] = useState(TimeSheetCategories)

    const config: any = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.7,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '',
            style: {
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 600
            },
        },
        statistic: {
            title: false,
            content: {
                content: '7h 10m',
            },
        },
        color: ['#E76864', '#88DCC6', '#5D89F4', '#FFC200'],
        legend: {
            layout: 'vertical',
            position: 'left-top'
        }
    };
    return (
        <BoxWrapper>
            <p className='text-secondary-color font-medium text-xl'>Categories</p>
            <Pie {...config} />
        </BoxWrapper>
    )
}

export default TimesheetCategories