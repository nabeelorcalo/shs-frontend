import { useState } from 'react';
import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon, More, AlertIcon, FullStop } from '../../assets/images'
import { InternshipProgressStepper } from '../InternshipProgressStepper';
import { Button, Dropdown, MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PopUpModal } from '../Model';
import { ROUTES_CONSTANTS } from '../../config/constants';
import useCustomHook from '../../pages/internships/actionHandler';
import dayjs from 'dayjs';
import './style.scss';
import { useRecoilState } from 'recoil';
import { internshipFilterState } from '../../store';

export const InternshipProgressCard = (props: any) => {
  const { item, title, status, department, internType, postedBy,
    location, createdAt, closingDate, interns } = props;
  const [decline, setDecline] = useState(false);
  const [deleteInternship, setDeleteInternship] = useState(false);
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useRecoilState(internshipFilterState);
  const { deleteInternshipData, getDuplicateInternship, EditNewInternshipsData, getAllInternshipsData } = useCustomHook();
  const createdOn = dayjs(createdAt).format('MMMM DD,YYYY');
  const expectedClosingDate = dayjs(closingDate).format('MMMM DD,YYYY');

  const internStatus = {
    published: 'PUBLISHED',
    closed: 'CLOSED',
    pending: 'PENDING',
    draft: 'DRAFT',
    rejected: 'REJECTED',
  }

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };

  const handleDelete = (id: any) => {
    let args = removeEmptyValues(filter);
    deleteInternshipData(id, setLoading, args);
    setDeleteInternship(false)
  }

  const handleDublicate = (id: any) => {
    let args = removeEmptyValues(filter)
    getDuplicateInternship(id, setLoading, args);
  }

  const handleUpdateStatus = (updateStatus: any) => {
    let args = removeEmptyValues(filter)
    const Obj = {
      ...item,
      status: updateStatus ? updateStatus : status
    }
    EditNewInternshipsData(Obj, updateStatus, setLoading, args)
  }

  const handleDeclineInternship = () => {
    setDecline(false);
    handleUpdateStatus('REJECTED')
    getAllInternshipsData()
  }

  const PopOver = () => {
    const navigate = useNavigate()
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() => {
            navigate(ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS + "?status=" + status, { state: { data: item } })
          }}>
            View Details
          </a>
        ),
      },
      status !== internStatus?.published && status !== internStatus.closed && status !== internStatus.rejected ? {
        key: '2',
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => handleUpdateStatus('PUBLISHED')}>
            Publish
          </a>
        ),
      } : null,
      status !== internStatus.pending && status !== internStatus.draft && status !== internStatus.rejected ? {
        key: '3',
        label: (
          <a rel="noopener noreferrer"
            onClick={() => { navigate(`/${ROUTES_CONSTANTS.INTERNSHIP_PIPELINE}`, { state: { data: item } }) }}>
            Pipeline
          </a>
        ),
      } : null,
      status !== internStatus.pending && status !== internStatus.draft && status !== internStatus.closed && status !== internStatus.rejected ? {
        key: '4',
        label: (
          <a rel="noopener noreferrer" onClick={() => {
            handleUpdateStatus('CLOSED');
          }}>
            Close
          </a>
        ),
      } : null,
      status !== internStatus.published && status !== internStatus.draft && status !== internStatus.closed && status !== internStatus.rejected ? {
        key: '5',
        label: (
          <a rel="noopener noreferrer" onClick={() => { setDecline(true) }}>
            Decline
          </a>
        ),
      } : null,

      status !== internStatus.rejected ? {
        key: '6',
        label: (
          <a rel="noopener noreferrer"
            onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP, { state: item }) }}>
            Edit
          </a>
        ),
      } : null,
      {
        key: '7',
        label: (
          <a rel="noopener noreferrer" onClick={() => { setDeleteInternship(true) }}>
            Delete
          </a>
        ),
      },
      status !== internStatus.rejected ? {
        key: '8',
        label: (
          <a rel="noopener noreferrer" onClick={() => { handleDublicate(item.id) }}>
            Duplicate
          </a>
        ),
      } : null,
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
        <h3 className='text-primary-color text-xl'>{title ? title : "N/A"}</h3>
        <PopOver />
      </div>
      <div className='flex max-sm:flex-col md:flex-row gap-6'>
        <div className='flex flex-row gap-3 items-center'>
          <DepartmentIcon />
          <p>{department ? department : "N/A"}</p>
        </div>
        <div className='flex flex-row gap-3 items-center'>
          <JobTimeIcon />
          <p className='capitalize'>{internType ? internType?.replace('_', ' ').toLowerCase() : "N/A"}</p>
        </div>
        {location && <div className='flex flex-row gap-3 items-center'>
          <LocationIconCm />
          <p>{location ? location : "N/A"}</p>
        </div>}
        <div className='flex flex-row gap-3 items-center'>
          <PostedByIcon />
          <p>{postedBy ? postedBy : "N/A"}</p>
        </div>
      </div>
      <div>
        <InternshipProgressStepper status={status} interns={interns} />
      </div>
      <div className='flex max-sm:flex-col md:flex-row md:justify-between md:items-center gap-3'>
        <div className='flex max-sm:flex-col md:flex-row  gap-3'>
          <p>Created on {createdAt === null ? "N/A" : createdOn}</p>
          <p><FullStop /></p>
          <p>Expected Closing Date {(expectedClosingDate === "Invalid Date" || null) ? " N/A" : expectedClosingDate}</p>
        </div>
        <p>
          <span className={`${status} white-color px-3 py-1 rounded-lg capitalize`} >
            {status?.toLowerCase()}
          </span>
        </p>
      </div>

      {decline && <PopUpModal
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
              onClick={handleDeclineInternship}
            >
              Decline
            </Button>
          </div>
        }
      />}

      {deleteInternship && <PopUpModal
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
      />}
    </div>
  )
}