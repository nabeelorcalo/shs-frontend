import { useState } from "react";
import { ArrowDownDark, UserAvatar } from "../../../assets/images";
import { DropDown, SearchBar } from "../../../components";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { Row, Col, Avatar } from "antd";
import { SearchBarNew } from "./SearchBarNew";
import constants from "../../../config/constants";
const CommonHeader = (props: any) => {
  const {
    hideUser,
    download,
    setDownload,
    dateRange,
    setDateRange,
    users,
    setManagerSearch,
    managerSearch,
    user,
    setUser,
    setUserSearch,
    disabled,
    placeholder,
  } = props;

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
                label: <SearchBarNew handleChange={setManagerSearch} value={managerSearch} />,
                key: "search",
              },
              {
                label: (
                  <div className="max-h-96 overflow-y-auto">
                    <div
                      className="flex items-center gap-3 mb-[20px] ml-8"
                      onClick={() => {
                        setManagerSearch("");
                        setUser(null);
                      }}
                    >
                      All
                    </div>
                    {users?.map((userData: any) => (
                      <div className="flex items-center gap-3 mb-[20px]" onClick={() => setUser(userData)}>
                        {/* <img
                          src={
                            userData?.companyManager?.profileImage
                              ? `${constants.MEDIA_URL}/${userData?.companyManager?.profileImage?.mediaId}.${userData?.companyManager?.profileImage?.metaData?.extension}`
                              : UserAvatar
                          }
                          className="h-[24px] w-[24px] rounded-full object-cover"
                        /> */}
                        <Avatar
                          size={30}
                          src={`${constants.MEDIA_URL}/${userData?.companyManager?.profileImage?.mediaId}.${userData?.companyManager?.profileImage?.metaData?.extension}`}
                        >
                          {userData?.companyManager?.firstName?.charAt(0)} {userData?.companyManager?.lastName?.charAt(0)}
                        </Avatar>
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
                  {/* <img
                    src={
                      user?.companyManager?.profileImage
                        ? `${constants.MEDIA_URL}/${user?.companyManager?.profileImage?.mediaId}.${user?.companyManager?.profileImage?.metaData?.extension}`
                        : UserAvatar
                    }
                    className="h-[24px] w-[24px] rounded-full object-cover"
                  /> */}
                  <Avatar
                    size={30}
                    src={`${constants.MEDIA_URL}/${user?.companyManager?.profileImage?.mediaId}.${user?.companyManager?.profileImage?.metaData?.extension}`}
                  >
                    {user?.companyManager?.firstName?.charAt(0)} {user?.companyManager?.lastName?.charAt(0)}
                  </Avatar>
                  <p className="text-primary-title-color">{user?.companyManager?.firstName + " " + user?.companyManager?.lastName}</p>
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
