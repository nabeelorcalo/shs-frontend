import React, { useState } from 'react'
import { Col, Divider, Menu, Row } from 'antd'
import { CardViewIcon, TableViewIcon } from '../../../../assets/images';
import { Breadcrumb, DropDown, FiltersButton, SearchBar, ToggleButton, Drawer, Notifications, BoxWrapper } from '../../../../components'
import Filters from './filter';
import InternTable from './internsTable';
import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import InternCard from './internCard';
import useCustomHook from './actionHandler';
import { ROUTES_CONSTANTS } from '../../../../config/constants';
import './style.scss'
import { NavLink } from 'react-router-dom';

const dummyData = [
  { id: 1, name: 'Maria Sanoid', avatar: Image1, status: "Employed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 2, name: 'Andrea Hiyahiya', avatar: Image1, status: "Employed", department: 'Business Analyst', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 3, name: 'Cody Nguyen', avatar: Image1, status: "Employed", department: 'Designer', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 4, name: 'Kristin Warren', avatar: Image1, status: "Employed", department: 'Data Researcher', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 5, name: 'Deng Jing-mei', avatar: Image1, status: "Employed", department: 'Programmer', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 6, name: 'Deng Jing-mei', avatar: Image1, status: "Employed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 7, name: 'Deng Jing-mei', avatar: Image1, status: "Employed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 8, name: 'Deng Jing-mei', avatar: Image1, status: "Employed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 9, name: 'Deng Jing-mei', avatar: Image1, status: "Employed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 10, name: 'Deng Jing-mei', avatar: Image1, status: "Completed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 11, name: 'Deng Jing-mei', avatar: Image1, status: "Completed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 12, name: 'Deng Jing-mei', avatar: Image1, status: "Completed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 13, name: 'Deng Jing-mei', avatar: Image1, status: "Completed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 14, name: 'Deng Jing-mei', avatar: Image1, status: "Completed", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
  { id: 15, name: 'Deng Jing-mei', avatar: Image1, status: "Terminated", department: 'ui ux designers', joiningDate: '01/07 /2022', dateOfBirth: '04/12/1996' },
]
const index: React.FC = () => {
  const breadcrumbArray = [
    { name: "Interns" },
    { name: "Universities", onClickNavigateTo: `/${ROUTES_CONSTANTS.UNIVERSITIES}` },
  ];
  const TableColumn = ['No.', 'Avater', ' Name', 'Department', 'Joining Date', 'Date of Birth',]
  const action = useCustomHook();

  const [state, setState] = useState({
    openSidebar: false,
    status: 'Select',
    isToggle: true,
  });

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [value, setValue] = useState<any>()

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`}>
          Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        Chat
      </Menu.Item>
    </Menu>
  );
  const handleChange = () => { };
  const togglerClick = (event: any) => {
    setState(prevState => ({
      ...prevState,
      isToggle: !state.isToggle,
    }));
  }
  return (
    <div className='company-university '>
      <Breadcrumb breadCrumbData={breadcrumbArray} bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} placeholder='Search by name' />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col gap-4 justify-end'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <div className="flex gap-4 justify-between">
            <ToggleButton
              isToggle={state.isToggle}
              onTogglerClick={togglerClick}
              LastIcon={CardViewIcon}
              FirstIcon={TableViewIcon}
              className="w-[88px]"
            />
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={() => {
                action.downloadPdfOrCsv(event, TableColumn, dummyData, "Interns ")
                Notifications({ title: "Success", description: "University interns list downloaded ", type: 'success' })
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          <div className='py-3'><span className='text-base'>Total Interns:</span> <span className='text-base font-semibold'>{dummyData.length}</span></div>
          {state.isToggle ?
            <InternCard dummyData={dummyData} menu={menu} />
            :
            <BoxWrapper>
              <InternTable dummyData={dummyData} menu={menu} />
            </BoxWrapper>
          }
        </Col>
      </Row>



      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}
      >
        <React.Fragment key=".0">
          <Filters />
        </React.Fragment>
      </Drawer>
    </div>
  )
}

export default index