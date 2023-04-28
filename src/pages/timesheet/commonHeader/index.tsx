import { useState } from "react"
import { ArrowDownDark, UserAvatar } from "../../../assets/images";
import { DropDown, SearchBar } from "../../../components"
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { Row, Col } from "antd"
const CommonHeader = (props: any) => {
  const { hideUser, download, setDownload } = props;
  const [dateRange, setDateRange] = useState('');
  const [user, setUser] = useState({ userImg: UserAvatar, userName: 'amelia clark' });

  const userData = [
    { userImg: UserAvatar, userName: 'john doe' },
    { userImg: UserAvatar, userName: 'mina marino' },
    { userImg: UserAvatar, userName: 'clark' },
    { userImg: UserAvatar, userName: 'sarah joe' },
  ]

  return (
    <>
      <Row gutter={[20, 20]} className="common-header">
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={() => { }} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
        {!hideUser && <DropDownNew placement={'bottomRight'} items={[
           {
             label: <SearchBar handleChange={() => { }} />, key: 'search'
           },
           {
             label: <div>
               {userData.map((users) => (
                 <div className="flex items-center gap-3 mb-[20px]" onClick={() => setUser(users)}>
                   <img src={users.userImg} className='h-[24px] w-[24px] rounded-full object-cover' />
                   <p>{users.userName}</p>
                 </div>
               ))}
             </div>, key: 'users'
           }
         ]}>
           <div className="drop-down-with-imgs flex items-center gap-3">
             <div className="flex items-center gap-3 mr-[40px]">
               <img src={user.userImg} />
               <p>{user.userName}</p>
             </div>
             <ArrowDownDark />
           </div>
         </DropDownNew>}
         <DropDown name="This Week"
           options={['this week', 'last week', 'this month', 'last month', 'date range']}
           requireDatePicker showDatePickerOnVal="date range"
           value={dateRange} setValue={setDateRange}
         />
         <DropDown requiredDownloadIcon options={['pdf', 'excel']} setValue={setDownload} value={download} />
        </Col>
      </Row>
    </>
  )
}

export default CommonHeader