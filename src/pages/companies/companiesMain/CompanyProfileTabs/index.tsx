import { Col, Row } from 'antd'
import { useLocation } from 'react-router-dom'
import CompanyProfileSideBar from './companyProfileSideBar'
import CompanyTabs from './companyTabs'
import { Breadcrumb } from '../../../../components'
import { ROUTES_CONSTANTS } from '../../../../config/constants'

const CompanyProfile = () => {
  const { state } = useLocation();

  const breadcrumbArray = [
    { name: ` Profile` },
    { name: "Companies", onClickNavigateTo: `/${ROUTES_CONSTANTS.COMPANIES}` },
  ];
  
  return (
    <>
      <Breadcrumb breadCrumbData={breadcrumbArray} bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={10} lg={24} md={24} sm={24} xs={24} >
          <CompanyProfileSideBar data={state} />
        </Col>
        <Col xxl={18} xl={14} lg={24} md={24} sm={24} xs={24}>
          <CompanyTabs />
        </Col>
      </Row >
    </>

  )
}
export default CompanyProfile