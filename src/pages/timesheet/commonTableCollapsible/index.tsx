import { useState } from 'react';
import { Col, Collapse, Row } from 'antd';
import { CircleMinusIcon, CirclePlusIcon, ClockDarkIcon, TaskListIcon } from '../../../assets/images';
import TimesheetTable from './timesheetTable';
const { Panel } = Collapse;
import './style.scss';

const RenderPanel = (props: any) => {
    const { dateTime, totalTasks, totalTime } = props;
    return (
        <Row gutter={[20, 20]} className=' items-center panel-main'>
            <Col xxl={18} xl={18} md={24} className="capitalize">
                <Row>
                    <Col>
                        <p className='md:w-[220px]'>{dateTime}</p>
                    </Col>
                    <div className="seperator"></div>
                    <Col>
                        <div className="flex items-center">
                            <TaskListIcon className='mr-[10px]' />
                            <p className='tasks'>Tasks: &nbsp;
                                {totalTasks < 10 ? `0${totalTasks}` : totalTasks}
                            </p>
                        </div>
                    </Col>
                    <div className="seperator"></div>
                    <Col>
                        <div className="flex items-center">
                            <ClockDarkIcon className='mr-[10px]' />
                            <p className='tasks'>{totalTime}</p>
                        </div>
                    </Col>
                </Row>
            </Col>
            <Col xxl={6} xl={6} md={24} className="flex-end">
                <Row>
                    <Col>
                        <div className='flex justify-end flex-1 gap-3 flex-wrap panel-right'>
                            {['#5D89F4', '#FFC200', '#E76864'].map(color => (
                                <div
                                    className='h-[30px] w-[100px] rounded-[4px]'
                                    style={{ background: color }}>
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        // <div className='flex flex-wrap items-center panel-main'>
        //     <div className="flex items-center gap-3 capitalize panel-left">
        //         <p className='md:w-[220px]'>{dateTime}</p>
        //         <div className="seperator"></div>
        //         <div className="flex items-center">
        //             <TaskListIcon className='mr-[10px]' />
        //             <p className='tasks'>Tasks: &nbsp;
        //                 {totalTasks < 10 ? `0${totalTasks}` : totalTasks}
        //             </p>
        //         </div>
        //         <div className="seperator"></div>
        //         <div className="flex items-center">
        //             <ClockDarkIcon className='mr-[10px]' />
        //             <p className='tasks'>{totalTime}</p>
        //         </div>
        //     </div>
        //     <div className='flex justify-end flex-1 gap-3 flex-wrap panel-right'>
        //         {['#5D89F4', '#FFC200', '#E76864'].map(color => (
        //             <div
        //                 className='h-[30px] w-[100px] rounded-[4px]'
        //                 style={{ background: color }}>
        //             </div>
        //         ))}
        //     </div>
        // </div>
    )
}

const CommonTableCollapsible = (props: any) => {
    const { id, dateTime, totalTasks, totalTime, tableData } = props;

    const [toggle, setToggle] = useState({ open: false, id: '' });

    return (
        <Collapse size='large'
            expandIcon={toggle.open && id === toggle.id[0] ? CircleMinusIcon : CirclePlusIcon}
            onChange={(e: any) => setToggle({ open: true, id: e })}
            className={` bg-white border-0 history-detail rounded-[16px] mt-[10px]`}
        >
            <Panel header={
                <RenderPanel
                    dateTime={dateTime}
                    totalTasks={totalTasks}
                    totalTime={totalTime}
                />
            }
                key={id}
            >
                <TimesheetTable tableData={tableData} />
            </Panel>
        </Collapse>
    )
}

export default CommonTableCollapsible