import { Col, Row } from 'antd'
import StudentProfileSideBar from '../sidebar/studentProfileSideBar/StudentProfileSideBar'
import UniversityProfileTab from './universityProfileTab'
import { Breadcrumb } from '../../../../components'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import { useLocation } from 'react-router-dom'

const ProfileTabsMain = () => {
  const { state } = useLocation();
  const breadcrumbArray = [
    { name: ` ${state?.firstName} ${state?.lastName}` },
    { name: "Interns", onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNS}` },
  ];
  return (
    <>
      <Breadcrumb breadCrumbData={breadcrumbArray} bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={10} lg={24} md={24} sm={24} xs={24} >
          <StudentProfileSideBar data={state} />
        </Col>
        <Col xxl={18} xl={14} lg={24} md={24} sm={24} xs={24}>
          <UniversityProfileTab data={state} />
        </Col>
      </Row>
    </>


  )
}

export default ProfileTabsMain