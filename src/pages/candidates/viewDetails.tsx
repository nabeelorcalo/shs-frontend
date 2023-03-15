import { Drawer, Row, Col } from 'antd';
import { ReactNode } from 'react';
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

  return (
    <Drawer
      width={1283}
      headerStyle={{ display: 'none' }}
      placement="right"
      onClose={() => setOpen(false)}
      open={open}
      {...rest}
    >
      <Row>
        <Col lg={6}>
          <IndividualDetails />
        </Col>
        <Col lg={18}>
          <DrawerTabs />
        </Col>
      </Row>
    </Drawer>
  );
};

export default DetailDrawer;