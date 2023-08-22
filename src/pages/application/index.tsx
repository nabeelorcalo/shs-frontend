import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader, BoxWrapper,
  FiltersButton, DropDown, StageStepper, DrawerWidth, Loader, Notifications, SearchBar
} from "../../components";
import { GlassMagnifier, More } from "../../assets/images";
import { Button, MenuProps, Dropdown, Avatar, Row, Col, Input, TablePaginationConfig } from 'antd';
import Drawer from "../../components/Drawer";
import useCustomHook from "./actionHandler";
import UserSelector from "../../components/UserSelector";
import constants from "../../config/constants";
import { useRecoilState, useResetRecoilState } from "recoil";
import { applicationFilterState, applicationPaginationState } from "../../store";
import "./style.scss";


const ButtonStatus = (props: any) => {

  const btnStyle: any = {
    "applied": "dashboard-primary-bg-color",
    "shortlisted": "shortlisted-stepper-bg-color",
    "interviewed": "accommodation-bg-tag",
    "recommended": "purple-bg",
    "offerLetter": "light-purple-bg",
    "contract": "line-bg",
    "hired": "teriary-bg-color",
    "rejected": "secondary-bg-color",
  }

  return (
    <p>
      <span className={`px-2 py-1 rounded-lg white-color text-sm ${btnStyle[props.status]}`} >
        {props.status === "offerLetter" ? 'Offer Letter' : props.status}
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

  // Table pagination states 
  const [tableParams, setTableParams]: any = useRecoilState(applicationPaginationState);
  const [filter, setFilter] = useRecoilState(applicationFilterState);
  const resetList = useResetRecoilState(applicationFilterState);
  const resetTableParams = useResetRecoilState(applicationPaginationState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };

  const csvAllColum = ["No", "Date Applied", "Company", "Type of Work", "Internship Type",
    "Nature of Work", "Position", "Status"];

  const timeFrameDropdownData = ["This week", "Last week", "This month", "Last month", "Date Range"];

  const natureOfWorkArr = [
    { value: "ALL", label: "All" },
    { value: "ONSITE", label: "On-Site" },
    { value: "HYBRID", label: "Hybrid" },
    { value: "VIRTUAL", label: "Virtual" }];

  const typeOfWorkArr = [
    { value: "ALL", label: "All" },
    { value: "PAID", label: "Paid" },
    { value: "UNPAID", label: "Unpaid" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "FULL_TIME", label: "Full Time" }];

  const stageArr = [
    { value: "ALL", label: "All" },
    { value: "applied", label: "Applied" },
    { value: "interviewed", label: "Interviewed" },
    { value: "recommended", label: "Recommended" },
    { value: "offerLetter", label: "Offer Letter" },
    { value: "contract", label: "Contract" },
    { value: "hired", label: "Hired" },
    { value: "rejected", label: "Rejected" }];

  const { getApplicationsData, getApplicationsDetails,
    applicationDetailsState, downloadPdfOrCsv, allApplicationsData }: any = useCustomHook();


  useEffect(() => {
    let args = removeEmptyValues(filter);
    getApplicationsData(args, setLoading);
  }, [filter.search, filter.page]);

  // reset pagination data 
  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const applicationsData = allApplicationsData?.data

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
      title: <div className="text-center">Actions</div>,
    },
  ];
  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData = applicationsData?.map((item: any, index: number) => {
    const dateFormat = dayjs(item?.createdAt).format('DD/MM/YYYY');
    const typeOfWork = item?.internship?.internType?.replace("_", " ")?.toLowerCase();
    return (
      {
        key: index,
        no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
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
        status: item?.stage,
      };
    }
  );

  // const handleTimeFrameValue = (val: any) => {
  //   let item = timeFrameDropdownData.some(item => item === val)
  //   setState({ ...state, timeFrame: val, dateRange: item });
  // }
  const handleTimeFrameValue = (val: any) => {
    let item = timeFrameDropdownData?.some((item) => item === val);
    setFilter({ ...filter, filterType: val?.toUpperCase()?.replace(" ", "_"), currentDate: dayjs().format('YYYY-MM-DD').toString() });
    setState({ ...state, dateRange: item })
  };

  const handleApplyFilter = () => {
    let args = removeEmptyValues(filter);
    // date pickers function 
    if (state?.dateRange) {
      getApplicationsData(args, setLoading, filter.filterType);
    }
    else {
      const [startDate, endDate] = filter?.filterType?.split(",");
      getApplicationsData(args, setLoading, "DATE_RANGE", startDate.replace("_", ""), endDate,);
    }
    setShowDrawer(false)
    // getApplicationsData()
  }

  // const handleResetFilter = () => {
  //   getApplicationsData(state, searchValue, null)
  //   setState((prevState: any) => ({
  //     ...prevState,
  //     natureOfWork: undefined,
  //     typeOfWork: undefined,
  //     stage: undefined,
  //     timeFrame: undefined,
  //     dateRange: true
  //   }))
  // }
  const handleResetFilter = () => {
    let args = removeEmptyValues(filter);
    args.stage = undefined;
    args.locationType = undefined;
    args.filterType = undefined;
    getApplicationsData(args, setLoading);
    setFilter((prevState: any) => ({
      ...prevState,
      stage: undefined,
      locationType: undefined,
      filterType: undefined,


    }));
    setState({ ...state, dateRange: true, typeOfWork: undefined })

  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <>
      <PageHeader title="Applications" />
      <div className="flex flex-col gap-5 applications_main">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
            <SearchBar
              className="search-bar"
              placeholder="Search by company"
              handleChange={(e: any) => setFilter({ ...filter, search: e })}
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
              className="applications-drawer"
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
                      value={filter.filterType?.toLowerCase()?.replace("_", ' ')}
                      setValue={(e: any) => handleTimeFrameValue(e)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Nature of Work"
                      placeholder="Select"
                      value={filter.locationType}
                      onChange={(event: any) => {
                        setFilter({ ...filter, locationType: event })
                      }}
                      options={natureOfWorkArr}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Type of Work"
                      placeholder="Select"
                      value={filter.workType}
                      onChange={(event: any) => {
                        setFilter({ ...filter, workType: event })
                      }}
                      options={typeOfWorkArr}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Stage"
                      placeholder="Select"
                      value={filter.stage}
                      onChange={(event: any) => {
                        setFilter({ ...filter, stage: event })
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
            {<BoxWrapper>
              <GlobalTable
                columns={columns}
                tableData={newTableData}
                loading={loading}
                pagination={tableParams?.pagination}
                handleTableChange={handleTableChange}
                pagesObj={allApplicationsData?.pagination}
              />
            </BoxWrapper>}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Application;
