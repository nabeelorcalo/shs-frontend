import { ReactNode, useEffect, useRef } from "react";
import { Drawer, Row, Col } from "antd";
import DrawerTabs from "./drawerTabs";
import { DrawerWidth, IndividualDetails } from "../../../components";
import actionHandler from "../actionHandler";

interface Props {
  open?: boolean;
  setOpen?: any;
  children?: ReactNode | ReactNode[];
  selectedCandidate?: any;
  rest?: any;
}

const DetailDrawer = (props: Props) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
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

  const { studentDetails, getStudentDetails, handleRating } = actionHandler();

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      userId && getStudentDetails(userId);
    }
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
            internType={selectedCandidate?.internship?.interType}
            AplliedDate={createdAt}
            skills={studentDetails?.personal?.skills}
            handleRating={handleRating}
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
