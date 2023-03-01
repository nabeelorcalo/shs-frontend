import React, { useState, useEffect } from 'react';
import { Gauge } from '@ant-design/plots';
import { Progress } from '@ant-design/plots';
import { Col, Row } from 'antd';
import { InfoIcon } from '../../assets/images';

const Charts = () => {
    // const config = {
    //     percent: 0.75,
    //     range: {
    //         ticks: [0, 1 / 3, 2 / 3, 1],
    //         color: ['#F4664A', '#FAAD14', '#30BF78'],
    //     },
    //     indicator: {
    //         pointer: {
    //             style: {
    //                 stroke: '#D0D0D0',
    //             },
    //         },
    //         pin: {
    //             style: {
    //                 stroke: '#D0D0D0',
    //             },
    //         },
    //     },
    //     statistic: {
    //         content: {
    //             style: {
    //                 fontSize: '36px',
    //                 lineHeight: '36px',
    //             },
    //         },
    //     },
    // };
    // const config = {
    //   percent: 0.99,
    //   range: {
    //     color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    //   },
    //   startAngle: Math.PI,
    //   endAngle: 2 * Math.PI,
    //   indicator: null,
    //   statistic: {
    //     title: {
    //       offsetY: -36,
    //       style: {
    //         fontSize: '36px',
    //         color: '#4B535E',
    //       },
    //       formatter: () => '70%',
    //     },
    //     content: {
    //       style: {
    //         fontSize: '24px',
    //         lineHeight: '44px',
    //         color: '#4B535E',
    //       },
    //       formatter: () => '加载进度',
    //     },
    //   },
    // };

    const config = {
        height: 65,
        width: 700,
        autoFit: false,
        percent: 0.3,
        color: ['#363565', '#ABAFB1'],
        borderRadius: 10
    };
    return (
        <Row>
            <Col lg={12} md={12} sm={20} xs={24}>
                <div className='flex justify-between' style={{border:"1px solid "}}>
                    <span className='text-secondary-color'>System Storage</span>
                    <img src={InfoIcon} alt="infoIcon" />
                </div>
                <div className='flex justify-between mt-3'>
                    <span className='text-base font-medium '>45.5GB Used</span>
                    <span className='text-base font-medium ' >55.5GB Free</span>
                </div>
                <div style={{ borderRadius: "30%", overflow: "hidden", marginTop: "-10px" }}>
                    <Progress {...config} />
                </div>
            </Col>
        </Row>
    )
    // <Gauge {...config} />


}

export default Charts 