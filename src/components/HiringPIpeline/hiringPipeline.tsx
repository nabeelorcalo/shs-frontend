import React from 'react'
import "./Pipeline.scss"

const Array = [
    {
        title: "Applied",
        value: "0",
        color: "#363565"
    }, {
        title: "Interviewed",
        value: "0",
        color: "#5879CE"


    }, {
        title: "Recommended",
        value: "0",
        color: "#CC7FD4"


    }, {
        title: "Offer Letter",
        value: "0",
        color: "#C0ACFF"

    }, {
        title: "Contract",
        value: "0",
        color: "#9FBC95"

    }, {
        title: "Hired",
        value: "0",
        color: "#4A9D77"

    }, {
        title: "Rejected",
        value: "0",
        color: "#E94E5D"

    }
]
const HiringPipeline = () => {

    return (

        <div className='pipeline-wrapper'>
            {Array.map((item: any) => (
                <>
                    <div style={{ backgroundColor: item.color }} className={`${item?.title === "Applied" ? "hiringPipeline " : "hiringPipeline2 hiringPipeline"} `}>
                        <p className='para'>{item.title}</p>

                    </div>
                </>
            ))
            }
        </div >
    )
}

export default HiringPipeline

