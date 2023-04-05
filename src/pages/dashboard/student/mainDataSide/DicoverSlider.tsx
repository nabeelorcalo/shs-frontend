import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bgSlider from '../../../../assets/images/dashboard/studentdashboard/bgslider.svg'
import { Row, Col, Typography } from 'antd';
import { WebArrow } from '../../../../assets/images';



const data = [
    { id: '001', avatar: bgSlider, title: 'Austin Wade' },
    { id: '002', avatar: bgSlider, title: 'Amelia Clark' },
    { id: '004', avatar: bgSlider, title: 'David Miller' },
    { id: '005', avatar: bgSlider, title: 'Austin Wade' },
    { id: '006', avatar: bgSlider, title: 'Amelia Clark' },
    { id: '007', avatar: bgSlider, title: 'Austin Wade' },
    { id: '009', avatar:bgSlider, title: 'Austin Wade' },
    { id: '009', avatar:bgSlider, title: 'Austin Wade' },
  ]

const DicoverSlider = () => {
    const settings = {
        arrows: false,
        dots: false,
        infinite: true,
        autoplay: true,
        variableWidth: true,
        speed: 2000,
        slidesToScroll: 1,
      };
  return (
      <div>
           <Typography className='main-title pl-5'>Discover</Typography>
          <Row gutter={[20,10]} className='flex items-center'>
             
              <Col xxl={20} xl={20} lg={18} md={18} sm={18} xs={24}>
    <Slider {...settings}>
    {data.map((item) => {
      return (
            
            <div key={item.id} className='slider-small'>
              <div className='bg-img' style={{ backgroundImage: `url(${item.avatar})`}}>
                <div className='pt-28 text-center'>
                <Typography className='slider-title'>{item.title}</Typography>
               </div>
              </div>
              
          </div>   
          )
        })}
</Slider>
              </Col>
              <Col xxl={4} xl={4} lg={5} md={5} sm={5} xs={24}>
                  
                  <div className='website-box   text-center'>
                      <div className='w-24'>
                      <Typography className='pt-10 web-color'>Go To Website</Typography>
                     <WebArrow /> 
                      </div>
                   
                  </div>
              </Col>
          </Row>
      </div>
  )
}

export default DicoverSlider