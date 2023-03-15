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
        color: "#D2D6DC"


    }, {
        title: "Recommended",
        value: "0",
        color: "#D2D6DC"


    }, {
        title: "Offer Letter",
        value: "0",
        color: "#D2D6DC"

    }, {
        title: "Contract",
        value: "0",
        color: "#D2D6DC"

    }, {
        title: "Hired",
        value: "0",
        color: "#D2D6DC"

    }, {
        title: "Rejected",
        value: "0",
        color: "#D2D6DC"

    }
]
const HiringPipeline = () => {

    return (

        <div className='pipeline-wrapper'>
            {Array.map((item: any) => (
                <>
                    <div  style={{ backgroundColor: item.color }} className={` para  ${item?.title === "Applied" ? "hiringPipeline " : "hiringPipeline2 hiringPipeline"} `}>
                        <span >{item.title}</span>
                    </div>
                </>
            ))
            }
        </div >
    )
}

export default HiringPipeline

