import React, { useState } from 'react'
import { UserAvatar } from '../../assets/images'
import { DropDown } from '../../components'
import { StarFilledIcon } from '../../assets/images'


const IndividualDetails = () => {

    const [value, setValue] = useState('');


    return (
        <div className='details-wrapper p-[20px] '>
            <div className="user-info">
                <img src={UserAvatar} />
                <p className='user-name'></p>

            </div>
            <div className="flex gap-3">
                <DropDown name={<StarFilledIcon/>}  value={value} setValue={setValue} options={['Template 01', 'Template 02', 'Template 03']}></DropDown>
                <DropDown name={<p>Advance</p>}></DropDown>

            </div>
            <div className="stage">
                
            </div>
        </div>
    )
}

export default IndividualDetails
