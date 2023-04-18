import { Drawer, Row, Col } from 'antd';
import { ReactNode } from 'react';
import DrawerTabs from './drawerTabs';
import IndividualDetails from './individualDetails';
import { DrawerWidth } from '../../components';

interface Props {
  open?: boolean;
  setOpen?: any;
  children?: ReactNode | ReactNode[];
  rest?: any;
}

const DetailDrawer = (props: Props) => {
  const { open, setOpen, children, ...rest } = props;
  const width = DrawerWidth();
  return (
    <Drawer
      width={width>1400 ? 1283: width > 900 ? 900: width > 576?600:300}
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