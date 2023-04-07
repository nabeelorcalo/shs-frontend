import { FC } from 'react'
import { Row, Col } from 'antd';

interface IUserAnalytics {
    title: string;
    count?: string | number;
    data?: any
}

export const UserAnalytics: FC<IUserAnalytics> = (props) => {
    const { title, count, data } = props;

    //converting data object keys to array
    const dataList = Object.keys(data ?? {});
    
    return (
        <div className='rounded-2xl wrapper-shadow'>
            <Row align="middle" justify="space-between" className='primary-bg-color px-[30px] h-[72px] rounded-t-2xl box-border'>
                <Col>
                    <p className="text-xl font-medium text-white">{title}</p>
                </Col>
                {count && <Col>
                    <p className="px-[33px] py-[6px] text-[26px] leading-8 text-white bg-[#9BD5E8]/10 rounded-[46px]">{count}</p>
                </Col>}
            </Row>
            <Row justify="space-between" className='pt-[36px] pb-[39px] px-[30px]'>
                {dataList?.map(item =>
                    <Col flex={1}>
                        <p className="font-normal text-base capitalize">{item.replace("_", " ")}</p>
                        <p className="text-[44px] leading-[48px] font-medium text-teriary-color">{data?.[item]}</p>
                    </Col>
                )}
            </Row>
        </div>
    )
}