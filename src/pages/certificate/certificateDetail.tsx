import { Button, Col, Row, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { useParams } from 'react-router-dom';
import { BoxWrapper } from '../../components/BoxWrapper/boxWrapper';
import { tableMockData } from './certificateTable/tableMock';
import { OverAllPerfomance } from '../../components';
import { IssueCertificateIcon, ThreeDots } from '../../assets/images';
import { useState } from 'react';
import { EyeFilled } from '@ant-design/icons';
import DropDownNew from '../../components/Dropdown/DropDownNew';

const CertificateDetail = () => {
    const { id } = useParams();

    const findUser = tableMockData.find(user => user.no === id);
    const [actionType, setActionType] = useState({ id: '', type: '' });

    const items: MenuProps['items'] = [
        {
            label: <p onClick={() => setActionType({ ...actionType, type: 'edit' })}>Edit</p>,
            key: 'edit'
        },
        {
            label: <p onClick={() => setActionType({ ...actionType, type: 'delete' })}>Delete</p>,
            key: 'delete'
        },
    ];

    return (
        <div className='certificate-detail-wrapper'>
            <div className="top-heading text-2xl flex items-center gap-4 font-semibold pb-[30px] mb-[30px] capitalize">
                {findUser?.name}
                <span className='seperator'></span>
                <span className='font-medium text-base'>Certificate</span>
            </div>
            <Row gutter={[15, 15]}>
                <Col lg={6}>
                    <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)' className='user-info flex items-center justify-center flex-col'>
                        <img src={findUser?.avatar} className='h-[100px] w-[100px] rounded-full object-cover' alt='avatar' />
                        <p className='user-name capitalize mt-[20px] mb-[5px] font-medium text-2xl'>{findUser?.name}</p>
                        <span className='department capitalize'>{findUser?.department}</span>
                        <Button className='mt-[30px] w-full view-profile-btn'>View Profile</Button>
                    </BoxWrapper>
                </Col>
                <Col lg={12} className='over-all-performance'>
                    <OverAllPerfomance data={findUser?.performance} heading={'Overall Performance'} />
                </Col>
                <Col lg={6}>
                    <BoxWrapper></BoxWrapper>
                </Col>
            </Row>
            <div className="flex items-center justify-between gap-3 flex-wrap my-[30px]">
                <p className='font-semibold text-base total-certificates'>Total Certificates: <span className='total-num'>04</span></p>
                <Button className='issue-certificate flex items-center capitalize'>
                    <IssueCertificateIcon className='mr-[15px]' />
                    <span className='text-base font-semibold text-white'>issue certificate</span>
                </Button>
            </div>

            <div className="certificate-cards">
                <Row gutter={[15, 15]}>
                    {findUser?.certificates?.map((certificate: any, i: number) => (
                        <Col lg={6} key={i}>
                            <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'>
                                <div className="flex items-center justify-between mb-[30px]">
                                    <p className='font-medium title text-xl'>Completion of <span className='capitalize'>{certificate?.certificateType}</span></p>
                                    <Dropdown trigger={['click']} menu={{ items }} overlayClassName='certificate-card-dropdown' placement='bottomRight'>
                                        <ThreeDots className='cursor-pointer' onClick={() => setActionType({ ...actionType, id: certificate.id })} />
                                    </Dropdown>
                                </div>
                                <div className="img-wrapper relative overflow-hidden w-[100%] rounded-xl">
                                    <img src={certificate?.certificateImg} className='w-[80%]' />
                                    <div className="img-overlay absolute w-full h-full top-0 left-0 flex items-center justify-center">
                                        gfsdgsdf
                                    </div>
                                </div>
                            </BoxWrapper>
                        </Col>
                    ))}
                </Row>
                <DropDownNew items={[{ label: 'label', key: 'label' },{ label: 'label', key: 'label' }]}>
                    <div>ddd</div>
                </DropDownNew>

                <DropDownNew items={[{ label: 'label', key: 'label' },{ label: 'label', key: 'label' }]}>
                    <div>ddd</div>
                </DropDownNew>
            </div>

        </div>
    )
}

export default CertificateDetail