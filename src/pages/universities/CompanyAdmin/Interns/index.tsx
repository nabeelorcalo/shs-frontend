import React, { useEffect, useState } from 'react'
import { Col, Row, Input, Avatar, MenuProps, Dropdown } from 'antd'
import { CardViewIcon, GlassMagnifier, More, TableViewIcon } from '../../../../assets/images';
import { Breadcrumb, DropDown, FiltersButton, ToggleButton, Drawer, Notifications, BoxWrapper, InternsCard, NoDataFound } from '../../../../components'
import Filters from './filter';
import InternTable from './internsTable';
import useCustomHook from './actionHandler';
import constants, { ROUTES_CONSTANTS } from '../../../../config/constants';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { ExternalChatUser } from '../../../../store';
import useInternsCustomHook from '../../../interns/InternsCompanyAdmin/actionHandler';
import './style.scss'

const { CHAT } = ROUTES_CONSTANTS;

const index: React.FC = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const { getUniIntersTableData, universityIntersData, debouncedSearch } = useCustomHook();
  const { getProfile } = useInternsCustomHook();

  const breadcrumbArray = [
    { name: "Interns" },
    { name: "Universities", onClickNavigateTo: `/${ROUTES_CONSTANTS.UNIVERSITIES}` },
  ];
  const TableColumn = ['No.', ' Name', 'Department', 'Joining Date', 'Date of Birth',]
  const action = useCustomHook();

  const [states, setStates] = useState({
    openSidebar: false,
    status: 'Select',
    isToggle: false,
  });

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const { state } = useLocation();
  useEffect(() => {
    getUniIntersTableData(state?.universityId, searchValue, null)
  }, [searchValue])

  const PopOver = (props: any) => {
    const { data } = props;
    console.log(data, "datadatadatadata");

    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { getProfile(data?.userId) }}>
            Profile
          </a>
        ),
      },
      {
        key: "3",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => { navigate(`/interns/${CHAT}/${data?.userId}`) }}>
            Chat
          </a>

        ),
      },

    ];
    return (
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight">
        <More className="cursor-pointer" />
      </Dropdown>
    );
  };

  const ButtonStatus = (props: any) => {
    const btnStyle: any = {
      completed: "primary-bg-color",
      employed: "text-success-bg-color",
      terminated: "secondary-bg-color",
    };
    return (
      <p>
        <span
          className={`px-2 py-1 rounded-lg white-color capitalize ${btnStyle[props.status]
            }`}
        >
          {props.status}
        </span>
      </p>
    );
  };

  const handleProfile = (item: any) => {
    getProfile(item?.userId)
  }


  const universityIntern = universityIntersData?.filter((item: any) => (item?.userUniversityId === state?.universityId))
  console.log(universityIntern, "universityInternuniversityIntern");

  const univertyTableData = universityIntern?.map((item: any, index: number) => {
    return (
      {
        key: index,
        no: index < 9 ? `0${index + 1}` : index + 1,
        avatar:
          <Avatar size={50}
            src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
            }
          >
            {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
          </Avatar>,
        id: item.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        department: item?.internship?.department?.description ? item?.internship?.department?.description : "N/A",
        joiningDate: item?.joiningDate ? dayjs(item?.joiningDate).format("DD/MM/YYYY") : "N/A",
        dateOfBirth: item?.userDetail?.DOB ? dayjs(item?.userDetail?.DOB).format("DD/MM/YYYY") : "N/A",
        action: <PopOver data={item} />
      }
    )
  })


  const downloadCSV = universityIntern?.map((item: any, index: number) => {
    return (
      {
        id: index < 9 ? `0${index + 1}` : index + 1,
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
            placeholder="Search by name"
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
              LastIcon={TableViewIcon}
              FirstIcon={CardViewIcon}
              className="w-[88px]"
            />
            <DropDown
              requiredDownloadIcon
              options={["PDF", "Excel"]}
              setValue={() => {
                action.downloadPdfOrCsv(event, TableColumn, downloadCSV, "Interns")
                Notifications({ title: "Success", description: "University interns list downloaded", type: 'success' })
              }}
            />
          </div>
        </Col>
        <Col xs={24} >
          {states.isToggle ? <BoxWrapper>
            <InternTable universityIntersData={univertyTableData} />
          </BoxWrapper> :
            <div className="flex flex-wrap gap-5">
              {universityIntern.length != 0 ? universityIntern?.map((item: any) => {
                return (
                  <InternsCard
                    status={<ButtonStatus status={item?.internStatus} />}
                    pupover={<PopOver data={item} />}
                    posted_by={
                      <Avatar
                        size={64}
                        src={`${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`}
                      >
                        {item?.userDetail?.firstName?.charAt(0)}
                        {item?.userDetail?.lastName?.charAt(0)}
                      </Avatar>
                    }
                    name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                    department={item?.internship?.department?.name}
                    joining_date={dayjs(item?.joiningDate)?.format(
                      "DD/MM/YYYY"
                    )}
                    date_of_birth={dayjs(item?.userDetail?.DOB)?.format(
                      "DD/MM/YYYY"
                    )}
                    key={index}
                    item={item}
                    id={item?.id}

                    navigateToChat={() => {
                      setChatUser(item?.userDetail);
                      navigate(`/interns/${CHAT}/${item?.userId}`);
                    }}
                    handleProfile={() => handleProfile(item)}
                  />

                )
              }) : <NoDataFound />}

            </div>
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