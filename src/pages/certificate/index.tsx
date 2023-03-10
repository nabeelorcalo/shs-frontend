import { Row, Col, Button } from 'antd';
import { useState } from 'react';
import { IssueCertificateIcon } from '../../assets/images';
import { DropDown, SearchBar } from '../../components';
import './style.scss';

const Certificates = () => {
    const [searchVal, setSearchVal] = useState('');
    const [dropdownVal, setDropdownVal] = useState('');
    const dropdownData = ['design', 'research', 'management', 'development', 'business'];

    return (
        <div className='certificate-wrapper'>

            <div className="top-heading text-2xl font-semibold pb-[30px] mb-[30px]">
                Certificate
            </div>

            <Row className="justify-between gap-2">

                <Col xl={7}>
                    <SearchBar size='middle' handleChange={setSearchVal} value={searchVal} className='' />
                </Col>

                <Col xl={16}>
                    <Row className='justify-end' gutter={[20, 10]}>
                        <Col lg={5}>
                            <DropDown value={dropdownVal} name={'Department'} setValue={setDropdownVal} options={dropdownData} />
                        </Col>
                        <Col>
                            <Button className=' issue-certificate flex items-center capitalize'> 
                                <IssueCertificateIcon className='mr-[15px]' />
                                <span className='text-base font-semibold text-white'>issue certificate</span>
                            </Button>
                        </Col>
                    </Row>
                </Col>

            </Row>
        </div>
    )
}

export default Certificates