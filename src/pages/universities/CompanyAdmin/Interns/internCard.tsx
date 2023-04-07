import React from 'react'
import { Row, Avatar, Typography, Dropdown , Col} from 'antd'
import { InternCardLine, ThreeDots } from '../../../../assets/images'
import { BoxWrapper, Button} from '../../../../components'
import './style.scss'
interface IDUMMYDATA {
  dummyData?: any
  menu?: any
  index?: any
}

const InternCard = (props: IDUMMYDATA) => {
  const { index, dummyData, menu } = props;
  return (
    <div className='university-intern-card'>
      <Row gutter={[16, 16]} >
        {dummyData.map((item: any) => {
          return (
            <Col  className="shs-col-5"  >
            <BoxWrapper className=" card  ">
              <div className="items-center gap-2 w-full">
                <div className='flex w-full justify-between'>
                  <span className={`rounded-md text-white text-sm h-[28px] p-1 font-normal ${item.status === 'Employed' ? 'Employed' :
                    item.status === 'Completed' ? 'Completed' : item.status === 'Terminated' ? 'Terminated' : item.status === 'Resolved' ? 'resolved' : ''} `} >
                    {item.status}
                  </span>
                  <Avatar
                    size={48}
                    src={item.avatar}
                  />
                  <Dropdown
                    overlay={menu}
                    trigger={['click']}
                    placement="bottomRight"
                    className="attendance-menu"
                  >
                    <ThreeDots className="cursor-pointer" />
                  </Dropdown>
                </div>
                <Typography className='text-center pt-5 text-2xl font-medium'>
                  {item.name}
                </Typography>
                <Typography className='text-center pb-5 text-2xl font-normal text-sm'>
                  {item.department}
                </Typography>
                <div className='rounded-lg card-box flex  justify-between p-1 mt-3 mb-5 '>
                  <div className='w-full '>
                    <Typography className='text-center text-[#A0A3BD] text-sm py-1'>
                      Joining
                    </Typography>
                    <Typography className='text-center text-sm'>
                      {item.joiningDate}
                    </Typography>
                  </div>
                  <InternCardLine className='w-[2px]' />
                  <div className='w-full '>
                    <Typography className='text-sm text-center text-[#A0A3BD] py-1'>
                      Date of birth
                    </Typography>
                    <Typography className=' text-center text-sm'>
                      {item.dateOfBirth}
                    </Typography>
                  </div>
               
                </div>
                <div className='flex justify-between my-4 w-full'>
                  <Button label='Profile'  size='small'  className='intern-card-profile-button ' />
                  <Button label="Chat" size='small' className='intern-card-chat-button'/> 
                  </div>
              </div>
            </BoxWrapper>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default InternCard