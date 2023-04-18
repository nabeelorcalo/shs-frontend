import { Col, Row, Progress } from 'antd'
import React, { Fragment, useState } from 'react'
import { UserAvatar } from '../../../assets/images'
import { BoxWrapper, DropDown, PageHeader, SearchBar } from '../../../components';
import Clock24Icon from '../../../assets/images/timesheetTime.png';
import ClockIcon from '../../../assets/images/Clock.png';
import './style.scss';
import CommonTableCollapsible from '../commonTableCollapsible';
import { timesheetMock } from '../mockData';

const Manager = () => {
  const [date, setDate] = useState('this week');
  const [download, setDownload] = useState('');

  const userLists = [
    {
      id: '1',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '2',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '3',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '4',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '5',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '6',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '7',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '8',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
    {
      id: '9',
      userImg: UserAvatar,
      userName: 'mino marina',
      designation: 'data researcher',
      lastActivity: "1 day ago"
    },
  ]

  return (
    <div className='manager-wrapper'>
      <PageHeader title='Timesheets' bordered />
      <Row gutter={[20, 20]}>
        <Col xxl={5} xl={7} lg={10} xs={24} md={24} className='h-full' >
          <BoxWrapper
            boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'
            className='rounded-2xl h-full'
          >
            <SearchBar size='middle' className='mb-[10px]' handleChange={(e: any) => { }} />
            <div className='scroller'>
              {
                userLists.map((user) => (
                  <div key={user.id} className='user-list py-[10px]'>
                    <div className="user p-[10px] flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 capitalize">
                        <img src={user.userImg} alt='icon' className='h-[48px] w-[48px]' />
                        <div>
                          <p className='user-name text-base'>{user.userName}</p>
                          <p className='user-designation text-sm'>{user.designation}</p>
                        </div>
                      </div>
                      <span className='last-activity text-xs'>{user.lastActivity}</span>
                    </div>
                  </div>
                ))
              }
            </div>
          </BoxWrapper>
        </Col>
        <Col xxl={19} xl={17} lg={14} xs={24} className='h-full'>
          <div className="flex items-center justify-end gap-3 mb-[30px]">
            <DropDown
              name='this week'
              value={date}
              setValue={setDate}
              options={['this week', 'last week', 'this month', 'last month', 'date range']}
              requireRangePicker
              showDatePickerOnVal={'date range'}
            />
            <DropDown
              requiredDownloadIcon
              options={['pdf', 'excel']}
              value={download}
              setValue={setDownload}
            />
          </div>
          <BoxWrapper
            boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'
            className='time-progress mb-[30px] flex-wrap rounded-2xl flex items-center justify-between gap-4'
          >
            <div className="flex items-center gap-5 max-lg:basis-2/4">
              <img src={ClockIcon} />
              <div className='w-[150px]'>
                <p className='hours-title text-base'>Total Hours</p>
                <p className='hours text-2xl font-medium'>{'35h'}</p>
              </div>
            </div>
            <Progress percent={30} className='flex-1 flex items-center gap-3 max-lg:basis-2/4' strokeColor={'#3DC575'} />
            <div className="flex sm:grow md:grow-0 items-center gap-5 max-lg:basis-2/4">
              <img src={Clock24Icon} />
              <div className='w-[150px] '>
                <p className='hours-title text-base'>Wroked Hours</p>
                <p className='hours text-2xl font-medium'>{'27h 52m'}</p>
              </div>
            </div>
          </BoxWrapper>
          <div className="time-history-scroller">
            {timesheetMock.map((data) => (
              <Fragment key={data.id}>
                {
                  data.history?.map((history) => (
                    <CommonTableCollapsible
                      key={history.id}
                      dateTime={history.dateTime}
                      totalTasks={history.totalTasks}
                      totalTime={history.totalTime}
                      tableData={history.taskDetails}
                    />
                  ))
                }
              </Fragment>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Manager