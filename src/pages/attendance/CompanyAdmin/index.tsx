import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { PageHeader, AttendanceCard } from "../../../components";
import {
  Absent,
  AbsentIntern,
  PeopleIcon,
  PresentInterns
} from "../../../assets/images";
import "./style.scss";

const CompanyAdminAttendance = () => {
  const [state, setState] = useState({
    cardsData: [
      { name: "Interns", count: 211 },
      { name: "Present", count: 111 },
      { name: "Leave", count: 48 },
      { name: "Absent", count: 52 }
    ],
  });

  const cardIcon = (name: string) => {
    switch (name) {
      case 'Interns':
        return <PeopleIcon />;
      case 'Present':
        return <PresentInterns />;
      case 'Leave':
        return <AbsentIntern />;
      case 'Absent':
        return <Absent />;
      default:
        return <></>;
    }
  }

  return (
    <div className="company-admin-attendance-container">
      <PageHeader
        title="Attendance"
        actions
        bordered
      >
        <Link
          to={`${ROUTES_CONSTANTS.DETAIL}`}
          className="attendance-detail-btn"
        >
          Attendance Details
        </Link>
      </PageHeader>

      <div className="flex flex-wrap justify-between">
        {
          state.cardsData.map((item: any) => {
            return (
              <AttendanceCard
                title={item.name}
                count={item.count}
                avatar={cardIcon(item.name)}
              />
            )
          })
        }
      </div>

    </div>
  )
}

export default CompanyAdminAttendance;