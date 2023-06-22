import React, { useEffect, useState } from 'react'
import { Col, Menu, Row, Input } from 'antd'
import { CardViewIcon, GlassMagnifier, TableViewIcon } from '../../../../assets/images';
import { Breadcrumb, DropDown, FiltersButton, SearchBar, ToggleButton, Drawer, Notifications, BoxWrapper } from '../../../../components'
import Filters from './filter';
import InternTable from './internsTable';
// import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import InternCard from './internCard';
import useCustomHook from './actionHandler';
import { ROUTES_CONSTANTS } from '../../../../config/constants';
import './style.scss'
import { NavLink, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

const index: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const { getUniIntersTableData, universityIntersData, debouncedSearch } = useCustomHook();

  const breadcrumbArray = [
    { name: "Interns" },
    { name: "Universities", onClickNavigateTo: `/${ROUTES_CONSTANTS.UNIVERSITIES}` },
  ];
  const TableColumn = ['No.', 'Avater', ' Name', 'Department', 'Joining Date', 'Date of Birth',]
  const action = useCustomHook();

  const [states, setStates] = useState({
    openSidebar: false,
    status: 'Select',
    isToggle: false,
  });

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const { state } = useLocation();
  useEffect(() => {
    getUniIntersTableData(state, searchValue, null)
  }, [searchValue])

  const menu = (
    <Menu>
      <Menu.Item>
        <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`}>
          Profile
        </NavLink>
      </Menu.Item>
      <Menu.Item >
        <NavLink to={`/${ROUTES_CONSTANTS.CHAT}`}>
          Chat
        </NavLink>
      </Menu.Item>
    </Menu>
  );
  const univertyTableData = universityIntersData?.map((item: any, index: number) => {
    return (
      {
        key: index,
        no: universityIntersData?.length < 10 && `0${index + 1}`,
        id: item?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.description ? item?.internship?.department?.description : "N/A",
        joiningDate: item?.joiningDate ? dayjs(item?.joiningDate).format("DD/MM/YYYY") : "N/A",
        dateOfBirth: item?.userDetail?.DOB ? dayjs(item?.userDetail?.DOB).format("DD/MM/YYYY") : "N/A",
      }
    )
  })

  const handleChangeSearch = (e: any) => {
    debouncedSearch(e.target.value, setSearchValue)
  };

  const togglerClick = (event: any) => {
    setStates({
      ...states,
      isToggle: !states.isToggle,
    });
  }
  return (
    <div className='company-university'>
      <Breadcrumb breadCrumbData={breadcrumbArray} bordered={true} />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <Input
            className='search-bar'
            placeholder="Search"
            onChange={handleChangeSearch}
            prefix={<GlassMagnifier />}
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col gap-4 justify-end'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <div className="flex gap-4 justify-between">
            <ToggleButton
              isToggle={states.isToggle}
              onTogglerClick={togglerClick}
              LastIcon={CardViewIcon}
              FirstIcon={TableViewIcon}
              className="w-[88px]"
            />
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={() => {
                action.downloadPdfOrCsv(event, TableColumn, univertyTableData, "Interns")
                Notifications({ title: "Success", description: "University interns list downloaded ", type: 'success' })
              }}
            />
          </div>
        </Col>
        <Col xs={24}>
          {states.isToggle ?
            <InternCard searchValue={searchValue} setSearchValue={setSearchValue} menu={menu} universityIntersData={univertyTableData} />
            :
            <BoxWrapper>
              <InternTable menu={menu} universityIntersData={univertyTableData} />
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
          <Filters setShowDrawer={setShowDrawer} />
        </React.Fragment>
      </Drawer>
    </div>
  )
}

export default index