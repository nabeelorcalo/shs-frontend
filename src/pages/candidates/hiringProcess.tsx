import { useState } from 'react'
import { Col, Row } from 'antd/es/grid'
import { Input } from 'antd'
import HiringPipeline from '../../components/HiringPIpeline/hiringPipeline'
import DocAvatar from "../../assets/images/doc-avatar.png"
import BtnIcon from "../../assets/images/Button-icon.png"
import RejectModal from './RejectModal'
import DropDownNew from '../../components/Dropdown/DropDownNew'
import { ArrowDownDark, UserAvatar } from '../../assets/images'
import { SearchBar } from '../../components'

const detailsData = [
  { title: 'Source', value: 'Career Website' },
  { title: 'Owner', value: 'David Miler', image: DocAvatar },
  { title: 'Internship Type', value: 'Paid' },
  { title: 'Applied Date', value: '04/12/1996' },
  {
    title: 'Assignee', userData: [
      {
        userImg: UserAvatar,
        userName: 'john doe'
      },
      {
        userImg: UserAvatar,
        userName: 'mina marino'
      },
      {
        userImg: UserAvatar,
        userName: 'clark'
      },
      {
        userImg: UserAvatar,
        userName: 'sarah joe'
      },
    ]
  }

]
const HiringProcess = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ userImg: UserAvatar, userName: 'amelia clark' });

  return (
    <div className="hiring-wrapper">
      <div className='hiring flex flex-wrap justify-between'>
        <div>
          <p className='heading mt-5'>UI UX Designer</p>
        </div>
        <div className="rej-mov mt-4 gap-2 flex">
          <button onClick={() => setOpen(true)} className='rej-btn cursor-pointer'> Reject </button>
          <RejectModal setOpen={setOpen} open={open} />
          <button className='move-btn'>Move</button>
        </div>
      </div>

      <div className="pipeline mt-10">
        <HiringPipeline hiringList={['applied']} />
      </div>

      <div className="details mt-7 ">
        <div className="heading">
          <p>Details</p>
        </div>
        <div className='mt-3'>
          <Row gutter={[30, 35]}>
            {detailsData.map((item: any) => (
              <Col xl={8} lg={8} md={8} sm={12} xs={24} >
                <div className='asignee-wrap'>
                  <h2 className='m-0 font-medium text-base title'>{item.title}</h2>
                  {item.title === 'Assignee' ? 
                  <DropDownNew
                    placement={'bottomRight'}
                    items={[
                      { label: <SearchBar handleChange={() => { }} />, key: 'search' },
                      {
                        label: <div>{item.userData.map((users: any) => (
                          <div className="flex items-center gap-3 mb-[20px]"
                            onClick={() => setUser(users)}
                          >
                            <img src={users.userImg}
                              className='h-[24px] w-[24px] rounded-full object-cover'
                            />
                            <p>{users.userName}</p>
                          </div>))}
                        </div>,
                        key: 'users'
                      }]}>
                    <div className="drop-down-with-imgs flex items-center gap-3">
                      <div className="flex items-center gap-3 mr-[40px]">
                        <img src={user.userImg} />
                        <p>{user.userName}</p>
                      </div>
                      <ArrowDownDark />
                    </div>
                  </DropDownNew>
                    :
                    <div className={`flex ${item.title === 'Owner' ? 'gap-2' : ''}`}>
                      {item.image && <img src={item.image} alt="" />}
                      <p className='m-0'>{item.value}</p>
                    </div>
                  }
                </div>
              </Col>
            ))}
          </Row>

        </div>
      </div>

      <div className="cmnt-wrapper mt-8">
        <p className='heading'>Comments</p>
      </div>

      <div className='Comments flex justify-between mt-6'>
        <div className="icon ">
          <img className='h-[48px] w-[48px]' src={DocAvatar} alt="icon" />
        </div>

        <div className="Input">
          <Input className='ant-inp' placeholder='Write anything here...'>
          </Input>
        </div>

        <button className='btn-icon'>
          <img src={BtnIcon} alt="btn-icon" />
        </button>

      </div>

      <div className="avatar flex items-center gap-3 mt-6">
        <img src={DocAvatar} alt="doc-avatar" />
        <div className="text">
          <div className='flex gap-3'>
            <p className='font-medium'>Albert John</p>
            <p className='mt-1 txt-p'>15.45 . 10 Nov 2022</p>
          </div>
          <p>I have interviewed the candidate and I recommend her to be added as part of design team.</p>
        </div>
        <div>

        </div>
      </div>


    </div>
  )
}

export default HiringProcess
