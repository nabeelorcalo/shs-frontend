import React, { useState } from 'react'
import Avatar1 from '../../assets/images/avatar1.png'
import { DropDown } from '../../components'
import { StarFilledIcon } from '../../assets/images'
import "./style.scss"
import Dot from "../../assets/images/dot.png"
import Mail from "../../assets/images/mail.png"
import Call from "../../assets/images/call.png"
import Loacation from "../../assets/images/location.png"
import Intro from "../../assets/images/intro-pic.png"
import PlayIcon from "../../assets/images/play-icon.png"
import DropDownNew from '../../components/Dropdown/DropDownNew'
import Applied from "../../assets/images/apllied-icon.png"
import Interviewed from "../../assets/images/interviewed-icon.png"
import Recommended from "../../assets/images/recommended.png"
import OfferLetter from "../../assets/images/offer-leteer.png"
import Contract from "../../assets/images/contract.png"
import Rejected from "../../assets/images/rejected.png"





const IndividualDetails = () => {

    const skillsData = ['User Interface Design', 'Illustrator', 'Documentation', 'Visual Design', 'Sketch', 'UX Strategy', 'Web Design'];

    const newSkillData = skillsData.slice(0, 6);

    const userinfoData = [
        { img: Mail, title: "phyliis@gmail.com" },
        { img: Call, title: "+44 7700 900077" },
        { img: Loacation, title: "263 Eversholt St, London NW11NB UK" },
    ]

    const dropdownData = [
        { heading: 'Current Stage' },
        { title: 'Offer Letter', color: '' },
        { heading: 'Move to' },
        { title: 'Interviewed', color: '' },
        { title: 'Recommended', color: '' },
        { title: 'OfferLetter', color: '' },
        { title: 'Contract', color: '' },
        { title: 'Rejected', color: '' },

    ]

    return (
        <div className='details-wrapper p-[5px] pr-[25px] '>

            <div className="user-info-main">
                <div className="user-info">
                    <img className='image' src={Avatar1} />
                    <p className='user-name'>Phylis Godley</p>
                </div>

                <div className="dropdown-wrapper flex gap-3">
                    <div className="flex advance-dropdown ">

                        <DropDownNew items={[{
                            label: <div>
                            </div>, key: ''
                        }]}>
                            <div className='flex justify-center items-center'></div>
                        </DropDownNew>

                    </div>
                    <div className="flex advance-dropdown ">
                        <DropDownNew items={[{
                            label: <div>
                                {dropdownData.map((data, i) => (
                                    <div key={i}>
                                        {data.heading ? <p>{data.heading}</p> :
                                            <p><span className='w-[10px] h-[10px] rounded-full' style={{ background: 'red' }}></span> {data.title}</p>
                                        }
                                    </div>
                                ))
                                }
                            </div>, key: ''
                        }]}>
                            <div className='flex justify-center items-center'>Advance</div>
                        </DropDownNew>

                    </div>
                </div>

            </div>

            <div className="apllied-for">
                <p className='heading'>Apllied For</p>
                <div className="details">
                    <p className='p'>UI UX Designer</p>
                    <p className='p1'>Full Time <img src={Dot} alt="" /> 10 Nov 2022 </p>
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
                        <div ><img src={info.img} alt="" width={24} /></div>
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
                    <img src={PlayIcon} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]' alt="" />
                    <img src={Intro} alt=""
                    />
                </div>
            </div>
        </div>
    )
}

export default IndividualDetails
