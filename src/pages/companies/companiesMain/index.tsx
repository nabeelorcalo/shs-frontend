import { useEffect, useState } from "react";
import {
  GlobalTable, PageHeader,
  BoxWrapper, DropDown, Loader
} from "../../../components";
import { useNavigate } from 'react-router-dom';
import { GlassMagnifier, More } from "../../../assets/images"
import { Input, MenuProps } from 'antd';
import { Dropdown, Avatar, Row, Col } from 'antd';
import useCustomHook from "../actionHandler";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { currentUserState } from '../../../store';
import { useRecoilState } from "recoil";
import "./style.scss";
import Index from "../../../components/calendars/FullCalendarComp/drawerComp";

// const btnStyle = {
//   "applied": "p-1 rounded-lg primary-bg-color white-color",
//   "interviewed": "p-1 rounded-lg text-info-bg-color white-color",
//   "shortlisted": "p-1 rounded-lg purple-bg white-color",
//   "offerletter": "p-1 rounded-lg light-purple-bg white-color",
//   "hired": "p-1 rounded-lg text-success-bg-color white-color",
//   "rejected": "p-1 rounded-lg secondary-bg-color white-color",
// }

const CompanyData = ({ companyName, companyNature }: any) => {
  return (
    <div className="flex flex-row align-center gap-2">
      <Avatar
        src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
      />
      <div>
        <p className="font-medium">{companyName}</p>
        <p className="text-sm">{companyNature}</p>
      </div>
    </div>
  )
}

// const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const CompaniesMain = () => {
  const navigate = useNavigate();
  const { CHAT, COMPANYPROFILEUNI } = ROUTES_CONSTANTS;
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [searchValue, setSearchValue] = useState('');
  const { companiesUniversity, getAllCompaniesData,
    debouncedSearch, isLoading, downloadPdfOrCsv, selectedProfile } = useCustomHook()
  console.log('current user', currentUser.userUniversity.universityId);

  useEffect(() => {
    getAllCompaniesData(currentUser.userUniversity.universityId, searchValue)
  }, [searchValue])
  console.log('api data', companiesUniversity);

  // handle search internships 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };

  // const [value, setValue] = useState("")
  // const [showDrawer, setShowDrawer] = useState(false)
  // const [showStageStepper, setShowStageStepper] = useState(false)
  // const [state, setState] = useState(false)
  // const [listandgrid, setListandgrid] = useState(false)
  // const [isToggle, setIsToggle] = useState(false)

  // const action = useCustomHook()
  const csvAllColum = ["No", "Company", "Company Rep", "Email", "Phone No.", "Students Hired"]

  const PopOver = ({ item }: any) => {
    const items: MenuProps["items"] = [
      {
        key: "1",
        label: (
          <a rel="noopener noreferrer"
            onClick={() => { navigate(`${COMPANYPROFILEUNI}/${selectedProfile?.id}`, { state: item }) }}>
            Profile
          </a>
        ),
      },

      {
        key: "2",
        label: (
          <a rel="noopener noreferrer"
            onClick={() => { navigate(`${CHAT}/${selectedProfile?.id} `) }}>
            Chat
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
  // const items: MenuProps["items"] = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         rel="noopener noreferrer"
  //         onClick={() => {
  //           navigate(`${COMPANYPROFILEUNI}/${action?.selectedProfile?.id}`);
  //         }}
  //       >
  //         Profile
  //       </a>

  //     ),
  //   },

  //   {
  //     key: "2",
  //     label: (
  //       <a
  //         rel="noopener noreferrer"
  //         onClick={() => {
  //           navigate(`${CHAT}/${action?.selectedProfile?.id} `);
  //         }}
  //       >
  //         Chat
  //       </a>
  //     ),
  //   },
  // ];

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
      title: "Actions",
    },
    // {
    //   dataIndex: "actions",
    //   key: "actions",
    //   title: "Actions",
    //   render: (_: any, object: any) => {
    //     return <Dropdown
    //       menu={{ items }}
    //       placement="bottomRight"
    //       trigger={[`click`]}
    //       overlayStyle={{ width: 180 }}
    //     >
    //       <More onClick={() => {action?.setSelectedProfile(object); console.log('hello')}} className="cursor-pointer" />
    //     </Dropdown>
    //   }

    // },
  ];

  // const tableData = [
  //   {
  //     id: "01",
  //     company: { name: "Alphabet Inc.", details: "Software Agency" },
  //     company_rep: "Deing Jim M",
  //     email: "deing.jing@gmail.com",
  //     phone_no: "+44 5459 90872435",
  //     students_hired: 14,
  //   },
  //   {
  //     id: "02",
  //     company: { name: "Intuit Inc.", details: "Sports" },
  //     company_rep: "Robbert Patenson",
  //     email: "robert.patenson@gmail.com",
  //     phone_no: "+44 5459 90872435",
  //     students_hired: 4,
  //   },
  //   {
  //     id: "03",
  //     company: { name: "ServiceNOW", details: "Software Solutions" },
  //     company_rep: "Silwa Kreig",
  //     email: "silwa.kreig@gmail.com",
  //     phone_no: "+44 5459 90872435",
  //     students_hired: 12,
  //   },
  //   {
  //     id: "04",
  //     company: { name: "Alphabet Inc.", details: "Software Agency" },
  //     company_rep: "Deing Jim M",
  //     email: "deing.jing@gmail.com",
  //     phone_no: "+44 5459 90872435",
  //     students_hired: 14,
  //   },
  //   {
  //     id: "05",
  //     company: { name: "Intuit Inc.", details: "Sports" },
  //     company_rep: "Robbert Patenson",
  //     email: "robert.patenson@gmail.com",
  //     phone_no: "+44 5459 90872435",
  //     students_hired: 4,
  //   },
  //   {
  //     id: "06",
  //     company: { name: "ServiceNOW", details: "Software Solutions" },
  //     company_rep: "Silwa Kreig",
  //     email: "silwa.kreig@gmail.com",
  //     phone_no: "+44 5459 90872435",
  //     students_hired: 12,
  //   },
  // ];

  const newTableData = companiesUniversity?.map((item: any, index: any) => {
    return (
      {
        key: index,
        id: companiesUniversity?.length < 10 ? `0${index + 1}` : index + 1,
        company:
          <CompanyData
            companyName={item?.businessName}
            companyNature={item?.businessSector}
          />,
        company_rep: `${item?.user?.firstName} ${item?.user?.lastName}`,
        email: item?.user?.email,
        phone_no: item?.user?.phoneNumber,
        students_hired: item?.internCount,
        actions: <PopOver item={item} />
      }
    )
  })


  return (
    <>
      <PageHeader title="Companies" />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
          />
          {/* <SearchBar
            handleChange={() => { }}
            name="search bar"
            placeholder="Search"
            size="middle"
          /> */}
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end">
          <DropDown
            options={[
              'PDF',
              'Excel'
            ]}
            requiredDownloadIcon
            setValue={() => {
              downloadPdfOrCsv(event, csvAllColum, newTableData, "Companies")
            }}
            value=""
          />
        </Col>
        <Col xs={24}>
          {!isLoading ? <BoxWrapper>
            <GlobalTable columns={columns} tableData={newTableData} />
          </BoxWrapper> : <Loader />}
        </Col>
      </Row>

    </>
  );
};

export default CompaniesMain;
