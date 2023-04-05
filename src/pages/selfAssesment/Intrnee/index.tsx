import { Col, Divider, Row } from 'antd'
import { Likeshapethumbicon, } from '../../../assets/images'
import { Button, FiltersButton, PageHeader, SearchBar } from '../../../components'
import { ROUTES_CONSTANTS } from '../../../config/constants'
import AssessmentCard from '../../../components/AssessmentCard/AssessmentCard'
import { useState } from 'react'
import { assesmentMock } from './internMockData'
import { useNavigate } from 'react-router-dom'
import DrawerComp from '../../../components/DrawerComp'
import { CloseCircleFilled } from '@ant-design/icons'
import SelfAssesmentFilterForm from './selfAssesmentFilterForm'
import "./style.scss"

const Internee = () => {
  const navigate = useNavigate()
  const [openDrawer, setOpenDrawer] = useState(false);
  const [data, setData] = useState(assesmentMock)

  return (
    <div className='self_assesment_main'>
      <PageHeader
        bordered
        title="Self Assessment"
      >
      </PageHeader>
      <Row className=' items-center' gutter={[20, 20]}>
        <Col xs={24} md={24} lg={6}>
          <SearchBar className="SearchBar" handleChange={(e: any) => { console.log(e); }} />
        </Col>
        <Col xs={24} md={24} lg={18} >
          <div className='flex items-center lg:justify-end view_history_button_wrapper'>
            <div className="mr-4">
              <FiltersButton
                label="Filters"
                onClick={() => setOpenDrawer(true)}
              />
            </div>
            <Button
              icon={<Likeshapethumbicon className="mr-1" />}
              label="New Assessment"
              onClick={() => navigate(`/${ROUTES_CONSTANTS.SELF_ASSESSMENT_Form}`)}
              size="middle"
              className="self_assesment"
            />
          </div>
        </Col>
        <Col xs={24}>
          <Row gutter={[20, 20]}>
            {data.map((item: any) => (
              <Col xs={24} md={24} lg={12} xl={6} xxl={6} >
                <AssessmentCard
                  id={item.id}
                  title={item.title}
                  month={item.month}
                  year={item.year}
                  userName={item.userName}
                  userImg={item.userImg}
                  status={item.status}
                  handleMenuClick={() => { }}
                />
              </Col>
            ))}
          </Row>
        </Col>
        {/* <Divider /> */}
      </Row>
      {/* <Row gutter={[20, 20]}>
        {data.map((item: any) => (
          <Col md={8} lg={6}>
            <AssessmentCard
              id={item.id}
              title={item.title}
              month={item.month}
              year={item.year}
              userName={item.userName}
              userImg={item.userImg}
              status={item.status}
              handleMenuClick={() => { }}
            />
          </Col>
        ))}
      </Row> */}

      <DrawerComp
        title={"Filters"}
        open={openDrawer}
        className="Record_data"
        closeIcon={<CloseCircleFilled style={{ color: "#A3AED0", fontSize: '20px', right: "0" }} />}
        onClose={() => setOpenDrawer(false)}
      >
        <SelfAssesmentFilterForm />
      </DrawerComp>
    </div >

  )
}

export default Internee