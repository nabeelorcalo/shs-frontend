import { Avatar, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper } from '../BoxWrapper/BoxWrapper'
import '../../scss/global-color/Global-colors.scss'
import './style.scss'

export const InternsCard = (props: any) => {
  const { statusBtn, pupover, name, posted_by, title, department, joining_date, date_of_birth, company } = props
  const navigate = useNavigate()
  return (
    <div className='interns-card-main max-sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 px-4 mb-8'>
      <BoxWrapper className='interns-card'>
      <div className='flex flex-row justify-between'>
              {statusBtn ? statusBtn : null}
              {pupover? pupover :null}
          </div>
        <div className='flex flex-col gap-4 items-center main-card-jsx'>

          <div className='flex flex-col gap-2 items-center'>
            {posted_by}
            {name?<p className='text-lg font-[700]'>{name}</p>:null}
            {title?<p className='text-lg font-[700]'>{title}</p>:null}
            <p className='text-sm'>{department}</p>
            {company ? <p className='text-sm'>Company:<span className='text-sm pl-2 font-semibold'>{company}</span></p> : null}
          </div>
          <div className='flex flex-row gap-3 items-center p-3 rounded-md join-dob-card-style'>
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
          <div className='flex flex-row gap-3 items-center'>
            <Button
              className="border-0 accommodation-btn-info-bg text-info-color-dark"
              size="small"
              onClick={() => { navigate("profile") }}>
              Profile
            </Button>
            <Button
              className='border-0 light-green-bg-color text-success-hover-color'
              size="small"
              onClick={() => { navigate("chat") }}>
              Chat
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}