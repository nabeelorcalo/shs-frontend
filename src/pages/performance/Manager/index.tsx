import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Progress, Space, Row, Col, Select, Table } from 'antd';
import type { PaginationProps } from 'antd';
import {LoadingOutlined} from "@ant-design/icons";
import { PageHeader, SearchBar, GlobalTable, DropDown, BoxWrapper } from "../../../components";
import { GlassMagnifier, MoreIcon, TalentBadge, IconAngleDown, IconCloseModal } from '../../../assets/images';
import '../style.scss';
import { ROUTES_CONSTANTS } from "../../../config/constants";
import usePerformanceHook from "../actionHandler";
import dayjs from 'dayjs';
import "./style.scss";


const ManagerPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const {
    getAllPerformance,
    allPerformance,
    totalRequests,
    getDepartments,
    departmentsList,
  } = usePerformanceHook();
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const [timeFrameValue, setTimeFrameValue] = useState('Time Frame');
  const [pageNo, setPageNo] = useState(1);
  const initReqBody = {
    page: 1,
    limit: 8,
  }
  const [reqBody, setReqBody] = useState(initReqBody);
  const [loadingDep, setLoadingDep] = useState(false);


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getAllPerformance(setLoadingAllPerformance, reqBody);
    getDepartments({page: 1, limit: 100}, setLoadingDep);
  }, [reqBody])

  // useEffect(() => {
  //   getAllPerformance(setLoadingAllPerformance, reqBody);
  // }, [reqBody])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSearch = (value: any) => {
    setReqBody((prev) => {
      return {
        ...prev,
        search: value
      }
    })
  }

  const getFilterType = (value:any) => {
    let filterType;
    if (value === "This Week") {
      filterType = 'THIS_WEEK';
    } else if (value === "Last Week") {
      filterType = 'LAST_WEEK';
    } else if (value === "This Month") {
      filterType = 'THIS_MONTH';
    } else if (value === "Last Month") {
      filterType = 'LAST_MONTH';
    } else {
      filterType = 'DATE_RANGE';
    }
    return filterType;
  }

  const handleTimeFrameFilter = (value: string) => {
    let filterType = getFilterType(value);
    const date = dayjs(new Date()).format("YYYY-MM-DD");
    if(filterType === 'DATE_RANGE') {
      const [startDate, endDate] = value.split(",").map((date:any) => date.trim())
      setTimeFrameValue(`${startDate} , ${endDate}`);
      setReqBody((prev) => {
        return {
          ...prev,
          filterType: filterType,
          startDate: startDate,
          endDate: endDate
        }
      })
    } else {
      setTimeFrameValue(value);
      setReqBody((prev) => {
        return {
          ...prev,
          filterType: filterType,
          currentDate: date
        }
      })
    }
  }

  const handleDepartmentFilter = (value:any) => {
    setReqBody((prev) => {
      return {
        ...prev,
        department: value
      }
    })
  }

  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setPageNo(page.current)
    setReqBody((prev:any) => {
      return {...prev, page: page.current}
    })
  };


  // Performance Table Column
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
        let overallPerf = Math.round(row.sumOverallRating);
        return (
          <Space size="middle" className="flex">
            <Progress
              size={[200, 13]}
              percent={overallPerf}
              strokeColor={overallPerf < 50 ? "#E95060" : "#4A9D77"}
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
            {overallPerf > 89 ? <TalentBadge /> : <></>}
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
              { label: 'View Details', key: 'ViewDetails', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${row?.inEvaluationUserId}/${ROUTES_CONSTANTS.DETAIL}`) },
              { label: 'Evaluate', key: 'Evaluate', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${row.inEvaluationUserId}`)},
            ]}}
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
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
            handleChange={handleSearch}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <DropDown
            name="time-frame"
            options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
            setValue={handleTimeFrameFilter}
            value={timeFrameValue}
            showDatePickerOnVal='Date Range'
            requireRangePicker
            dateRangePlacement="bottomRight"
          />
          <Select
            className="filled sortby-department"
            placeholder="Department"
            suffixIcon={<IconAngleDown />}
            onChange={handleDepartmentFilter}
            placement="bottomRight"
            clearIcon={<IconCloseModal />}
            allowClear
          >
            {departmentsList?.map((department:any) => {
              return (
                <Select.Option key={department?.id} value={department?.id}>{department?.name}</Select.Option>
              )  
            })}
          </Select>
        </Col>
        <Col xs={24}>
          <div className="shs-table-card">
            <div className="shs-table">
              <Table
                loading={{spinning: loadingAllPerformance, indicator: <LoadingOutlined />}}
                columns={columnNames}
                dataSource={allPerformance}
                onChange={(page:any, pageSize:any) => handlePagination(page, pageSize)}
                pagination={{
                  pageSize: 8,
                  current: pageNo,
                  total: totalRequests,
                  showSizeChanger: false,
                  showTotal: (total) => <>Total: {total}</>
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      
    </div>
  )
}

export default ManagerPerformance;