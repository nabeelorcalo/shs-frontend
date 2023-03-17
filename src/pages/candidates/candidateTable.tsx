import React from 'react'
import { BoxWrapper } from '../../components/BoxWrapper/BoxWrapper'
import GlobalTable from '../../components/Table';
import { StarOutlinedIcon, StarFilledIcon, UserAvatar, ThreeDotsIcon } from "../../assets/images";

import DropDownNew from '../../components/Dropdown/DropDownNew';

const CandidateTable = (props: any) => {
  const { setOpenDrawer, setOpenRejectModal } = props;

  let ratingCount = [
    { title: 'exceptional', count: 5 },
    { title: 'very good', count: 4 },
    { title: 'good', count: 3 },
    { title: 'average', count: 2 },
    { title: 'poor', count: 1 }
  ];

  const items: any = [
    {
      label: <div>
        {ratingCount.map((obj, i) => <div key={obj.count} className='flex items-center ratings'>
          <p className='title font-semibold text-base capitalize w-[120px] mb-[15px]'>{obj.title}</p>
          {Array.from(Array(obj.count).keys()).map(num => <StarFilledIcon key={num} className='icons mx-[2px]' />)}
        </div>)}
      </div>,
      key: 'rating'
    },

  ];

  const columns = [
    {
      key: 'no',
      dataIndex: 'no',
      title: 'No',
      render: (_: any, data: any) => <span>{data.no > 9 ? data.no : `0${data.no}`} </span>
    },
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: 'Avatar',
      render: (_: any, data: any) => <img className='h-[32px] w-[32px] rounded-full object-cover'
        src={data.avatar}
      />
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
      render: (_: any, data: any) => <span className='capitalize'>{data.name}</span>
    },
    {
      key: 'internship',
      dataIndex: 'internship',
      title: 'Internship',
      render: (_: any, data: any) => <div className='capitalize'>
        <p>{data.internship}</p>
        <p>{data.type}</p>
      </div>
    },
    {
      key: 'appliedDate',
      dataIndex: 'appliedDate',
      title: 'Applied Date',
    },
    {
      key: 'rating',
      dataIndex: 'rating',
      title: 'Rating',
      render: (_: any, data: any) =>
        <DropDownNew items={items}>
          <div className='flex items-center justify-center gap-2'>
            {data.rating === 0 ? <StarOutlinedIcon cursor={'pointer'} /> : <StarFilledIcon cursor={'pointer'} />}
            <span>{data.rating}</span>
          </div>
        </DropDownNew>
    },
    {
      key: 'stage',
      dataIndex: 'stage',
      title: 'Stage',
      render: (_: any, data: any) => <div>
        <p className='capitalize'>{data.stage}</p>
        <div className='flex items-center justify-center rounded-full overflow-hidden'>
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <p key={val} className={`stage-apply ${data.stage}`}>{val}</p>
          ))}
        </div>
      </div>
    },
    {
      key: 'action',
      dataIndex: '',
      title: 'Action',
      render: (_: any, data: any) => <DropDownNew
        items={[
          { label: <p onClick={() => setOpenDrawer(true)}>View Details</p>, key: 'detail' },
          { label: <p onClick={() => setOpenRejectModal(true)}>Reject</p>, key: 'reject' }
        ]}
      >
        <ThreeDotsIcon className='cursor-pointer' />
      </DropDownNew>
    },


  ];


  const tableData = [
    {
      no: '1',
      avatar: UserAvatar,
      name: 'phyllis godley',
      internship: 'UI UX Designer',
      type: 'design',
      appliedDate: '06/10/2022',
      rating: 0,
      stage: 'applied',
      currentStage: 1
    },
    {
      no: '2',
      avatar: UserAvatar,
      name: 'phyllis godley',
      internship: 'UI UX Designer',
      type: 'design',
      appliedDate: '06/10/2022',
      rating: 2,
      stage: 'interviewed',
      currentStage: 2
    },
    {
      no: '3',
      avatar: UserAvatar,
      name: 'phyllis godley',
      internship: 'UI UX Designer',
      type: 'design',
      appliedDate: '06/10/2022',
      rating: 2,
      stage: 'recommended',
      currentStage: 3
    },
    {
      no: '4',
      avatar: UserAvatar,
      name: 'phyllis godley',
      internship: 'UI UX Designer',
      type: 'design',
      appliedDate: '06/10/2022',
      rating: 2,
      stage: 'offer letter',
      currentStage: 4
    },
    {
      no: '5',
      avatar: UserAvatar,
      name: 'phyllis godley',
      internship: 'UI UX Designer',
      type: 'design',
      appliedDate: '06/10/2022',
      rating: 2,
      stage: 'hired',
      currentStage: 5
    },
    {
      no: '6',
      avatar: UserAvatar,
      name: 'phyllis godley',
      internship: 'UI UX Designer',
      type: 'design',
      appliedDate: '06/10/2022',
      rating: 2,
      stage: 'rejected',
      currentStage: 6
    },
  ]

  return (
    <BoxWrapper className='candidate-table-wrapper'>
      <GlobalTable columns={columns} tableData={tableData} pagination />
    </BoxWrapper>
  )
}

export default CandidateTable
