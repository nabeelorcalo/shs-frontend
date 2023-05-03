import React, { useState } from 'react'
import { Divider, Menu } from 'antd'
import { CardViewIcon, TableViewIcon } from '../../../../assets/images';
import { Breadcrumb, DropDown, FiltersButton, SearchBar, ToggleButton, Drawer, Notifications } from '../../../../components'
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
    isToggle: false,
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
      <Menu.Item >
        <NavLink to={`/${ROUTES_CONSTANTS.CHAT}`}>
          Chat
        </NavLink>
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
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <div className="flex flex-row justify-between gap-3 max-sm:flex-col lg:flex-row">
        <div className="max-sm:w-full md:w-[50%] lg:w-[25%]">
          <SearchBar size="middle" handleChange={handleChange} />
        </div>
        <div className='w-full flex flex-row lg:justify-end gap-2 '>
          <div>
            <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          </div>
          <div className="">
            <ToggleButton
              isToggle={state.isToggle}
              onTogglerClick={togglerClick}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className="w-[88px]"
            />
          </div>
          <div>
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={() => {
                action.downloadPdfOrCsv(event, TableColumn, dummyData, "Interns ")
                Notifications({ title: "Success", description: "University interns list downloaded ", type: 'success' })
              }}
            />
          </div>
        </div>
      </div>
      <div className='py-3'><span className='text-base'>Total Interns:</span> <span className='text-base font-semibold'>{dummyData.length}</span></div>
      {state.isToggle ?
        <InternTable dummyData={dummyData} menu={menu} />
        :
        <InternCard dummyData={dummyData} menu={menu} />
      }
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