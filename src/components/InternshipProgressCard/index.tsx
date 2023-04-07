import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon, More } from '../../assets/images'
import { InternshipProgressStepper } from '../InternshipProgressStepper';
import { Button, Dropdown, MenuProps } from 'antd';
import { STATUS_CONSTANTS } from '../../config/constants';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/global-color/Global-colors.scss'

const { ACTIVE, PENDING, CLOSED, REJECTED } = STATUS_CONSTANTS

export const InternshipProgressCard = () => {
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
      {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Publish
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Decline
          </a>
        ),
      },
      {
        key: '4',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Edit
          </a>
        ),
      },
      {
        key: '5',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Delete
          </a>
        ),
      },
      {
        key: '6',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Duplicate
          </a>
        ),
      },
    ];
    return (
      <Dropdown menu={{ items }} placement="bottomRight">
        <More />
      </Dropdown>
    )
  }
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-row justify-between'>
        <Link to="pipeline"><h3>UI/UX Designer</h3></Link>
        <PopOver />
      </div>
      <div className='flex max-sm:flex-col md:flex-row gap-6'>
        <div className='flex flex-row gap-3 items-center'>
          <DepartmentIcon />
          <p>Design</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <JobTimeIcon />
          <p>Full Time</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <LocationIconCm />
          <p>London, United Kingdom</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <PostedByIcon />
          <p>Amelia Carl</p>
        </div>
      </div>
      <div>
        <InternshipProgressStepper />
      </div>
      <div className='flex max-sm:flex-col md:flex-row md:justify-between md:items-center'>
        <div className='flex flex-row gap-3'>
          <p>Created on July 24, 2021</p>
          <p>.</p>
          <p>Expected Closing Date July 24, 2021</p>
        </div>
        <Button
          size="small"
          className={`${ACTIVE ? `text-success-bg-color` : PENDING ? `text-warning-bg-color` : CLOSED ? `text-info-bg-color` : REJECTED ? `text-error-bg-color` : null}  white-color`}
        >
          Pending
        </Button>
      </div>
    </div>
  )
}