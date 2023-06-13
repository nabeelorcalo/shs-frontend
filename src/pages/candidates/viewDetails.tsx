import { ReactNode, useEffect } from "react";
import { Drawer, Row, Col } from "antd";
import DrawerTabs from "./drawerTabs";
import IndividualDetails from "./individualDetails";
import { DrawerWidth } from "../../components";
import actionHandler from "./actionHandler";
interface Props {
  open?: boolean;
  setOpen?: any;
  children?: ReactNode | ReactNode[];
  selectedCandidate?: any;
  rest?: any;
}

const DetailDrawer = (props: Props) => {
  const {
    open,
    setOpen,
    children,
    selectedCandidate,
    selectedCandidate: {
      id,
      userId,
      userDetail,
      rating,
      stage,
      internship: { title, internType },
      createdAt,
    },
    ...rest
  } = props;
 
  
  const { studentDetails, getStudentDetails } = actionHandler();

  useEffect(() => {
    getStudentDetails(userId);
  }, []);

  const width = DrawerWidth();
  return (
    <Drawer
      width={width > 1400 ? 1283 : width > 900 ? 900 : width > 576 ? 600 : 300}
      headerStyle={{ display: "none" }}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      {...rest}
    >
      <Row>
        <Col xs={24} lg={6}>
          <IndividualDetails
            userId={userId}
            id={id}
            userDetail={userDetail}
            rating={rating}
            stage={stage}
            internshipTitle={title}
            internType={internType}
            AplliedDate={createdAt}
            skills={studentDetails?.personal?.skills}
          />
        </Col>
        <Col xs={24} lg={18}>
          <DrawerTabs selectedCandidate={selectedCandidate} studentDetails={studentDetails} />
        </Col>
      </Row>
    </Drawer>
  );
};

export default DetailDrawer;
