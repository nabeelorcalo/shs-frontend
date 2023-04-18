import { Rose } from '@ant-design/plots';
import { BoxWrapper } from '../../../components';

interface Props {
    heading?: string;
}

const LeaveChart = (props: Props) => {

    const { heading } = props;
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
    const config = {
        data,
        xField: 'type',
        yField: 'value',
        seriesField: 'type',
        radius: 0.9,
        label: {
            offset: -15,
            style: {
                fill: '',
                opacity: 0.6,
                fontSize: 24
            },
        },
    };
    return <BoxWrapper>
        {heading && <p className='font-medium text-xl text-[#4E4B66]'>{heading}</p>}
        <Rose {...config} limitInPlot height={222} autoFit />
    </BoxWrapper>;
};

export default LeaveChart