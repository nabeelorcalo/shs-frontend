import { Drawer, Row, Col } from 'antd';
import { ReactNode } from 'react';
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
                <Col lg={5}>
                    <IndividualDetails />
                </Col>
            </Row>
        </Drawer>
    );
};

export default DetailDrawer;