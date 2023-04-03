import { Avatar, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper } from '../BoxWrapper/BoxWrapper'
import '../../scss/global-color/Global-colors.scss'
import './style.scss'

export const InternsCard = () => {
  const navigate = useNavigate()
  return (
    <div className='interns-card-main w-70'>
      <BoxWrapper className='interns-card'>
        <div className='flex flex-col gap-4 items-center main-card-jsx'>
          <div className='flex flex-col gap-2 items-center'>
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <p className='text-lg font-[700]'>Andrea Hiyahiya</p>
            <p className='text-sm'>Business Analyst</p>
          </div>
          <div className='flex flex-row gap-3 items-center p-3 rounded-md join-dob-card-style'>
            <div className='flex flex-col gap-2 items-center'>
              <p>Joining</p>
              <p>01/07/2023</p>
            </div>
            <Divider type="vertical" />
            <div className='flex flex-col gap-2 items-center'>
              <p>Date of birth</p>
              <p>04/21/1996</p>
            </div>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <Button
              className="border-0 light-blue-bg-color text-info-color-dark"
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