import { MoreOutlined } from '@ant-design/icons';
import React from 'react'
import GlobalTable from '../../../components/Table/Table'
import pf from '../../../assets/images/profile/university/small.svg';


const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No",
    },
    {
        dataIndex: "img",
        key: "img",
        title:"Avatar"
    },
  
    {
      dataIndex: "name",
      key: "name",
      title: "Name",
    },
    
    {
      dataIndex: "desgination",
      key: "desgination",
      title: "Desgination",
    },
    
    {
      dataIndex: "noOfInterns",
      key: "noOfInterns",
      title: "Assigned Interns",
    },
   
  
    {
      dataIndex: "status",
      render: (_: any, data: any) => (
        <div
          className="table-status-style"
          style={{
            backgroundColor:
              data.status === "Pending"
                ? "#FFC15D"
                : data.status === "Approved"
                ? "#3DC475"
                : data.status === "Rejected"
                ? "#D83A52"
                : "",
            color: "#FFFFFF",
            padding: " 2px 3px 2px 3px",
            borderRadius: "4px",
          }}
        >
          {data.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },
  
    {
      dataIndex: "Actions",
      // render: (_: any, data: any) => (
      //     <div className='border-solid border-2 border-indigo-600'>
      //       p
      //     </div>
      // ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const tableData = [
    {
      Actions: (
        <div>
          <MoreOutlined />
        </div>
      ),
     img:(<div><img src={pf} alt="" /></div>),
      status: "Approved",
      desgination: "Data Research Manager",
      Email: "michael.mitc@example.com",
      no: "01",
      PhoneNumber: "070 3397 6621 ",
      name: "Amelia Clark",
    //   city: "London",
    //   hired: "Yes",
       noOfInterns: "03",
    },
    {
      Actions: (
        <span>
          <MoreOutlined />
        </span>
      ),
      img:(<div><img src={pf} alt="" /></div>),
      noOfInterns: "08",
      status: "Approved",
      desgination: "Data Research Manager",
      PhoneNumber: "070 3397 6621 ",
      Email: "jackson.graham@example.com",
      no: "02",
      name: "Andrea Hiyahiya",
      
    
    },
    {
      Actions: (
        <div>
          <MoreOutlined />
          {/* <div
                style={{
                  border: "2px solid #D9DBE9",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)",
                  borderRadius: "8px",
                }}
              ><Typography>View Details</Typography></div> */}
        </div>
      ),
      img:(<div><img src={pf} alt="" /></div>),
      status: "Rejected",
      desgination: "Data Research Manager",
      PhoneNumber: "070 3397 6621 ",
      Email: "jackson.graham@example.com",
      no: "03",
      noOfInterns: "01",
      name: "Andrea Hiyahiya",
      city: "London",
      hired: "No",
    },
    {
      Actions: (
        <div>
          <MoreOutlined />
          {/* <div
                style={{
                  border: "2px solid #D9DBE9",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 8px 2px rgba(9, 161, 218, 0.1)",
                  borderRadius: "8px",
                }}
              ><Typography>View Details</Typography></div> */}
        </div>
      ),
      img:(<div><img src={pf} alt="" /></div>),
      status: "Pending",
      desgination: "Data Research Manager",
      PhoneNumber: "070 3397 6621 ",
      Email: "jackson.graham@example.com",
      no: "04",
      noOfInterns: "05",
      name: "Jenny Wilson",
      city: "London",
      hired: "No",
    },
  ];

const ManagerInfoTable = () => {
  return (
      <div className='manager-info-table'>
          
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] bg-[#FFFFFF] p-2 rounded-2xl">
            <GlobalTable
              tableData={tableData}
              columns={columns}
             
            />
          </div>

    </div>
  )
}

export default ManagerInfoTable