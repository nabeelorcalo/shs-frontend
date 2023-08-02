import React, { useEffect, useState } from "react";
import { Row, Col, Select, Avatar } from "antd";
import {
  BoxWrapper,
  DropDown,
  Notifications,
  PageHeader,
  SearchBar,
} from "../../../components";
import UniversityTable from "./universityTable";
import useCustomHook from "./actionHandler";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { ThreeDots } from "../../../assets/images";
import {  useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState } from "recoil";
import { ExternalChatUser } from "../../../store";
import "./style.scss";

const { Option } = Select;

const index: React.FC = () => {
  const [Country, setCountry] = useState(undefined);
  const [searchValue, setSearchValue] = useState("");
  const [chatUser, setChatUser] = useRecoilState(ExternalChatUser);
  
  const TableColumn = [
    "No.",
    "Avater",
    "University Name",
    "Univerity Rep",
    "Email",
    "Contact",
    "City",
  ];

  const action = useCustomHook();
  const navigate = useNavigate();
  const { getUniversities, universitiesData }: any = useCustomHook();
  console.log(universitiesData, "universitiesData");

  useEffect(() => {
    getUniversities(Country, searchValue);
  }, [searchValue, Country]);

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

  const companiesData = universitiesData?.map((item: any, index: any) => {
    return {
      key: index,
      value: `${item.university.city ? item.university.city : "N/A"}`,
      label: `${item.university.city ? item.university.city : "N/A"}`,
    };
  });

  const univertyTableData = universitiesData?.map(
    (item: any, index: number) => {
      return {
        key: index,
        no: universitiesData?.length < 10 && `0${index + 1}`,
        id: item?.id,
        logo:
          <Avatar size={50}
            src={`${constants.MEDIA_URL}/${item?.university?.logo?.mediaId}.${item?.university?.logo?.metaData?.extension}`}
          >
            {item?.university?.firstName?.charAt(0)}{item?.university?.lastName?.charAt(0)}
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
                        `/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}/${item.id}`,
                        { state: item }
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

  const handleChangeSearch = (e: any) => {
    setSearchValue(e);
  };


  console.log("companiesData", universitiesData)

  return (
    <div className="company-university">
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChangeSearch} />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col gap-4 justify-end"
        >
          <Select onChange={(e: any) => setCountry(e)}
            value={Country} className="w-[200px]" placeholder="City" >
            {companiesData?.map((options: any) => <Option value={options.value}>
              {options.label}
            </Option>)}
          </Select>
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(
                event,
                TableColumn,
                univertyTableData,
                "Report"
              );
              Notifications({
                title: "Success",
                description: "University list downloaded ",
                type: "success",
              });
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityTable
              UniversityTableColumn={UniversityTableColumn}
              univertyTableData={univertyTableData}
            />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};
export default index;
