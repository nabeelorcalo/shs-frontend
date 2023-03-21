import { useParams } from 'react-router-dom'
import CommonHeader from '../commonHeader';
import CommonTableCollapsible from '../commonTableCollapsible'
import { timesheetMock } from '../mockData';

const ViewHistory = () => {

    const { id } = useParams();

    const findTimesheet = timesheetMock.find(timesheet => timesheet.id === id);

    return (
        <div className='view-history-wrapper'>
            <div className="timesheet-top-heading text-2xl flex items-center gap-4 font-semibold pb-[30px] mb-[30px] capitalize">
                history
                <span className='seperator'></span>
                <span className='font-medium text-base'>Certificate</span>
            </div>

            <CommonHeader hideUser />

            {findTimesheet?.history ? findTimesheet?.history.map((data) => (
                <CommonTableCollapsible
                    id={data.id}
                    dateTime={data.dateTime}
                    totalTasks={data.totalTasks}
                    totalTime={data.totalTime}
                    tableData={data.taskDetails}
                />
            )) :
                <p className='font-medium opacity-[0.5] mt-[30px]'>No History Found...</p>
            }
        </div>
    )
}

export default ViewHistory