import dayjs from 'dayjs';
import React from 'react'
import { Row, Col, Divider } from "antd";

const GenralInformationTab = (props: any) => {
    const { University,
        lastName,
        avatar,
        gender,
        DOB,
        phoneNumber,
        veriffStatus,
        postCode,
        email,
        address,
        country,
        city,
    } = props;

    const PersnolInformationData = [
        { title: "University", value: "Imperial College London" },
        { title: "Course", value: "Creative Design" },
        { title: "University Email", value: "maria.sanoid@icl.co.uk" },
        { title: "Post Code", value: "SG12 1HW" },
        { title: "Address", value: "263 Eversholt" },
        { title: "City", value: "London" },
        { title: "Country", value: "United Kingdom" },
        { title: "University Contact Name", value: "Albert John" },
        { title: "University Contact Phone", value: "+44 20 7589 5111" },
        { title: "Post CodeInternship Start Date", value: dayjs("01/01/2022").format("DD MMMM, YYYY") },
        { title: "Internship End Date", value: dayjs("01/01/2022").format("DD MMMM, YYYY") },
        { title: "Internship Duration", value: "12 months" },
        { title: "Loan Details", value: "Plan 1 – the thresholds are £388 a week or £1682 a month (before tax and other deductions)s" },
        { title: "Work History", value: "Worked with an organisation in last 6 months" },
    ];

    const Address = [
        { title: "Name", value: "HSBC Holdings" },
        { title: "Phone", value: "Maria Sanoid" },
        { title: "Relationship", value: "002-0805412-003" },
        { title: "Street", value: "263 Eversholt" },
        { title: "City", value: "London" },
        { title: "Post Code", value: "SG12 1HW" },
    ];
    const countryData = [
        { title: "Country", value: "United Kingdom" },

    ]
    return (
        <div>
            <p className="text-primary-color font-semibold text-xl mb-4">Academic Details</p>
            <Row gutter={[30, 20]}>
                {PersnolInformationData.map((item: any) => (
                    <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                        <div className="personal-information-wrap text-primary-color">
                            <h2 className="m-0 text-base  title font-medium">{item.title}</h2>
                            <p className="m-0 text-teriary-color text-lg">{item.value}</p>
                        </div>
                    </Col>
                ))}
            </Row>
            <Divider type="horizontal" />
            <Row gutter={[30, 20]}>
                {Address.map((item: any) => (
                    <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                        <div className="personal-information-wrap ">
                            <h2 className="m-0 text-base  title font-medium title">{item.title}</h2>
                            <p className="m-0 text-teriary-color text-lg">{item.value}</p>
                        </div>
                    </Col>
                ))}
            </Row>
            <Divider type="horizontal" />

            <Row gutter={[30, 20]}>
                {countryData.map((item: any) => (
                    <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
                        <div className="personal-information-wrap ">
                            <h2 className="m-0 text-base title font-medium title">{item.title}</h2>
                            <p className="m-0 text-teriary-color text-lg">{item.value}</p>

                        </div>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default GenralInformationTab