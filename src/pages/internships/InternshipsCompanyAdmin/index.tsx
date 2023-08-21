import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InternshipsIcon } from '../../../assets/images'
import {
  FiltersButton, PageHeader, InternshipProgressCard,
  BoxWrapper, NoDataFound, SearchBar
} from '../../../components'
import Drawer from '../../../components/Drawer'
import { Button, Col, Row, Input } from 'antd'
import constants, { ROUTES_CONSTANTS } from '../../../config/constants'
import useCustomHook from '../actionHandler'
import UserSelector from '../../../components/UserSelector'
import { useRecoilState } from 'recoil'
import { currentUserState, internshipFilterState, internshipPaginationState } from '../../../store'
import '../style.scss'

const InternshipsCompanyAdmin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    showDrawer: false,
  });
  const [tableParams, setTableParams]: any = useRecoilState(internshipPaginationState);
  const [filter, setFilter] = useRecoilState(internshipFilterState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };
  const currentUser = useRecoilState(currentUserState);

  const statusArr = [
    { value: "All", label: "All" },
    { value: "PUBLISHED", label: "Published" },
    { value: "REJECTED", label: "Rejected" },
    { value: "CLOSED", label: "Closed" },
    { value: "PENDING", label: "Pending" },
    { value: "DRAFT", label: "Draft" },
  ]

  const { getAllInternshipsData, internshipData,
    getAllDepartmentData, getAllLocationsData, departmentsData,
    locationsData }: any = useCustomHook();

  useEffect(() => {
    getAllDepartmentData();
    getAllLocationsData();
  }, [])

  useEffect(() => {
    let args = removeEmptyValues(filter);
    args.limit = currentUser[0].role === constants.COMPANY_ADMIN ? 1000 : 10;
    getAllInternshipsData(args, setLoading);
  }, [filter.search, filter.page]);


  const handleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }

  // handle apply filters 
  const handleApplyFilter = () => {
    let args = removeEmptyValues(filter);
    getAllInternshipsData(args, setLoading);
    setState((prevState) => ({
      ...prevState,
      showDrawer: false
    }))
  }

  // handle reset filters 
  const handleResetFilter = () => {
    let args = removeEmptyValues(filter);
    args.status = undefined;
    args.locationId = undefined;
    args.departmentId = undefined;
    getAllInternshipsData(args, setLoading);
    setFilter((prevState: any) => ({
      ...prevState,
      status: undefined,
      locationId: undefined,
      departmentId: undefined,
    }));
    // setState({ ...state, dateRange: true })
    // getAllInternshipsData();
    // setState((prevState) => ({
    //   ...prevState,
    //   status: undefined,
    //   location: undefined,
    //   department: undefined,
    // }))
  }

  const filteredStatusData = statusArr?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.value,
        label: item?.label
      }
    )
  })

  const filteredLocationData = locationsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  filteredLocationData?.unshift({ key: 'all', value: 'ALL', label: 'All' })

  const filteredDeparmentsData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  filteredDeparmentsData?.unshift({ key: 'all', value: 'ALL', label: 'All' })

  return (
    <>
      <PageHeader bordered title="Internships" />
      <div className="flex flex-col gap-8 internship-details">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24} className='input-wrapper'>
            <SearchBar
              className="search-bar"
              placeholder="Search by internship"
              handleChange={(e: any) => setFilter({ ...filter, search: e })}
            />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24}
            className="flex sm:flex-row flex-col justify-end gap-4">
            <FiltersButton label="Filters" onClick={handleDrawer} />
            <Drawer closable open={state.showDrawer} onClose={handleDrawer} title="Filters" >
              <>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label='Status'
                      placeholder='Select'
                      value={filter.status}
                      onChange={(event: any) => {
                        setFilter({
                          ...filter,
                          status: event,
                        });
                      }}
                      options={filteredStatusData}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Location"
                      placeholder="Select"
                      value={filter.locationId}
                      onChange={(event: any) => {
                        setFilter({
                          ...filter,
                          locationId: event,
                        });
                      }}
                      options={filteredLocationData}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <UserSelector
                      label="Department"
                      placeholder="Select"
                      value={filter.departmentId}
                      onChange={(event: any) => {
                        setFilter({
                          ...filter,
                          departmentId: event,
                        });
                      }}
                      options={filteredDeparmentsData}
                    />
                  </div>
                  <div className="flex flex-row gap-3 justify-end">
                    <Button type="default" size="middle"
                      className="button-default-tertiary" onClick={handleResetFilter}>Reset</Button>
                    <Button type="primary" size="middle" className="button-tertiary"
                      onClick={handleApplyFilter}>Apply</Button>
                  </div>
                </div>
              </>
            </Drawer>
            <Button
              type="primary"
              size="middle"
              icon={<InternshipsIcon />}
              className="button-tertiary"
              onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP) }}>
              New Internship
            </Button>
          </Col>
        </Row>
        {<div className='flex flex-col gap-7'>
          {internshipData?.length !== 0 ?
            internshipData?.map((item: any, index: any) => {
              return (
                <BoxWrapper key={index} boxShadow>
                  <InternshipProgressCard
                    item={item}
                    title={item?.title}
                    status={item?.status}
                    department={item?.department?.name}
                    internType={item?.internType}
                    postedBy={`${item?.jobPoster?.firstName} ${item?.jobPoster?.lastName}`}
                    locationType={item?.locationType}
                    location={item?.location?.name}
                    createdAt={item?.createdAt}
                    closingDate={item?.closingDate}
                    interns={item?.interns}
                  />
                </BoxWrapper>
              )
            }) : <NoDataFound />
          }
        </div>}
      </div>
    </>
  )
}

export default InternshipsCompanyAdmin
