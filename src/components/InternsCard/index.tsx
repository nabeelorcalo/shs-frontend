import { Avatar, Button, Divider } from 'antd'
import { useNavigate } from 'react-router-dom'
import { BoxWrapper } from '../BoxWrapper/BoxWrapper'

export const InternsCard = () => {
  const navigate = useNavigate()
  return (
    <div className='w-80'>
      <BoxWrapper>
        <div className='flex flex-col gap-3 items-center  border border-[#243c5a]'>
          <Avatar src="https://joesch.moe/api/v1/random?key=1" />
          <div className='flex flex-col items-center'>
            <p className='text-lg'>Andrea Hiyahiya</p>
            <p className='text-sm'>Business Analyst</p>
          </div>
          <div className='flex flex-row gap-3 items-center border-2 border-indigo-600'>
            <div className='flex flex-col items-center'>
              <p>Joining</p>
              <p>01/07/2023</p>
            </div>
            <Divider type="vertical" />
            <div className='flex flex-col items-center'>
              <p>Date of birth</p>
              <p>04/21/1996</p>
            </div>
          </div>
          <div className='flex flex-row gap-3 items-center'>
            <Button onClick={() => { navigate("profile") }}>
              Profile
            </Button>
            <Button onClick={() => { navigate("chat") }}>
              Chat
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </div>
  )
}