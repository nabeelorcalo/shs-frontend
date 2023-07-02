import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Progress, Space, MenuProps, Row, Col } from 'antd';
import { PageHeader, SearchBar, GlobalTable, DropDown, BoxWrapper } from "../../../components";
import { GlassMagnifier, MoreIcon, TalentBadge } from '../../../assets/images';
import '../style.scss';
import { ROUTES_CONSTANTS } from "../../../config/constants";
import usePerformanceHook from "../actionHandler";
import dayjs from 'dayjs';


const ManagerPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const {getAllPerformance, allPerformance, getEvaluatdBy, evaluatedByList, getDepartments, departmentsList} = usePerformanceHook();
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const initReqBody = {
    page: 1,
    limit: 8,
  }
  const [reqBody, setReqBody] = useState(initReqBody)
  const [filterParams, setFilterParams] = useState({});
  const [loadingEvalbyList, setLoadingEvalbyList] = useState(false);
  const [loadingDep, setLoadingDep] = useState(false);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getAllPerformance(setLoadingAllPerformance, reqBody);
    getEvaluatdBy(setLoadingEvalbyList)
    getDepartments({page: 1, limit: 100}, setLoadingDep);
  }, [])

  useEffect(() => {
    getAllPerformance(setLoadingAllPerformance, reqBody);
  }, [reqBody])

  const evaluationHistoryData = [
    {
      id: 1,
      no: 1,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 40,
      isBadged: true,
    },
    {
      id: 2,
      no: 2,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 80,
      isBadged: false,
    },
    {
      id: 3,
      no: 3,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 50,
      isBadged: true,
    },
    {
      id: 4,
      no: 4,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 30,
      isBadged: false,
    },
    {
      id: 5,
      no: 5,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 100,
      isBadged: true,
    },
  ];

  const timeFrameOptions = [
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Date Range'
  ];

  const professionOptions = [
    'Design',
    'Business Analyst',
    'Data Scientist',
    'Product Manager',
    'Developer'
  ];

  const items: MenuProps['items'] = [
    {
      label:
        < Link
          className="bread-crumb"
          to={`${1}/${ROUTES_CONSTANTS.DETAIL}`}
        >
          View Details
        </Link >,
      key: '0',
    },
    {
      label:
        <Link
          className="bread-crumb"
          to={`${1}/${ROUTES_CONSTANTS.EVALUATE}`}
        >
          Evaluate
        </Link >,
      key: '1',
    },
  ];

  const [state, setState] = useState({
    openSidebar: false,
    timeFrameVal: 'Time Frame',
    professionVal: 'Status',
  });

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      timeFrameVal: value,
    }));
  }

  const professionSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      professionVal: value,
    }));
  }
  console.log("allPerformance: ", allPerformance)
  const columnNames = [
    {
      title: 'No.',
      key: 'no',
      render: (_:any, row:any, index:any) => (
        <>{index + 1}</>
      ),
    },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (_: any, row:any) => (
        <Avatar size={32} src={row.avatar} alt={row.userName}>
          {row.userName.split(' ').map((name:any) => name.charAt(0))}
        </Avatar>
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_:any, row:any) => (
        <>{row?.userName}</>
      ),
    },
    {
      title: 'Department',
      key: 'department',
      render: (_: any, row:any) => (
        <p>
          {row?.department}
        </p >
      ),
    },
    {
      title: 'Last Evaluation',
      key: 'date',
      render: (_:any, row:any) => (
        dayjs(row.lastEvaluationDate).format('DD/MM/YYYY')
      ),
    },
    {
      title: 'Total Evaluations',
      key: 'totalEvaluations',
      render: (_: any, row:any) => (
        row?.totalEvaluations
      ),
    },
    {
      title: 'Overall Performance',
      key: 'overallPerformance',
      render: (_: any, row:any) => {
        let val = Math.round(row.sumOverallRating);
        return (
          <Space size="middle" className="flex">
            <Progress
              size={[200, 13]}
              percent={val}
              strokeColor={val < 50 ? "#E95060" : "#4A9D77"}
              format={(percent: any) => {
                let val = Math.round(percent);

                return (
                  <p
                    className={
                      "myClass font-normal " +
                      (val < 50 ? "secondary-color" : "teriary-color")
                    }
                  >
                    {val}%
                  </p>
                )
              }}
            />
            {row.sumOverallRating > 89 ? <TalentBadge /> : <></>}
          </Space>
        )
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, row:any) => (
        <Space size="middle">
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            overlayClassName='menus_dropdown_main'
            menu={{ items: [
              { label: 'View Details', key: 'ViewDetails', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${row.inEvaluationUserId}/${ROUTES_CONSTANTS.DETAIL}`) },
              { label: 'Evaluate', key: 'Evaluate', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${row.inEvaluationUserId}`)},
            ]}}
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className="manager-performance-history">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Performance
          </div>
        }
      />
      <Row gutter={[20,20]}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <DropDown
            name="time-frame"
            options={timeFrameOptions}
            setValue={() => timeFrameSelection(event)}
            value={state.timeFrameVal}
            showDatePickerOnVal='Date Range'
            requireDatePicker
            placement='topLeft'
          />

          <DropDown
            name="profession"
            options={professionOptions}
            setValue={() => professionSelection(event)}
            value={state.professionVal}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <div className="performace-history-list">
              <GlobalTable
                columns={columnNames}
                tableData={allPerformance}
                pagination={false}
              />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
      {/* <div className="flex performance-header">
        <div className="w-[30%] performance-search-bar">
          <SearchBar
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </div>

        <div className="flex justify-center ml-auto gap-4 manager-dropdowns-container">
          <DropDown
            name="time-frame"
            options={timeFrameOptions}
            setValue={() => timeFrameSelection(event)}
            value={state.timeFrameVal}
            showDatePickerOnVal='Date Range'
            requireDatePicker
            placement='topLeft'
          />

          <DropDown
            name="profession"
            options={professionOptions}
            setValue={() => professionSelection(event)}
            value={state.professionVal}
          />
        </div>
      </div> */}


    </div>
  )
}

export default ManagerPerformance;