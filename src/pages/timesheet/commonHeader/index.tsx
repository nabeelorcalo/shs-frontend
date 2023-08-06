import { useState } from "react";
import { ArrowDownDark, UserAvatar } from "../../../assets/images";
import { DropDown, SearchBar } from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { Row, Col } from "antd";
const CommonHeader = (props: any) => {
  const { hideUser, download, setDownload, dateRange, setDateRange, users, setManagerSearch, user, setUser, setUserSearch, disabled, placeholder } =
    props;

  // const userData = [
  //   { userImg: UserAvatar, userName: "john doe" },
  //   { userImg: UserAvatar, userName: "mina marino" },
  //   { userImg: UserAvatar, userName: "clark" },
  //   { userImg: UserAvatar, userName: "sarah joe" },
  // ];

  return (
    <Row gutter={[20, 20]} className="common-header my-5">
      <Col xl={6} lg={9} md={24} sm={24} xs={24}>
        <SearchBar placeholder={placeholder} handleChange={(e) => setUserSearch(e)} />
      </Col>
      <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
        {!hideUser && (
          <DropDownNew
            placement={"bottomRight"}
            disabled={disabled}
            items={[
              {
                label: (
                  <SearchBar
                    handleChange={(e) => {
                      setManagerSearch(e);
                    }}
                  />
                ),
                key: "search",
              },
              {
                label: (
                  <div>
                    {users.map((userData: any) => (
                      <div className="flex items-center gap-3 mb-[20px]" onClick={() => setUser(userData)}>
                        <img src={UserAvatar} className="h-[24px] w-[24px] rounded-full object-cover" />
                        <p>{userData?.companyManager?.firstName + " " + userData?.companyManager?.lastName}</p>
                      </div>
                    ))}
                  </div>
                ),
                key: "users",
              },
            ]}
          >
            <div className="drop-down-with-imgs flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 mr-[40px]">
                  <img src={UserAvatar} />
                  <p>{user?.companyManager?.firstName + " " + user?.companyManager?.lastName}</p>
                </div>
              ) : (
                <div className="flex items-center gap-3 mr-[40px]">Select User</div>
              )}
              <ArrowDownDark />
            </div>
          </DropDownNew>
        )}
        <DropDown
          name="This Week"
          options={["this week", "last week", "this month", "last month", "date range"]}
          requireRangePicker
          showDatePickerOnVal="date range"
          value={dateRange}
          setValue={setDateRange}
        />
        <DropDown requiredDownloadIcon options={["pdf", "excel"]} setValue={setDownload} value={download} />
      </Col>
    </Row>
  );
};

export default CommonHeader;
