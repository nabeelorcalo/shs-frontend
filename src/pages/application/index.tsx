import { useEffect, useState } from "react";
import { GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard, FiltersButton, DropDown, StageStepper, DrawerWidth } from "../../components";
import { useNavigate } from 'react-router-dom';
import { More } from "../../assets/images"
import { Button, MenuProps, Dropdown, Avatar, Row, Col } from 'antd';
import Drawer from "../../components/Drawer";
import useCustomHook from "./actionHandler";
import "./style.scss";
import dayjs from "dayjs";

const ButtonStatus = (props: any) => {

  const btnStyle: any = {
    "Applied": "primary-bg-color",
    "Interviewed": "text-info-bg-color",
    "Short Listed": "purple-bg",
    "Offer Letter": "light-purple-bg",
    "Hired": "text-success-bg-color",
    "Rejected": "secondary-bg-color",
  }
  return (
    <p>
      <span className={`px-2 py-1 rounded-lg white-color ${btnStyle[props.status]}`} >
        {props.status}
      </span>
    </p>
  )
}



const Application = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const [state, setState] = useState({
    timeFrame: "",
    natureOfWork: "",
    typeOfWork: "",
    stage: ""
  })

  const { applicationsData, getApplicationsData, downloadPdfOrCsv, SearchApplications } = useCustomHook();

  useEffect(() => {
    getApplicationsData()
  }, [])

  console.log('applications data', applicationsData);

  const PopOver = ({ state }: any) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              state(true);
            }}
          >
            View Details
          </a>
        ),
      },

    ];
    return (
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
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
          <p className="font-medium">{companyName}</p>
          <p className="text-sm">{companyDetail}</p>
        </div>
      </div>
    )
  }

  const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const csvAllColum = ["No", "Date Applied", "Company", "Type of Work", "Internship Type", "Nature of Work", "Position", "Status"]
  const mainDrawerWidth = DrawerWidth();


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
  // const tableData = [
  //   {
  //     no: "01",
  //     date_applied: "01/07/2022",
  //     company: { name: "Alphabet Inc.", details: "Software Agency" },
  //     type_of_work: "Part Time",
  //     internship_type: "Un-Paid",
  //     nature_of_work: "On site",
  //     position: "UI/UX Designer",
  //     status: "Hired",

  //   },
  //   {
  //     no: "02",
  //     date_applied: "01/07/2022",
  //     company: { name: "Intuit Inc.", details: "Sports" },
  //     type_of_work: "Full Time",
  //     internship_type: "Paid",
  //     nature_of_work: "Hybrid (London)",
  //     position: "Business Analyst",
  //     status: "Offer Letter",
  //   },
  //   {
  //     no: "03",
  //     date_applied: "01/07/2022",
  //     company: { name: "ServiceNOW", details: "Software Solutions" },
  //     type_of_work: "Part Time",
  //     internship_type: "Un-Paid",
  //     nature_of_work: "Virtual",
  //     position: "SQA",
  //     status: "Rejected",
  //   },
  //   {
  //     no: "04",
  //     date_applied: "01/07/2022",
  //     company: { name: "kla Corporation Inc.", details: "Logistics" },
  //     type_of_work: "Full Time",
  //     internship_type: "Paid",
  //     nature_of_work: "Hybrid (London)",
  //     position: "Business Analyst",
  //     status: "Short Listed",
  //   },
  //   {
  //     no: "05",
  //     date_applied: "01/07/2022",
  //     company: { name: "SnowFlake Inc.", details: "Software Tech" },
  //     type_of_work: "Part Time",
  //     internship_type: "Un-Paid",
  //     nature_of_work: "Virtual",
  //     position: "SQA",
  //     status: "Interviewed",
  //   },
  //   {
  //     no: "06",
  //     date_applied: "01/07/2022",
  //     company: { name: "WorkDay Inc.", details: "Design Tech" },
  //     type_of_work: "Full Time",
  //     internship_type: "Paid",
  //     nature_of_work: "Hybrid (London)",
  //     position: "Business Analyst",
  //     status: "Rejected",
  //   },
  //   {
  //     no: "07",
  //     date_applied: "01/07/2022",
  //     company: { name: "Fortinet Inc.", details: "Game Agency" },
  //     type_of_work: "Part Time",
  //     internship_type: "Un-Paid",
  //     nature_of_work: "Virtual",
  //     position: "SQA",
  //     status: "Applied",
  //   },
  // ];
  const newTableData = applicationsData.map((item: any, index: number) => {
    const dateFormat = dayjs(item?.createdAt).format('DD/MM/YYYY');
    const typeOfWork = item?.internship?.internType?.replace("_", " ").toLowerCase();

    return (
      {
        no: applicationsData.length < 10 ? `0${index + 1}` : `${index + 1}`,
        date_applied: dateFormat,
        company: <CompanyData companyName={item?.internship?.company?.businessName}
          companyDetail={item?.internship?.company?.businessType} avatar={''} />,
        type_of_work: <span className="capitalize">{typeOfWork}</span>,
        internship_type: <span className="capitalize">{item?.internship?.salaryType?.toLowerCase()}</span>,
        nature_of_work: <span className="capitalize">{item?.internship?.locationType?.toLowerCase()}</span>,
        position: item.position,
        status: <ButtonStatus status={item?.stage} />,
        actions: <PopOver state={setShowStageStepper} />
      }
    )
  })

  const updateTimeFrame = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      timeFrame: event
    }))
  }
  const updateNatureOfWork = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      natureOfWork: event
    }))
  }
  const updateTypeOfWork = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      typeOfWork: event
    }))
  }
  const updateStage = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      stage: event
    }))
  }
  return (
    <>
      <PageHeader title="Applications" />
      <div className="flex flex-col gap-5">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24}>
            <SearchBar
              handleChange={SearchApplications}
              name="search"
              placeholder="Search"
            />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <FiltersButton
              label="Filters"
              onClick={() => { setShowDrawer(true) }}
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              setValue={() => {
                downloadPdfOrCsv(event, csvAllColum, newTableData, "Students Applications")
              }}
              value=""
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => {
                setShowDrawer(false);
              }}
              title="Filters"
            >
              <div key=".0">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-2">
                    <p>Time Fram</p>
                    <DropDown
                      name="Select"
                      options={["This weak", "Last weak", "This month", "Last month", "All"]}
                      setValue={() => { updateTimeFrame(event) }}
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.timeFrame}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Nature of Work</p>
                    <DropDown
                      name="Select"
                      options={[
                        "All",
                        "On-site",
                        "Hybrid",
                        "Virtual",
                      ]}
                      setValue={() => { updateNatureOfWork(event) }}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.natureOfWork}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Type of Work</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Paid",
                        "Un-paid",
                        "Part Time",
                        "Full Time",
                        "All"
                      ]}
                      setValue={() => { updateTypeOfWork(event) }}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.typeOfWork}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <p>Stage</p>
                    <DropDown
                      name="Select"
                      options={[
                        "Business analyst",
                        "Research analyst",
                        "Accountant",
                        "Administrator",
                        "HR Cordinator",
                        "All"
                      ]}
                      setValue={() => { updateStage(event) }}
                      requireCheckbox
                      showDatePickerOnVal="custom"
                      startIcon=""
                      value={state.stage}
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button type="default" size="middle" className="button-default-tertiary" onClick={() => { }}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary" onClick={() => { }}>Apply</Button>
                  </div>
                </div>
              </div>
            </Drawer>
            <Drawer
              closable
              width={mainDrawerWidth > 1400 ? 1000 : mainDrawerWidth > 900 ? 900 : mainDrawerWidth > 576 ? 600 : 300}
              open={showStageStepper}
              onClose={() => { setShowStageStepper(false) }}>
              <StageStepper />
            </Drawer>
          </Col>
          <Col xs={24}>
            <BoxWrapper>
              {
                listandgrid ? <div className="flex flex-row flex-wrap gap-6">
                  {
                    cardDummyArray.map((items: any, idx: any) => {
                      return (
                        <InternsCard />
                      )
                    })
                  }
                </div>
                  :
                  <GlobalTable
                    columns={columns}
                    tableData={newTableData}
                  />
              }

            </BoxWrapper>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Application;
