import React, { useState } from 'react'
import { Divider, Menu } from 'antd'
import { CardViewIcon, SettingHorizontalLine, TableViewIcon } from '../../../../assets/images';
import { DropDown, FiltersButton, PageHeader, SearchBar, ToggleButton } from '../../../../components'
import { Link, NavLink } from 'react-router-dom';
import Filters from './filter';
import Drawer from '../../../../components/Drawer';
import InternTable from './internsTable';
import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import './style.scss'
import InternCard from './internCard';

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
        Profile
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
      <PageHeader title={<> Interns {<span className='inline-block align-middle mx-2'><SettingHorizontalLine className="" /></span>}
        <NavLink to="/universities">
          <span className='text-base font-medium dashboard-primary-color' >Universities</span>
        </NavLink>  </>} />
      <Divider className="my-0" />
      <div className='flex justify-between my-2'>
        <SearchBar size="middle" handleChange={handleChange} />
        <div className='flex justify-end gap-2'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <div className="flex justify-end items-center gap-3">
            <ToggleButton
              isToggle={state.isToggle}
              onTogglerClick={togglerClick}
              FirstIcon={CardViewIcon}
              LastIcon={TableViewIcon}
              className="w-[88px]"
            />
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={setValue}
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