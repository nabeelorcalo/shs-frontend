import { Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper } from '../../components'
import { ROUTES_CONSTANTS } from '../../config/constants'
import './style.scss'
export const InternsCard = (props: any) => {
  const { id, status, pupover, name, posted_by, title, department,
    joining_date, date_of_birth, company } = props;
  const { CHAT, STUDENTPROFILE } = ROUTES_CONSTANTS
  const navigate = useNavigate()

  return (
    <div className='interns-card-main'>
      {/* flex mb-8 max-sm:w-full max-md:w-1/2
     max-lg:w-full max-xl:w-1/2 max-2xl:w-1/3 max-3xl:w-1/4 3xl:w-1/5 */}
      <BoxWrapper className='interns-card'>
        <div className='flex flex-row justify-between'>
          {status ? status : ''}
          {pupover ? pupover : null}
        </div>
        <div className='flex flex-col gap-4 items-center main-card-jsx'>
          <div className='flex flex-col gap-2 items-center'>
            {posted_by}
            {name ? <p className='text-lg font-[700]'>{name}</p> : null}
            {title ? <p className='text-lg font-[700]'>{title}</p> : null}
            <p className='text-sm'>{department}</p>
            {company ? <p className='text-sm'>Company:<span className='text-sm pl-2 font-semibold'>{company}</span></p> : null}
          </div>
          <div className='flex flex-row max-xs:flex-col gap-3 items-center p-3 max-sm:p-2 rounded-md join-dob-card-style'>
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-sm text-success-placeholder-color'>Joining</p>
              <p>{joining_date}</p>
            </div>
            <Divider type="vertical" />
            <div className='flex flex-col gap-2 items-center'>
              <p className='text-sm text-success-placeholder-color'>Date of birth</p>
              <p>{date_of_birth}</p>
            </div>
          </div>
          <div className='flex sm:flex-row flex-col gap-3 items-center'>
            <Button
              className="border-0 accommodation-btn-info-bg text-info-color-dark"
              size="small"
              // onClick={() => navigate(`${STUDENTPROFILE}/${id}`)}>
              onClick={() => navigate(`${STUDENTPROFILE}`)}>
              Profile
            </Button>
            <Button
              className='border-0 light-green-bg-color text-success-hover-color'
              size="small"
              // onClick={() => navigate(`${CHAT}/${id}`)}>
              onClick={() => navigate(`${CHAT}`)}>
              Chat
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}