import React from 'react'
import { NavLink } from 'react-router-dom'
import { ReportViewDetails, DownloadIconLeave, SettingHorizontalLine, GrievancesAvater } from '../../../../assets/images'
import { BoxWrapper, PageHeader, SearchBar } from '../../../../components'
import { Divider, Typography, Row, Col,} from 'antd'
import './style.scss'
import DropDownForSetting from '../../../../components/Setting/Common/CustomSettingDropdown'
import CustomDropDownReport from './customDropDown'


let overview = [
  { id:4,
    name: "Self Assessment 4",
    image: <ReportViewDetails />,
    date: "October 2022",
  },
  { id:3,
    name: "Self Assessment 3",
    image: <ReportViewDetails />,
    date: "September 2022",
  },
  {id:2,
    name: "Self Assessment 2",
    image: <ReportViewDetails />,
    date: "Augest 2022",
  },
  {id:1,
    name: "Self Assessment 1",
    image: <ReportViewDetails />,
    date: "july 2022",
  },


];
const index = () => {
  const handleChange = () => {
  }
  return (
    <div>
      <PageHeader title={<> Mino Mrina {<span className='inline-block align-middle mx-2'><SettingHorizontalLine className="" /></span>}
        <NavLink to="/report">
          <span className='text-base font-medium dashboard-primary-color' >Report</span>
        </NavLink>  </>} />
      <Divider />
      <div className="flex justify-between">
        <div><SearchBar size="middle" handleChange={handleChange} /></div>
        <div className='flex items-center justify-between drop-down-wrapper'>
          <div className='mr-[-5px]'><DownloadIconLeave /></div>
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
                      {data.name}
                    </Typography>
                    </div>
                    <span className='text-xl lg:text-2xl font-semibold py-2'>{data.date}</span>
                    <div>
                    <GrievancesAvater className='w-[48px] px-2' /> 
                     <span>Jessica Alba</span>
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

