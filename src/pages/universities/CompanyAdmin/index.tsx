import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Select, Avatar, TablePaginationConfig } from "antd";
import {
  BoxWrapper,
  DropDown,
  GlobalTable,
  Notifications,
  PageHeader,
  SearchBar,
} from "../../../components";
import UniversityTable from "./universityTable";
import useCustomHook from "./actionHandler";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { ThreeDots } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState, useResetRecoilState } from "recoil";
import { ExternalChatUser, currentUserState, universityFilterState, universityPagginationState } from "../../../store";
import "./style.scss";

const index: React.FC = () => {
  const [tableParams, setTableParams]: any = useRecoilState(universityPagginationState);
  const [filter, setFilter] = useRecoilState(universityFilterState);
  const [loading, setLoading] = useState(true);
  const [Country, setCountry] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const resetList = useResetRecoilState(universityFilterState);
  const resetTableParams = useResetRecoilState(universityPagginationState);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };
  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const TableColumn = [
    "No.",
    "University Name",
    "Univerity Rep",
    "Email",
    "Contact",
    "City",
  ];

  const action = useCustomHook();
  const navigate = useNavigate();
  const { getUniversities, allUniversitiesData }: any = useCustomHook();
  const userStateData = useRecoilState(currentUserState)
  const companiesData: any = useRef([]);

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getUniversities(args, setLoading);
  }, [filter]);
  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const universitiesData = allUniversitiesData?.data;

  const UniversityTableColumn = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
      dataIndex: "logo",
      key: "logo",
      title: "Logo",
    },
    {
      dataIndex: "universityName",
      key: "universityName",
      title: "University Name",
    },
    {
      dataIndex: "universityRep",
      key: "universityRep",
      title: "University Rep",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "contact",
      key: "contact",
      title: "Contact",
    },
    {
      dataIndex: "city",
      key: "city",
      title: "City",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const unique = [...new Set(universitiesData?.map((item: any) => item.university.city))]

  if (!companiesData.current.length) {
    companiesData.current = unique?.map((item: any, index: any) => {
      return {
        key: index,
        value: `${item ? item : "N/A"}`,
        label: `${item ? item : "N/A"}`,
      };
    });
  }

  const univertyTableData = universitiesData?.map(
    (item: any, index: number) => {

      return {
        key: index,
        // no: universitiesData?.length < 10 ? `0${index + 1}` : index + 1,
        no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
        id: item?.id,
        logo:
          <Avatar size={50}
            src={`${constants.MEDIA_URL}/${item?.university?.logo?.mediaId}.${item?.university?.logo?.metaData?.extension}`}
          >
            {item?.university?.name?.charAt(0)}{item?.university?.name?.charAt(0)}
          </Avatar>,
        universityName: item?.university?.name,
        universityRep: `${item?.contact?.firstName} ${item?.contact?.lastName}`,
        email: item?.university?.email ? item?.university?.email : "N/A",
        contact: item?.university?.phoneNumber
          ? item?.university?.phoneNumber
          : "N/A",
        city: item?.university?.city,
        action: (
          <DropDownNew
            placement={"bottomRight"}
            items={[
              {
                label: (
                  <p
                    onClick={() =>
                      navigate(
                        `/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}/${item?.id}`,
                        { state: { data: item, companyId: userStateData[0]?.company.id } }
                      )
                    }
                  >
                    View Interns
                  </p>
                ),
                key: "interns",
              },
              {
                label: (
                  <p
                    onClick={() =>
                      navigate(
                        `/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`,
                        { state: item }
                      )
                    }
                  >
                    profile
                  </p>
                ),
                key: "profile",
              },
              {
                label: (
                  <p
                    onClick={() => {
                      setChatUser(item?.contact);
                      navigate(`${ROUTES_CONSTANTS.CHAT}/${item?.contact?.id}`);
                    }}
                  >
                    Chat
                  </p>
                ),
                key: "chat",
              },
            ]}
          >
            <ThreeDots className="cursor-pointer" />
          </DropDownNew>
        ),
      };
    }
  );

  const downloadCSVFile = universitiesData?.map(
    (item: any, index: number) => {
      return {
        no: universitiesData?.length < 10 ? `0${index + 1}` : index + 1,
        universityName: item?.university?.name,
        universityRep: `${item?.contact?.firstName} ${item?.contact?.lastName}`,
        email: item?.university?.email ? item?.university?.email : "N/A",
        contact: item?.university?.phoneNumber
          ? item?.university?.phoneNumber
          : "N/A",
        city: item?.university?.city,
      };
    }
  );

  return (
    <div className="company-university">
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={(e: any) => setFilter({ ...filter, q: e })} placeholder="Search by name" />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col gap-4 justify-end"
        >
          <Select
            allowClear
            value={Country}
            placeholder="City"
            className="w-[200px]"
            options={companiesData.current}
            onChange={(e: any) => setFilter({ ...filter, city: e })}
          />
          <DropDown
            requiredDownloadIcon
            options={["PDF", "Excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(
                event,
                TableColumn,
                downloadCSVFile,
                "Universities"
              );
              Notifications({
                title: "Success",
                description: "University list downloaded",
                type: "success",
              });
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <GlobalTable
              columns={UniversityTableColumn}
              tableData={univertyTableData}
              loading={loading}
              pagination={tableParams?.pagination}
              pagesObj={allUniversitiesData?.pagination}
              handleTableChange={handleTableChange}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};
export default index;
