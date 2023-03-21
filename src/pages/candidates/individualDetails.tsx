import { Rate } from 'antd'
import "./style.scss"
import { ArrowDownDark, StarFilledIcon, Dot, Mail, Call, Location, Intro, PlayIcon, DrawerIcon, StarOutlinedIcon } from '../../assets/images'
import DropDownNew from '../../components/Dropdown/DropDownNew'
import { useState } from 'react'

const IndividualDetails = () => {

  const [rate, setRate] = useState(0);

  const skillsData = [
    'User Interface Design',
    'Illustrator',
    'Documentation',
    'Visual Design',
    'Sketch',
    'UX Strategy', 'Web Design'
  ];
  const newSkillData = skillsData.slice(0, 6);

  const userinfoData = [
    { img: Mail, title: "phyliis@gmail.com" },
    { img: Call, title: "+44 7700 900077" },
    { img: Location, title: "263 Eversholt St, London NW11NB UK" },
  ]

  const dropdownData = [
    { heading: 'Current Stage' },
    { title: 'Applied', color: '#363565' },
    { heading: 'Move to' },
    { title: 'Interviewed', color: '#5879CE' },
    { title: 'Recommended', color: '#CC7FD4' },
    { title: 'OfferLetter', color: '#C0ACFF' },
    { title: 'Contract', color: '#4A9D77' },
    { title: 'Rejected', color: '#E94E5D' },

  ]

  return (
    <div className='details-wrapper p-[5px] pr-[25px]'>

      <div className="user-info-main">
        <div className="user-info">
          <DrawerIcon />
          <p className='user-name'>Phylis Godley</p>
        </div>

        <div className="dropdown-wrapper flex gap-3">
          <div className="flex advance-dropdown ">

            <DropDownNew items={[{
              label: <div className='flex gap-4'>
                {[1, 2, 3, 4, 5].map((val) => rate === val ?
                  <StarFilledIcon key={val} /> :
                  <StarOutlinedIcon key={val} onClick={() => setRate(val)} />
                )}
              </div>,
              key: ''
            }]}>
              <div className='flex justify-center gap-2 items-center dropdown-inpp cursor-pointer'>
                <StarFilledIcon />
                <p>{rate}</p>
                <ArrowDownDark />
              </div>
            </DropDownNew>

          </div>
          <div className="flex advance-dropdown ">
            <DropDownNew items={[{
              label: <div>
                {dropdownData.map((data, i) => (
                  <div key={i}>
                    {data.heading ? <p className='heading'>{data.heading}</p> :
                      <p className='flex flex-wrap gap-5 h-10 mt-3' >
                        <span style={{ backgroundColor: data?.color }} className='w-[10px] h-[10px] mt-2 rounded-full'></span>
                        <span className='flex mt-0'>{data.title}</span>
                      </p>
                    }
                  </div>
                ))
                }
              </div>, key: ''
            }]}>
              <div className='flex justify-center items-center advance-inp cursor-pointer gap-3'>
                <span>Advance</span>
                <ArrowDownDark />
              </div>
            </DropDownNew>

          </div>
        </div>

      </div>

      <div className="apllied-for">
        <p className='heading'>Apllied For</p>
        <div className="details">
          <p className='p'>UI UX Designer</p>
          <p className='p1'>Full Time <Dot /> 10 Nov 2022 </p>
        </div>

      </div>

      <div className='stage-main'>
        <p className='capitalize stage-para'>Stage</p>
        <div className='flex items-center justify-center rounded-full '>
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <p key={val} className="stage-apply flex items-center justify-center">{val}</p>
          ))}
        </div>
      </div>

      <div className="contact pt-4">
        {userinfoData.map((info, i) => (
          <div className="message flex items-center gap-5 my-3" key={i}>
            <div ><info.img width={24} /></div>
            <p className='m-0'>{info.title}</p>
          </div>
        ))}
      </div>

      <div className="skills-main">
        <p className='heading mt-8 mb-4'>Skills</p>
        <div className="skills flex items-center flex-wrap gap-2 ">
          {newSkillData.map((skill, i) => (
            <p key={i} className='rounded-[14px] py-[5px] px-[18px] skill-text'>{skill}</p>
          ))
          }
          {<p className='plus rounded-[14px] py-[2px] px-[12px]'>+{skillsData.length - newSkillData.length}</p>}
        </div>
      </div>

      <div className="intro">
        <p className='heading mt-8'>Intro</p>
        <div className="image mt-[10px] relative">
          <PlayIcon className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' />
          <Intro />
        </div>
      </div>
    </div>
  )
}

export default IndividualDetails
