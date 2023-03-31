import React from 'react'
import { Row, Col, Typography, Avatar } from 'antd';
import CardStatic from './CardStatic';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const data = [
  { id: '001', avatar: 1, title: 'Austin Wade' },
  { id: '002', avatar: 2, title: 'Amelia Clark' },
  { id: '003', avatar: 3, title: 'Christopher Campbell' },
  { id: '004', avatar: 4, title: 'David Miller' },
  { id: '005', avatar: 5, title: 'Austin Wade' },
  { id: '006', avatar: 6, title: 'Amelia Clark' },
  { id: '007', avatar: 7, title: 'Austin Wade' },
  { id: '008', avatar: 8, title: 'Christopher Campbell' },
  { id: '009', avatar:9, title: 'Austin Wade' },
]

const MainDataSide = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    speed: 1200,
    slidesToScroll: 1,
  };
  return (
      <div className='main-data-side'> 
          <div className='card-style'>
        <CardStatic />
        <div className='pt-3'>
          <Typography className='main-title'>Recent Jobs</Typography>
          <Slider {...settings}>
          {data.map((item) => {
                return (
                  <div key={item.id} className="carousel-item">
                    <div className="carousel-card">
                      <div className="carousel-card-avatar">
                        <Avatar src={item.avatar} size={48} />
                      </div>
                      <div className="carousel-card-title">{item.title}</div>
                      <div className="carousel-card-rate">
                        {/* <Rate value={3} /> */}
                      </div>
                    </div>
                  </div>
                )
              })}
    </Slider>
        </div>

          </div>
    </div>
  )
}

export default MainDataSide