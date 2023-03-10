import { CloseCircleFilled } from '@ant-design/icons'
import React from 'react'
import { DocumentCardIcon } from '../../assets/images'

const SelectedUploadCard = ({ filename, filesize }: any) => {
    return (
        <div className="flex w-6/12 ">
            <div className=' flex flex-row justify-between items-center m-1 w-full px-2 py-2  rounded bg-[#E6F4F9]'>
                <div className='flex flex-row gap-2 items-center'>
                    <div>
                        <DocumentCardIcon style={{fontSize:'42px'}} />
                    </div>
                    <div className='flex flex-col justify-evenly gap-2'>
                        <div className='text-sm'>{filename}</div>
                        <div className="text-sm">{filesize}</div>
                    </div>
                </div>
                <div>
                    <CloseCircleFilled onClick={()=>{console.log("deleted")}} />
                </div>
            </div>
        </div>

    )
}

export default SelectedUploadCard