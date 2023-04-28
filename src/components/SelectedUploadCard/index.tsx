import { CloseCircleFilled } from '@ant-design/icons'
import React from 'react'
import { DocumentCardIcon, DocImage } from '../../assets/images'

const SelectedUploadCard = ({ filename, filesize, idx, handleDelete }: any) => {

    const extension = filename.slice(-3)
    console.log(extension)
    return (
        <div className="flex w-6/12 ">
            <div className=' flex flex-row justify-between items-center m-1 w-full px-2 py-2  rounded bg-[#E6F4F9]'>
                <div className='flex flex-row gap-2 items-center'>
                    <div>
                        {
                            extension === "pdf" ?
                                <DocumentCardIcon style={{ fontSize: '42px' }} /> :
                                extension === "ocx" ?
                                    <img src={DocImage} alt="" width='46px' />
                                    : null
                        }
                    </div>
                    <div className='flex flex-col justify-evenly gap-2'>
                        <div className='text-md'>{filename}</div>
                        <div className="text-sm">{filesize} MB</div>
                    </div>
                </div>
                <div>
                    <CloseCircleFilled onClick={() => { handleDelete(idx) }} />
                </div>
            </div>
        </div>

    )
}

export default SelectedUploadCard