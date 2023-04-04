import React from 'react'
import { Typography, Progress,Steps,Button  } from 'antd';
import '../style.scss';
import { VerifyIcon } from '../../../../assets/images';
import { InfoCircleFilled } from '@ant-design/icons';

const steps = [
    {
      title: "First",
      content: "First-content",
      key: 1
    },
    {
      title: "Second",
      content: "Second-content",
      key: 2
    },
    {
      title: "Last",
      content: "Last-content",
      key: 3
    }
  ];

const completionPercent = '25';
const ProfileCompletion = (props:any) => {
    return (
        <div className='profile-completion'>
            <div className='card-style'>
                <Typography className='main-title'>Profile Completion</Typography>
                <Typography className='percent'>{completionPercent}%</Typography>
                <Typography className='main-title pt-4'>of your profile is complete</Typography>
                <div className='pt-2 pb-2'>

                    <Progress percent={25} showInfo={false} strokeColor='#E94E5D' trailColor='#E6F4F9' strokeLinecap='round' />
                </div>
                <div className='steps-complet'>
                    <Typography className='step-desc'>Complete your profile to apply for jobs!</Typography>
                    <Typography className='step-detail'>Job search made easy with us!Go through
                        these simple steps of profile completion on our platform and apply for jobs with one click.</Typography>
                </div>
                <div>
                    <Steps
                        direction='vertical'
    items={[
      {
        title: (<span className='step-color'>Identity Verification</span>),
        status: 'finish',
        icon: <VerifyIcon/>,
      },
      {
        title: (<span className='step-color'>(<span className='step-color'>Identity Verification</span>)</span>),
        status: 'finish',
        icon: <VerifyIcon/>,
      },
      {
        title: (<span className='step-color'>University Details</span>),
        status: 'wait',
          icon: <InfoCircleFilled style={{fontSize:"20px", color:"#FFC15D"}} />,
      },
      {
        title:(<span className='step-color'>Identity Documents</span>),
        status: 'wait',
        icon: <InfoCircleFilled style={{fontSize:"20px", color:"#FFC15D"}} />,
      },
      {
        title: (<span className='step-color'>Address Details</span>),
        status: 'wait',
        icon: <InfoCircleFilled style={{fontSize:"20px", color:"#FFC15D"}} />,
      },
      {
        title: (<span className='step-color'>Profile Picture</span>),
        status: 'wait',
        icon: <InfoCircleFilled style={{fontSize:"20px", color:"#FFC15D"}} />,
      },
      {
        title: (<span className='step-color'>Introduction Video</span>),
        status: 'wait',
        icon: <InfoCircleFilled style={{fontSize:"20px", color:"#FFC15D"}} />,
      },
    ]}
  />
                </div>
                <div>
            <Button className='btn-veri' onClick={() => {
              props.setHide(false)
                    }}>Complete</Button>
                </div>
            </div>
        </div>
    )
}

export default ProfileCompletion