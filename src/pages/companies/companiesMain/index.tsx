import { useEffect, useState } from "react";
import {
  GlobalTable,
  PageHeader,
  BoxWrapper,
  DropDown,
  Loader,
  Notifications,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import { GlassMagnifier, More } from "../../../assets/images";
import { Input, MenuProps } from "antd";
import { Dropdown, Avatar, Row, Col } from "antd";
import useCustomHook from "../actionHandler";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { currentUserState } from "../../../store";
import { useRecoilState } from "recoil";
import "./style.scss";

const CompaniesMain = () => {
  const navigate = useNavigate();
  const { CHAT, COMPANYPROFILEUNI } = ROUTES_CONSTANTS;
  const [searchValue, setSearchValue] = useState("");
  const currentUser = useRecoilState(currentUserState);
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
    companiesUniversity,
    getAllCompaniesData,
    debouncedSearch,
    isLoading,
    downloadPdfOrCsv,
    selectedProfile,
  } = useCustomHook();

  useEffect(() => {
    getAllCompaniesData(currentUniId, searchValue);
  }, [searchValue]);

  const PopOver = ({ item }: any) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a
            rel="noopener noreferrer"
            onClick={() => {
              navigate(`${COMPANYPROFILEUNI}/${item?.id}`, { state: item });
            }}
          >
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
              navigate(`${CHAT}/${selectedProfile?.id} `);
            }}
          >
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

  // handle search companies
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  const newTableData = companiesUniversity?.map((item: any, index: any) => {
    return {
      key: index,
      id: companiesUniversity?.length < 10 ? `0${index + 1}` : index + 1,
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

  return (
    <>
      <PageHeader title="Companies" />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className="search-bar"
            placeholder="Search by company"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
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
              <GlobalTable columns={columns} tableData={newTableData} />
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
