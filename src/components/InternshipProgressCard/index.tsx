import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon, More } from '../../assets/images'
import { InternshipProgressStepper } from '../InternshipProgressStepper';
import { Dropdown, MenuProps } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/global-color/Global-colors.scss'
import './style.scss';

export const InternshipProgressCard = (props:any) => {
  const {title, status, department, internType, postedBy, locationType, locationName, createdAt, closingDate, interns} = props

  // const dropdownMenuItems = [
  //   {
  //     link: "View Details",
  //     onClickFunc: ()=>{},
  //     status: 
  //   }
  // ]
  const filterCount = interns.filter((item: any, idx: any)=> {
    return item.stage === "hired"
  })
  const PopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate("view-internship-details") }}>
            View details
          </a>
        ),
      },
      status !== "Published" && status !== "Closed" ? {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Publish
          </a>
        ),
      }:null,
      status !== "Pending" && status !== "Draft" ? {
        key: '3',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate('pipeline') }}>
            Pipeline
          </a>
        ),
      }:null,
      status !== "Pending" && status !== "Draft" && status !== "Closed" ? {
        key: '4',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Close
          </a>
        ),
      }: null,
      status !== "Published" && status !== "Draft" && status !== "Closed" ? {
        key: '5',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Decline
          </a>
        ),
      }:null,
      {
        key: '6',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Edit
          </a>
        ),
      },
      {
        key: '7',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Delete
          </a>
        ),
      },
      {
        key: '8',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Duplicate
          </a>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{width:180}}>
        <More />
      </Dropdown>
    )
  }
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-row justify-between'>
        <h3>{title}</h3>
        <PopOver />
      </div>
      <div className='flex max-sm:flex-col md:flex-row gap-6'>
        <div className='flex flex-row gap-3 items-center'>
          <DepartmentIcon />
          <p>{department}</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <JobTimeIcon />
          <p>{internType}</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <LocationIconCm />
          <p>{locationType}, {locationName}</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <PostedByIcon />
          <p>{postedBy}</p>
        </div>
      </div>
      <div>
        <InternshipProgressStepper status={status} interns={interns}/>
      </div>
      <div className='flex max-sm:flex-col md:flex-row md:justify-between md:items-center'>
        <div className='flex flex-row gap-3'>
          <p>Created on {createdAt}</p>
          <p>.</p>
          <p>Expected Closing Date {closingDate}</p>
        </div>
        <p>
        <span
          className={`${status} white-color px-3 py-1 rounded-lg`}
        >
          {status}
        </span>
        </p>
      </div>
    </div>
  )
}