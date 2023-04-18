import React from 'react'
import { ReportViewDetails, DownloadIconLeave, GrievancesAvater } from '../../../../assets/images'
import { BoxWrapper, Breadcrumb, Notifications, SearchBar } from '../../../../components'
import { Divider, Typography, Row, Col, } from 'antd'
import './style.scss'
import useCustomHook from './actionHandler'
import CustomDropDownReport from './customDropDown'
import { ROUTES_CONSTANTS } from '../../../../config/constants'

const index = () => {
  let overview = [
    {
      id: 4,
      assessmentName: "Self Assessment 4",
      image: <ReportViewDetails />,
      date: "October 2022",
      name: "Jessica Alba",
      profile: <GrievancesAvater className='w-[48px] px-2' />
    },
    {
      id: 3,
      assessmentName: "Self Assessment 3",
      image: <ReportViewDetails />,
      date: "September 2022",
      name: "Jessica Alba",
      profile: <GrievancesAvater className='w-[48px] px-2' />
    },
    {
      id: 2,
      assessmentName: "Self Assessment 2",
      image: <ReportViewDetails />,
      date: "Augest 2022",
      name: "Jessica Alba",
      profile: <GrievancesAvater className='w-[48px] px-2' />
    },
    {
      id: 1,
      assessmentName: "Self Assessment 1",
      image: <ReportViewDetails />,
      date: "july 2022",
      name: "Jessica Alba",
      profile: <GrievancesAvater className='w-[48px] px-2' />
    },
  ];
  const TableColumn = ['Assessment Name', ' Profile', 'Name', 'Date']
  const action = useCustomHook();
  const breadcrumbArray = [
    { name: "Mino Mrina" },
    { name: "report", onClickNavigateTo: `/${ROUTES_CONSTANTS.REPORT} ` },

  ];
  const handleChange = () => {
  }

  return (
    <div className='view-details-university-rep'>
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <div className="flex justify-between">
        <div><SearchBar size="middle" handleChange={handleChange} /></div>
        <div className='flex items-center justify-between drop-down-wrapper'>
          <div className='mr-[-5px]'
            onClick={() => {action.downloadPdfOrCsv(event, TableColumn, overview, "Performance Report ")
            Notifications({title:"Success", description:"Assessment Form list downloaded ",type:'success'})}}  >
            <DownloadIconLeave />
          </div>
        </div>
      </div>
      <Row gutter={[30, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={24} lg={12} xl={8} xxl={6}>
              <BoxWrapper>
                <div className="flex justify-between">
                  <div className='flex flex-col'>
                    <div className='flex'>
                      <span> {data.image}</span>
                      <Typography className="pt-3 pl-2 m-0">
                        {data.assessmentName}
                      </Typography>
                    </div>
                    <span className='text-xl lg:text-2xl font-semibold py-2'>{data.date}</span>
                    <div>
                      {data.profile} <span>{data.name}</span>
                    </div>
                  </div>
                  <div className="float-right place-items-end cursor-pointer ">
                    <CustomDropDownReport
                      data={data.id}
                    />
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          );
        })}
      </Row>

    </div>
  )
}

export default index

