import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader, BoxWrapper,
  FiltersButton, DropDown, StageStepper, DrawerWidth, Loader, Notifications
} from "../../components";
import { GlassMagnifier, More } from "../../assets/images";
import { Button, MenuProps, Dropdown, Avatar, Row, Col, Input } from 'antd';
import Drawer from "../../components/Drawer";
import useCustomHook from "./actionHandler";
import UserSelector from "../../components/UserSelector";
import constants from "../../config/constants";
import "./style.scss";
import { log } from "console";

const ButtonStatus = (props: any) => {

  const btnStyle: any = {
    "applied": "primary-bg-color",
    "interviewed": "text-info-bg-color",
    "shortlisted": "purple-bg",
    "rejected": "secondary-bg-color",
    "offerLetter": "light-purple-bg",
    "contract": "purple-bg",
    "hired": "teriary-bg-color ",
    // "recommended": "secondary-bg-color",
  }
  return (
    <p>
      <span className={`px-2 py-1 rounded-lg white-color text-sm ${btnStyle[props.status]}`} >
        {props.status}
      </span>
    </p>
  )
}

const Application = () => {
  const mainDrawerWidth = DrawerWidth();
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [searchValue, setSearchValue] = useState('');
  const [state, setState] = useState<any>({
    timeFrame: null,
    natureOfWork: undefined,
    typeOfWork: undefined,
    stage: undefined,
    detailsId: null,
    dateRange: true
  })

  const csvAllColum = ["No", "Date Applied", "Company", "Type of Work", "Internship Type",
    "Nature of Work", "Position"];

  const timeFrameDropdownData = ["This week", "Last week", "This month", "Last month", "Date Range"];

  const natureOfWorkArr = [
    { value: "All", label: "All" },
    { value: "ONSITE", label: "On-Site" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "VIRTUAL", label: "Virtual" }];

  const typeOfWorkArr = [
    { value: "All", label: "All" },
    { value: "PAID", label: "Paid" },
    { value: "UNPAID", label: "Unpaid" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "FULL_TIME", label: "Full Time" }];

  const stageArr = [
    { value: "All", label: "All" },
    { value: "applied", label: "Applied" },
    { value: "interviewed", label: "Interviewed" },
    { value: "recommended", label: "Recommended" },
    { value: "offerLetter", label: "Offer Letter" },
    { value: "contract", label: "Contract" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Rejected" }];

  const { applicationsData, getApplicationsData, getApplicationsDetails,
    applicationDetailsState, downloadPdfOrCsv, debouncedSearch, isLoading }: any = useCustomHook();


  useEffect(() => {
    getApplicationsData(state, searchValue)
  }, [searchValue])

  console.log(applicationsData, 'applications data')

  const PopOver = ({ state, item }: any) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              state(true)
              getApplicationsDetails(item?.id);
            }}
          >
            View Details
          </a>
        ),
      },

    ];
    return (
      <Dropdown className="cursor-pointer" menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
        <More />
      </Dropdown>
    );
  };

  const CompanyData = ({ companyName, companyDetail, avatar }: any) => {
    return (
      <div className="flex gap-2" style={{ alignItems: "center" }}>
        <Avatar size={50} src={avatar}>
          {companyName.charAt(0)}
          {/* {companyDetail.charAt(0)} */}
        </Avatar>
        <div>
          <p className="font-semibold">{companyName}</p>
          <p className="text-base">{companyDetail}</p>
        </div>
      </div>
    )
  }

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "date_applied",
      key: "date_applied",
      title: "Date Applied",
    },
    {
      dataIndex: "company",
      key: "company",
      title: "Company",
    },
    {
      dataIndex: "type_of_work",
      key: "type_of_work",
      title: "Type of Work",
    },
    {
      dataIndex: "internship_type",
      key: "internship_type",
      title: "Internship Type",
    },
    {
      dataIndex: "nature_of_work",
      key: "nature_of_work",
      title: "Nature of Work",
    },
    {
      dataIndex: "position",
      key: "position",
      title: "Position",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: "Actions",
    },
  ];

  const newTableData = applicationsData?.map((item: any, index: number) => {
    const dateFormat = dayjs(item?.createdAt).format('DD/MM/YYYY');
    const typeOfWork = item?.internship?.internType?.replace("_", " ")?.toLowerCase();
    return (
      {
        key: index,
        no: index < 9 ? `0${index + 1}` : `${index + 1}`,
        date_applied: dateFormat ?? "N/A",
        company: <CompanyData
          companyName={item?.internship?.company?.businessName}
          companyDetail={item?.internship?.company?.businessSector}
          avatar={`${constants.MEDIA_URL}/${item?.internship?.company?.logo?.mediaId}.${item?.internship?.company?.logo?.metaData?.extension}`} />,
        type_of_work: typeOfWork ?? "N/A",
        internship_type: item?.internship?.salaryType?.toLowerCase() ?? "N/A",
        nature_of_work: item?.internship?.locationType?.toLowerCase() ?? "N/A",
        position: item?.internship?.title,
        status: <ButtonStatus status={item?.stage} />,
        actions: <PopOver state={setShowStageStepper} item={item} />
      }
    )
  });

  const downloadCSVFile = applicationsData?.map(
    (item: any, index: number) => {
      const dateFormat = dayjs(item?.createdAt).format('DD/MM/YYYY');
      const typeOfWork = item?.internship?.internType?.replace("_", " ")?.toLowerCase();
      return {
        no: index < 9 ? `0${index + 1}` : `${index + 1}`,
        date_applied: dateFormat ?? "N/A",
        company: item?.internship?.company?.businessName,
        type_of_work: typeOfWork ?? "N/A",
        internship_type: item?.internship?.salaryType?.toLowerCase() ?? "N/A",
        nature_of_work: item?.internship?.locationType?.toLowerCase() ?? "N/A",
        position: item?.internship?.title,
      };
    }
  );

  const handleTimeFrameValue = (val: any) => {
    let item = timeFrameDropdownData.some(item => item === val)
    setState({ ...state, timeFrame: val, dateRange: item });
  }
  // handle search  
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  const handleApplyFilter = () => {
    // date pickers function 
    if (state?.dateRange) {
      getApplicationsData(state, searchValue, state?.timeFrame);
    }
    else {
      const [startDate, endDate] = state?.timeFrame?.split(",")
      getApplicationsData(state, searchValue, "DATE_RANGE", startDate, endDate);
    }
    setShowDrawer(false)
    // getApplicationsData()
  }

  const handleResetFilter = () => {
    getApplicationsData(state, searchValue, null)
    setState((prevState: any) => ({
      ...prevState,
      natureOfWork: undefined,
      typeOfWork: undefined,
      stage: undefined,
      timeFrame: undefined,
      dateRange: true
    }))

  }

  return (
    <>
      <PageHeader title="Applications" />
      <div className="flex flex-col gap-5 applications_main">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
            <Input
              className='search-bar'
              placeholder="Search by company"
              onChange={debouncedResults}
              prefix={<GlassMagnifier />}
            />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <FiltersButton label="Filters" onClick={() => { setShowDrawer(true) }} />
            <DropDown
              options={['PDF', 'Excel']}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, downloadCSVFile, "Students Applications");
                Notifications({
                  title: "Success",
                  description: "Applications list downloaded",
                  type: "success",
                });
              }} />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => {
                setShowDrawer(false);
              }}
              title="Filters" >
              <div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <p>Time Frame</p>
                    <DropDown
                      name="Select"
                      options={timeFrameDropdownData}
                      showDatePickerOnVal={'Date Range'}
                      requireRangePicker placement="bottom"
                      value={state.timeFrame}
                      setValue={(e: any) => handleTimeFrameValue(e)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Nature of Work"
                      placeholder="Select"
                      value={state.natureOfWork}
                      onChange={(event: any) => {
                        setState({ ...state, natureOfWork: event })
                      }}
                      options={natureOfWorkArr}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Type of Work"
                      placeholder="Select"
                      value={state.typeOfWork}
                      onChange={(event: any) => {
                        setState({ ...state, typeOfWork: event })
                      }}
                      options={typeOfWorkArr}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Stage"
                      placeholder="Select"
                      value={state.stage}
                      onChange={(event: any) => {
                        setState({ ...state, stage: event })
                      }}
                      options={stageArr}
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button className="button-default-tertiary"
                      onClick={handleResetFilter}>Reset</Button>
                    <Button className="button-tertiary"
                      onClick={handleApplyFilter}>Apply</Button>
                  </div>
                </div>
              </div>
            </Drawer>
            <Drawer
              closable
              open={showStageStepper}
              width={mainDrawerWidth > 1400 ? 1000 : mainDrawerWidth > 900 ? 900 : mainDrawerWidth > 576 ? 600 : 300}
              onClose={() => { setShowStageStepper(false) }}
            >
              <StageStepper data={applicationDetailsState} />
            </Drawer>
          </Col>
          <Col xs={24}>
            {!isLoading ? <BoxWrapper>
              <GlobalTable
                columns={columns}
                tableData={newTableData}
              />
            </BoxWrapper> : <Loader />}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Application;
