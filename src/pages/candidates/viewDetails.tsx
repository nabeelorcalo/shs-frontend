import React, { useState } from 'react';
import { Button, Col, Drawer, Row, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import IndividualDetails from './individualDetails';

const App: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();


    const showLargeDrawer = () => {
        setSize('large');
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Space>

                <Button type="primary" onClick={showLargeDrawer}>
                    View Details
                </Button>
            </Space>
            <Drawer

                width={1283}
                title={`${size} Drawer`}
                placement="right"
                size={size}
                onClose={onClose}
                open={open}
            >
                <Row >
                    <Col lg={6}>
                        <IndividualDetails />
                    </Col>
                </Row >
            </Drawer>
        </>
    );
};

export default App;