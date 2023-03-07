import { Pie } from '@ant-design/plots';
import { useState } from 'react';
import BoxWrapper from '../../BoxWrapper/BoxWrapper';
import { TimeSheetCategoriesData } from './timeSheet';

export const TimesheetCategories = (props: any) => {
    const {
        appendPadding = 10,
        angleField = 'value',
        colorField = 'type',
        radius = 1,
        innerRadius = .7,
        label = {
            type: 'inner',
            offset: '-50%',
            content: '',
            style: {
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 600
            },
        },
        statistic = {
            title: false,
            content: {
                content: '7h 10m',
            },
        },
        color = ['#E76864', '#88DCC6', '#5D89F4', '#FFC200'],
        legend = {
            layout: 'vertical',
            position: 'left-top'
        }, heading,
    } = props

    const [data] = useState(TimeSheetCategoriesData)

    const config: any = {
        appendPadding: appendPadding,
        data,
        angleField: angleField,
        colorField: colorField,
        radius: radius,
        innerRadius: innerRadius,
        label: label,
        statistic: statistic,
        color: color,
        legend: legend
    };
    return (
        <BoxWrapper>
            {heading && <p className='text-secondary-color font-medium text-xl'>{heading}</p>}
            <Pie {...config} />
        </BoxWrapper>
    )
}
