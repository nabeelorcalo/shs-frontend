import React, { useState } from 'react';
import { Rate } from 'antd';
import { Terrible, Sad, Neutral, Happy, Awesome } from '../../assets/images';





const EmojiMoodRating = ({ title }) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <p className="text-lg">{title}</p>
            <div>
                <div className="flex flex-row justify-evenly">
                    <a className='text-[#363565]'>
                        <div className='flex flex-col gap-3 items-center'>
                            <Terrible style={{fontSize:'56px'}}/>
                            <p>Terrible</p>
                        </div>
                    </a>
                    <a className='text-[#363565]'>
                        <div className='flex flex-col gap-3 items-center'>
                            <Sad />
                            <p>Sad</p>
                        </div>
                    </a>
                    <a className='text-[#363565]'>
                        <div className='flex flex-col gap-3 items-center'>
                            <Neutral/>
                            <p>Neutral</p>
                        </div>
                    </a>
                    <a className='text-[#363565]'>
                        <div className='flex flex-col gap-3 items-center'>
                            <Happy/>
                            <p>Happy</p>
                        </div>
                    </a>
                    <a className='text-[#363565]'> 
                        <div className='flex flex-col gap-3 items-center'>
                            <Awesome/>
                            <p>Awesome</p>
                        </div>
                    </a>

                </div>

            </div>
        </div>
    )
}

export default EmojiMoodRating