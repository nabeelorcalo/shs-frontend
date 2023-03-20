import { ClockDarkIcon } from '../../../assets/images'
import { BoxWrapper, SimpleTimer } from '../../../components';
import { Divider } from 'antd';
import GlobalTable from '../../../components/Table/Table';

const InternTable = () => {

    const columns = [
        {
            key: 'timer', title: '', dataIndex: '',
            render: (_: any) => <SimpleTimer hideCounter iconHiehgt={'32px'} iconWidth={'32px'} />
        },
        { key: 'taskName', title: 'Task Name', dataIndex: 'taskName' },
        { key: 'category', title: 'Category', dataIndex: 'category' },
        { key: 'date', title: 'Date', dataIndex: 'date' },
        { key: 'startTime', title: 'Start Time', dataIndex: 'startTime' },
        { key: 'endTime', title: 'End Time', dataIndex: 'endTime' },
    ];

    const tableData = [
        {
            id: '1',
            taskName: 'UI/UX design',
            category: 'design task',
            date: '01/05/2023',
            startTime: '01:10',
            endTime: '03:45'
        },
        {
            id: '2',
            taskName: 'homepage deisgn',
            category: 'outdoor activities',
            date: '01/05/2023',
            startTime: '01:10',
            endTime: '03:45'
        },
        {
            id: '3',
            taskName: 'field task',
            category: 'research',
            date: '01/05/2023',
            startTime: '01:10',
            endTime: '03:45'
        },
        {
            id: '4',
            taskName: 'website research',
            category: 'design task',
            date: '01/05/2023',
            startTime: '01:10',
            endTime: '03:45'
        },
    ]

    return (
        <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='intern-table'>
            <div className="flex items-center justify-between flex-wrap gap-3">
                <p className='day-selection text-base'>Today</p>
                <div className='clock-time flex items-center gap-3'>
                    <ClockDarkIcon />
                    <p className='font-medium'>05:30:15</p>
                </div>
            </div>
            <Divider />
            <GlobalTable bgWhiteTable columns={columns} tableData={tableData} pagination={false} />
        </BoxWrapper>
    )
}

export default InternTable