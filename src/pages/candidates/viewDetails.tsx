import { Drawer, Row, Col } from 'antd';
import { ReactNode, useEffect,useState } from 'react';
import DrawerTabs from './drawerTabs';
import IndividualDetails from './individualDetails';

interface Props {
  open?: boolean;
  setOpen?: any;
  children?: ReactNode | ReactNode[];
  rest?: any;
}

const DetailDrawer = (props: Props) => {
  const { open, setOpen, children, ...rest } = props;
  
  
  const getWindowDimensions = () => { const { innerWidth: width } = window; return { width }; };
  const [windowDimensions, setWindowDimensions] = useState<{ width: number }>(getWindowDimensions());

  useEffect(() => {
    window.addEventListener("resize", () => { 
      setWindowDimensions(getWindowDimensions()); }); 
      return () => window.removeEventListener("resize", 
      () => { setWindowDimensions(getWindowDimensions()); });
  }, [windowDimensions.width])


  return (
    <Drawer
      width={windowDimensions.width>1400 ? 1283: windowDimensions.width > 900 ? 900:windowDimensions.width > 576?600:300}
      headerStyle={{ display: 'none' }}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      {...rest}
    >
      <Row>
        <Col xs={24} lg={6}>
          <IndividualDetails />
        </Col>
        <Col xs={24} lg={18}>
          <DrawerTabs />
        </Col>
      </Row>
    </Drawer>
  );
};

export default DetailDrawer;