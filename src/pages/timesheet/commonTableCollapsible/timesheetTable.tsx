import GlobalTable from '../../../components/Table/Table';
import { TagWarningIcon, TagSuccessIcon, TagPrimaryIcon } from '../../../assets/images';

const TimesheetTable = (props: any) => {
    const { tableData } = props;

    const columns = [
        {
            key: 'taskName',
            title: 'Task Name',
            dataIndex: 'taskName',
            render: (taskName: string) => <span className='capitalize'>{taskName}</span>
        },
        {
            key: 'category',
            title: 'Category',
            dataIndex: 'category',
            render: (category: string) => <span
                className='capitalize flex items-center gap-3'>
                {category === 'design task' ?
                    <TagPrimaryIcon /> :
                    category === 'outdoor activities' ? <TagSuccessIcon /> :
                        <TagWarningIcon />}
                {category}
            </span>
        },
        {
            key: 'date',
            title: 'Date',
            dataIndex: 'date',
        },
        {
            key: 'startTime',
            title: 'Start Time',
            dataIndex: 'startTime'
        },
        {
            key: 'endTime',
            title: 'End Time',
            dataIndex: 'endTime'
        },
    ]

    return (
        <div className='timesheet-table'>
            <GlobalTable bgWhiteTable pagination={false} columns={columns} tableData={tableData} />
        </div>
    )
}

export default TimesheetTable