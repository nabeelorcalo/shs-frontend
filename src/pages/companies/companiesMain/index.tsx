import { useEffect, useState } from "react";
import {
  GlobalTable,
  PageHeader,
  BoxWrapper,
  DropDown,
  Loader,
  Notifications,
  SearchBar,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import { More } from "../../../assets/images";
import { Dropdown, Avatar, Row, Col, TablePaginationConfig, MenuProps } from "antd";
import useCustomHook from "../actionHandler";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { ExternalChatUser, companyFilterState, companyPaginationState, currentUserState } from "../../../store";
import { useRecoilState, useResetRecoilState } from "recoil";
import "./style.scss";

const CompaniesMain = () => {
  const navigate = useNavigate();
  const { CHAT, COMPANYPROFILEUNI } = ROUTES_CONSTANTS;
  const currentUser = useRecoilState(currentUserState);
  // Table pagination states 
  const [tableParams, setTableParams]: any = useRecoilState(companyPaginationState);
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  const [filter, setFilter] = useRecoilState(companyFilterState);
  const resetList = useResetRecoilState(companyFilterState);
  const resetTableParams = useResetRecoilState(companyPaginationState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };

  const currentUniId = currentUser[0]?.userUniversity?.id;

  const csvAllColum = [
    "No",
    "Company",
    "Company Rep",
    "Email",
    "Phone No.",
    "Students Hired",
  ];

  const {
    allUniversityCompanies,
    getAllCompaniesData,
    isLoading,
    downloadPdfOrCsv,
    selectedProfile,
  } = useCustomHook();


  useEffect(() => {
    let args = removeEmptyValues(filter);
    getAllCompaniesData(currentUniId, args, setLoading);
  }, [filter.search, filter.page]);

  // to reset page 
  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const PopOver = ({ item }: any) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              navigate(`${COMPANYPROFILEUNI}/${item?.id}`, { state: item });
            }}>
            Profile
          </a>
        ),
      },

      {
        key: "2",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              setChatUser(item?.admin);
              navigate(`${CHAT}/${item?.adminId}`);
            }}>
            Chat
          </a>
        ),
      },
    ];

    return (
      <Dropdown
        menu={{ items }}
        trigger={["click"]}
        placement="bottomRight"
        overlayStyle={{ width: 180 }}
      >
        <More />
      </Dropdown>
    );
  };

  const CompanyData = ({ companyName, companyNature, CompanyLogo }: any) => {
    return (
      <div className="flex flex-row align-center gap-2">
        <Avatar src={CompanyLogo}>
          {companyName?.charAt(0)}
          {companyNature?.charAt(0)}
        </Avatar>
        <div>
          <p className="font-semibold">{companyName}</p>
          <p className="text-sm">{companyNature}</p>
        </div>
      </div>
    );
  };

  const columns = [
    {
      dataIndex: "id",
      key: "id",
      title: "No.",
    },
    {
      dataIndex: "company",
      key: "company",
      title: "Company",
    },
    {
      dataIndex: "company_rep",
      key: "company_rep",
      title: "Company Rep",
    },
    {
      dataIndex: "email",
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_no",
      key: "phone_no",
      title: "Phone No.",
    },
    {
      dataIndex: "students_hired",
      key: "students_hired",
      title: "Students Hired",
    },
    {
      dataIndex: "actions",
      key: "actions",
      title: <div className="text-center">Actions</div>,
    },
  ];
  const companiesUniversity = allUniversityCompanies?.data

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };
  const newTableData = companiesUniversity?.map((item: any, index: any) => {
    return {
      key: index,
      id: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
      company: (
        <CompanyData
          companyName={item?.businessName}
          companyNature={item?.businessSector}
          CompanyLogo={`${constants.MEDIA_URL}/${item?.logo?.mediaId}.${item?.logo?.metaData?.extension}`}
        />
      ),
      company_rep: `${item?.admin?.firstName} ${item?.admin?.lastName}`,
      email: item?.admin?.email ?? "N/A",
      phone_no: `${item?.admin?.phoneCode}${item?.admin?.phoneNumber}` ?? "N/A",
      students_hired: item?.internCount ?? "N/A",
      actions: <PopOver item={item} />,
    };
  });

  const downloadCSVFile = companiesUniversity?.map(
    (item: any, index: number) => {
      return {
        id: companiesUniversity?.length < 10 ? `0${index + 1}` : index + 1,
        company: item?.businessName,
        company_rep: `${item?.admin?.firstName} ${item?.admin?.lastName}`,
        email: item?.admin?.email ?? "N/A",
        phone_no:
          `${item?.admin?.phoneCode}${item?.admin?.phoneNumber}` ?? "N/A",
        students_hired: item?.internCount ?? "N/A",
      };
    }
  );

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
      <PageHeader title="Companies" />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <SearchBar
            className="search-bar"
            placeholder="Search by company"
            handleChange={(e: any) => setFilter({ ...filter, search: e })}
          />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col justify-end"
        >
          <DropDown
            options={["PDF", "Excel"]}
            requiredDownloadIcon
            setValue={() => {
              downloadPdfOrCsv(
                event,
                csvAllColum,
                downloadCSVFile,
                "Companies"
              );
              Notifications({
                title: "Success",
                description: "Companies list downloaded",
                type: "success",
              });
            }}
            value=""
          />
        </Col>
        <Col xs={24}>
          {!isLoading ? (
            <BoxWrapper>
              <GlobalTable
                columns={columns}
                tableData={newTableData}
                loading={loading}
                pagination={tableParams?.pagination}
                handleTableChange={handleTableChange}
                pagesObj={allUniversityCompanies?.pagination}
              />
            </BoxWrapper>
          ) : (
            <Loader />
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompaniesMain;
