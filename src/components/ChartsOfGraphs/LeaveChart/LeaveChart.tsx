import { Rose, Pie } from '@ant-design/plots';
import { BoxWrapper } from '../../../components';

interface Props {
    heading?: string;
    leavesData?: any
}

const LeaveChart = (props: Props) => {

    const { heading, leavesData } = props;

    const data = [
        {
            type: 'Sick Leaves',
            value: 27,
        },
        {
            type: 'Casual Leaves',
            value: 25,
        },
        {
            type: 'Medical Leaves',
            value: 18,
        },
        {
            type: 'Work From Home',
            value: 15,
        },
    ];
    
    const config: any = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        label: {
            offset: -15,
            formatter: (v: any) => v.value,
        },
        legend: {
            position: 'left',
        },
    };
    return <BoxWrapper>
        {heading && <p className='font-medium text-xl text-[#4E4B66]'>{heading}</p>}
        <Rose {...config} height={220} />
    </BoxWrapper>;
};

export default LeaveChart