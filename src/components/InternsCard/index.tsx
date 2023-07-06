import { Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper } from '../../components'
import { ROUTES_CONSTANTS } from '../../config/constants'
import './style.scss';

export const InternsCard = (props: any) => {
  const { id, status, pupover, posted_by, title, department,
    joining_date, company, company_rep, name, item } = props;

  const { CHAT, STUDENTPROFILE } = ROUTES_CONSTANTS
  const navigate = useNavigate()

  // const fullName = name;
  // // Split the full name into separate parts
  // const nameParts = fullName?.split(" ");
  // // Extract the first and second parts
  // const firstName = nameParts[0];
  // const middleName = nameParts[1];
  // // Concatenate the first and second parts
  // const shortenedName = `${firstName} ${middleName}`;


  return (
    <div className='interns-card-main'>
      <BoxWrapper className='interns-card'>
        <div className='flex flex-row justify-between'>
          {status ? status : ''}
          {pupover ? pupover : null}
        </div>
        <div className='flex flex-col gap-4 items-center main-card-jsx'>
          <div className='flex flex-col gap-2 items-center'>
            {posted_by}
            {name ? <p className='text-2xl font-medium'>{name}</p> : null}
            {title ? <p className='text-2xl font-medium'>{title}</p> : null}
            <p className='text-sm font-normal'>{department}</p>
            {company ? <p className='text-sm'>Company:
              <span className='text-sm pl-2 font-semibold'>{company}</span></p> : null}
          </div>
          <div className='flex flex-row max-xs:flex-col gap-3 items-center p-3 max-sm:p-2 rounded-md join-dob-card-style'>
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-sm text-success-placeholder-color'>Joining</p>
              <p className='text-sm'>{joining_date}</p>
            </div>
            <Divider type="vertical" />
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-sm text-success-placeholder-color'>Company Rep</p>
              {company_rep ? <p className='text-sm'>{company_rep}</p> : 'N/A'}
            </div>
          </div>
          <div className='flex sm:flex-row flex-col gap-3 items-center'>
            <Button
              className="profile-btn border-0 accommodation-btn-info-bg text-info-color-dark font-semibold"
              size="small"
              onClick={() => navigate(`${STUDENTPROFILE}/${id}`, { state: item })}>
              Profile
            </Button>
            <Button
              className='chat-btn border-0 light-green-bg-color text-success-hover-color font-semibold'
              size="small"
              onClick={() => navigate(`${CHAT}/${id}`)}>
              Chat
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}