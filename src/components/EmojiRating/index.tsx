import React, { useState } from 'react';
import { Rate } from 'antd';
import { Emoji1st, Emoji2nd, Emoji3rd, Emoji4th, EmojiGray1st, EmojiGray2nd, EmojiGray3rd, EmojiGray4th } from '../../assets/images';


const desc = ['Unsatisfactory', 'Still Learning', 'Meeting Expectations', 'Exceeding Expectations'];


const EmojiRating = ({title}) => {
    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const [hover3, setHover3] = useState(false)
    const [hover4, setHover4] = useState(false)
    return (
        <div className="w-5/12">
            <p>{title}</p>
            <div>
            <div className="flex gap-4 justify-between">
                <a onClick={()=>{ setHover1(!hover1);console.log(hover1)}} > {hover1?<Emoji1st/>:<EmojiGray1st/>} </a>
                <a onClick={()=>{ setHover2(!hover2);console.log(hover2)}} > {hover2?<Emoji2nd/>:<EmojiGray2nd/>} </a>
                <a onClick={()=>{ setHover3(!hover3);console.log(hover3)}} > {hover3?<Emoji3rd/>:<EmojiGray3rd/>} </a>
                <a onClick={()=>{ setHover4(!hover4);console.log(hover4)}} > {hover4?<Emoji4th/>:<EmojiGray4th/>} </a>
            </div>

            </div>
        </div>
    )
}

export default EmojiRating
