import React, { useState } from 'react'
import { UserAvatar } from '../../assets/images'
import { DropDown } from '../../components'
import { StarFilledIcon } from '../../assets/images'
import "./style.scss"


const IndividualDetails = () => {

    const [value, setValue] = useState('');


    return (
        <div className='details-wrapper p-[20px] '>
            <div className="user-info">
                <img src={UserAvatar} />
                <p className='user-name'></p>

            </div>
            <div className="flex gap-3 -[]" >
                <DropDown name={<StarFilledIcon/>}  value={value} setValue={setValue} options={['Template 01', 'Template 02', 'Template 03']}></DropDown>
                <DropDown name={<p>Advance</p>}></DropDown>
                                

            </div>

            <div className="apllied-for">
                <p>Apllied For</p>

            </div>
            
            <div>
                <p className='capitalize'></p>
                <div className='flex items-center justify-center rounded-full '>
                    {[1, 2, 3, 4, 5, 6].map((val) => (
                        <p key={val} className="stage-apply">{val}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default IndividualDetails
