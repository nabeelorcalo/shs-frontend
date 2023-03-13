import { Input } from 'antd'
import React from 'react'
import { UserAvatar } from '../../assets/images'
import { DropDown } from '../../components'

const IndividualDetails = () => {
    return (
        <div className='details-wrapper p-[20px] '>
            <div className="user-info">
                <img src={UserAvatar} />
                <p className='user-name'></p>

            </div>
            <div className="flex">
                <DropDown name={<p>fsdfsdf</p>} />
                <DropDown />
            </div>
        </div>
    )
}

export default IndividualDetails
