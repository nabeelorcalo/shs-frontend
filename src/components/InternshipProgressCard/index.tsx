import { useState } from 'react';
import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon, More, AlertIcon } from '../../assets/images'
import { InternshipProgressStepper } from '../InternshipProgressStepper';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Notifications } from '../Notification';
import { PopUpModal } from '../Model';
import { ROUTES_CONSTANTS } from '../../config/constants';
import useCustomHook from '../../pages/internships/actionHandler';
import dayjs from 'dayjs';
import './style.scss';

export const InternshipProgressCard = (props: any) => {
  const { item, title, status, department, internType, postedBy, 
    location, createdAt, closingDate, interns } = props;
  const [decline, setDecline] = useState(false);
  const [deleteInternship, setDeleteInternship] = useState(false);
  const { deleteInternshipData,getDuplicateInternship } = useCustomHook();
  const createdOn = dayjs(createdAt).format('MMMM DD,YYYY');
  const expectedClosingDate = dayjs(closingDate).format('MMMM DD,YYYY');

  const internStatus = {
    published:'PUBLISHED',
    closed:'CLOSED',
    pending:'PENDING',
    draft:'DRAFT',
  }

  const handleDelete = (id: any) => {
    deleteInternshipData(id);
    setDeleteInternship(false)
  }
  const handleDublicate=(id:any)=>{
    getDuplicateInternship(id)
  }

  const PopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => {
            navigate(ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS + "?status=" + status, {state: {data:item}})
          }}>
            View details
          </a>
        ),
      },
      status !== internStatus?.published && status !== internStatus.closed ? {
        key: '2',
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              Notifications({
                title: "Success",
                description: "Internship Published",
                type: 'success'
              })
            }}
          >
            Publish
          </a>
        ),
      } : null,
      status !== internStatus.pending && status !== internStatus.draft ? {
        key: '3',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate(`/${ROUTES_CONSTANTS.INTERNSHIP_PIPELINE}`,{ state: item.id }) }}>
            Pipeline
          </a>
        ),
      } : null,
      status !== internStatus.pending && status !== internStatus.draft && status !== internStatus.closed ? {
        key: '4',
        label: (
          <a rel="noopener noreferrer" onClick={() => { }}>
            Close
          </a>
        ),
      } : null,
      status !== internStatus.published && status !== internStatus.draft && status !== internStatus.closed ? {
        key: '5',
        label: (
          <a rel="noopener noreferrer" onClick={() => { setDecline(true) }}>
            Decline
          </a>
        ),
      } : null,
      {
        key: '6',
        label: (
          <a rel="noopener noreferrer" onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP,{ state: item })}}>
          Edit
        </a>
        ),
      },
      {
        key: '7',
        label: (
          <a rel="noopener noreferrer" onClick={() => { setDeleteInternship(true) }}>
            Delete
          </a>
        ),
      },
      {
        key: '8',
        label: (
          <a rel="noopener noreferrer" onClick={()=>{handleDublicate(item.id)}}>
            Duplicate
          </a>
        ),
      },
    ];
    return (
      <Dropdown
        menu={{ items }}
        trigger={['click']}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More />
      </Dropdown>
    )
  }
  return (
    <div className='flex flex-col gap-3 cursor-pointer'>
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
          <p>{location}</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <PostedByIcon />
          <p>{postedBy}</p>
        </div>
      </div>
      <div>
        <InternshipProgressStepper status={status} interns={interns} />
      </div>
      <div className='flex max-sm:flex-col md:flex-row md:justify-between md:items-center gap-3'>
        <div className='flex max-sm:flex-col md:flex-row  gap-3'>
          {createdAt === null ? <p>Created on --</p> : <p>Created on {createdOn}</p>}
          <p>.</p>
          {(closingDate === null) ? <p>Expected Closing Date  -- </p> : <p>Expected Closing Date {expectedClosingDate}</p>}
        </div>
        <p>
          <span className={`${status} white-color px-3 py-1 rounded-lg`} >
            {status}
          </span>
        </p>
      </div>
      <PopUpModal
        open={decline}
        width={500}
        close={() => { setDecline(false) }}
        children={
          <div>
            <div className="flex flex-col gap-5">
              <div className='flex flex-row items-center gap-3'>
                <div><AlertIcon /></div>
                <div><h2>Alert</h2></div>
              </div>
              <p>Do you want to decline this internship?</p>
            </div>
          </div>
        }
        footer={
          <div className='flex flex-row pt-4 gap-3 justify-end max-sm:flex-col'>
            <Button
              type="default"
              size="small"
              className="button-default-error max-sm:w-full"
              onClick={() => setDecline(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-error max-sm:w-full"
            >
              Decline
            </Button>
          </div>
        }
      />
      <PopUpModal
        open={deleteInternship}
        width={500}
        close={() => { setDeleteInternship(false) }}
        children={
          <div>
            <div className="flex flex-col gap-5">
              <div className='flex flex-row items-center gap-3'>
                <div><AlertIcon /></div>
                <div><h2>Alert</h2></div>
              </div>
              <p>Do you want to delete this internship?</p>
            </div>
          </div>
        }
        footer={
          <div className='flex flex-row pt-4 gap-3 justify-end max-sm:flex-col'>
            <Button
              type="default"
              size="small"
              className="button-default-error max-sm:w-full"
              onClick={() => setDeleteInternship(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-error max-sm:w-full"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        }
      />
    </div>
  )
}