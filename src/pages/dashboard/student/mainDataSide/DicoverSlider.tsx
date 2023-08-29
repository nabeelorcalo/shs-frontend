import React from 'react'
import { Row, Col, Typography } from 'antd';
import '../style.scss';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgSlider from '../../../../assets/images/dashboard/studentdashboard/bgslider.svg'
import foodAndDrink from '../../../../assets/images/dashboard/studentdashboard/foodanddrink.svg'
import recipies from '../../../../assets/images/dashboard/studentdashboard/reciepe.svg'
import transport from '../../../../assets/images/dashboard/studentdashboard/transort.svg'
import homeandutilities from '../../../../assets/images/dashboard/studentdashboard/homeandutilities.svg'
import { WebArrow } from '../../../../assets/images';
import { Link } from 'react-router-dom';

const data = [
  { id: '001', avatar: bgSlider, title: 'Accommodation' },
  { id: '002', avatar: foodAndDrink, title: 'Food & Drink' },
  { id: '004', avatar: recipies, title: 'Recipe' },
  { id: '005', avatar: transport, title: 'Transport' },
  { id: '006', avatar: homeandutilities, title: 'Home & Utilities' },
  { id: '007', avatar: bgSlider, title: 'Health and Fitness' },
  { id: '009', avatar: bgSlider, title: 'Fashion' },
  { id: '009', avatar: bgSlider, title: 'Entertainment' },
]

const DicoverSlider = () => {
  const settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    variableWidth: true,
    speed: 2000,
    slidesToScroll: 2,
  };
  return (
    <div className='discover-slider'>
      <Typography className='main-title pl-5'>Discover</Typography>
      <Row gutter={[20, 10]} className='flex items-center'>
        <Col xxl={20} xl={20} lg={18} md={24} sm={24} xs={24}>
          <Slider {...settings}>
            {data.map((item) => {
              return (
                <div key={item.id} className='slider-small'>
                  <div className='bg-img' style={{ backgroundImage: `url(${item.avatar})` }}>
                    <div className='text-box'>
                      <Typography className='slider-title text-center'>{item.title}</Typography>
                    </div>
                  </div>
                </div>
              )
            })}
          </Slider>
        </Col>
        <Col xxl={4} xl={4} lg={5} md={24} sm={24} xs={24}>
          <div className='website-box pl-8 text-left'>
            <Link to= "https://studenthelpsquad.co.uk/">
            <div className='w-24'>
              <Typography className='pt-10 web-color'>Go To Website</Typography>
              <WebArrow />
              </div>
              </Link>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default DicoverSlider