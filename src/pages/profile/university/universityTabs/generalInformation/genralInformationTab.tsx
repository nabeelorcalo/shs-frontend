import dayjs from 'dayjs';
import { Row, Col, Divider } from "antd";

const GenralInformationTab = (props: any) => {
    const { info } = props;

    const academicDetails = [
        { title: "University", value: info?.university ? info?.university : "N/A" },
        { title: "Course", value: info?.course ? info?.course : "N/A" },
        { title: "University Email", value: info?.universityEmail ? info?.universityEmail : "N/A" },
        { title: "Post Code", value: info?.universityPostcode ? info?.universityPostcode : "N/A" },
        { title: "Address", value: info?.universityAddress ? info?.universityAddress : "N/A" },
        { title: "City", value: info?.universityCity ? info?.universityCity : "N/A" },
        { title: "Country", value: info?.universityCountry ? info?.universityCountry : "N/A" },
        { title: "University Contact Name", value: info?.universityContactName ? info?.universityContactName : "N/A" },
        { title: "University Contact Phone", value: info?.universityContactNo ? info?.universityContactNo : "N/A" },
        { title: "Internship Start Date", value: info?.internshipStartDate ? dayjs(info?.internshipStartDate).format("DD/MM/YYYY") : "N/A" },
        { title: "Internship End Date", value: info?.internshipEndDate ? dayjs(info?.internshipEndDate).format("DD/MM/YYYY") : "N/A" },
        { title: "Internship Duration", value: info?.internshipDuration ? info?.internshipDuration : "N/A" },
        { title: "Loan Details", grid: 24, value: info?.loanDetails ? info?.loanDetails : "N/A" },
        { title: "Work History", grid: 24, value: info?.workHistory ? info?.workHistory : "N/A" },
    ];

    const bankDetails = [
        { title: "Name", value: "HSBC Holdings" },
        { title: "Phone", value: "Maria Sanoid" },
        { title: "Relationship", value: "002-0805412-003" },
        { title: "Street", value: "263 Eversholt" },
        { title: "City", value: "London" },
        { title: "Post Code", value: "SG12 1HW" },
    ];
    const emergencyContact = [
        { title: "Name", value: info.emergencyContactName ? info.emergencyContactName : "N/A" },
        { title: "Phone", value: info.emergencyContactPhoneNumber ? info.emergencyContactPhoneNumber : "N/A" },
        { title: "Relationship", value: info.emergencyContactRelationship ? info.emergencyContactRelationship : "N/A" },
        { title: "Street", value: info.emergencyContactAddress ? info.emergencyContactAddress : "N/A" },
        { title: "City", value: info.emergencyContactCity ? info.emergencyContactCity : "N/A" },
        { title: "Post Code", value: info.emergencyContactPostCode ? info.emergencyContactPostCode : "N/A" },
        { title: "Country", value: info.emergencyContactCountry ? info.emergencyContactCountry : "N/A" },

    ]
    return (
        <div>
            <p className="text-primary-color font-semibold text-xl mb-4">Academic Details</p>
            <Row gutter={[30, 20]}>
                {academicDetails?.map((item: any) => (
                    <Col md={item?.grid ?? 8} sm={12} xs={24} key={item.id}>
                        <div className="personal-information-wrap text-primary-color">
                            <h2 className="m-0 text-base  title font-medium">{item?.title}</h2>
                            <p className="m-0 text-teriary-color text-lg">{item?.value}</p>
                        </div>
                    </Col>
                ))}
            </Row>

            <Divider type="horizontal" />

            <p className="text-primary-color font-semibold text-xl mb-4">Bank Details</p>
            <Row gutter={[30, 20]}>
                {bankDetails?.map((item: any) => (
                    <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.id}>
                        <div className="personal-information-wrap ">
                            <h2 className="m-0 text-base  title font-medium title">{item?.title}</h2>
                            <p className="m-0 text-teriary-color text-lg">{item?.value}</p>
                        </div>
                    </Col>
                ))}
            </Row>

            <Divider type="horizontal" />

            <p className="text-primary-color font-semibold text-xl mb-4">Emergency Contact</p>
            <Row gutter={[30, 20]}>
                {emergencyContact?.map((item: any) => (
                    <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item?.id}>
                        <div className="personal-information-wrap ">
                            <h2 className="m-0 text-base title font-medium title">{item?.title}</h2>
                            <p className="m-0 text-teriary-color text-lg">{item?.value}</p>
                        </div>
                    </Col>
                ))}
            </Row>

        </div>
    )
}

export default GenralInformationTab