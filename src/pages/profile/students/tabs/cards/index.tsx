import { Button, Divider, Typography } from 'antd';
import React from 'react'
import '../Tabs.scss';
import upload from '../../../../../assets/images/profile/student/upload.svg';
import { cardArr } from './cardMock';

const CardTabs = () => {
  return (
    <div className='card-tabs'> 
         
    <div className='flex justify-end md:justify-center"'>
        <Button className='upload-button flex items-center justify-between'><img src={upload} alt="" /> Add Card</Button>
      </div>
      {cardArr.map((item, index) => {
              return (
                  <>
               
                     <div className='animate'  >
                          <div className='flex justify-between'>
                      <div className='flex items-center'>
                        
                        <img src={item.img} alt="" />
                        <div className='ml-2'>

                              <Typography>{item.name}</Typography>
                          <Typography>Exp. date: {item.expDate}</Typography>
                        </div>
                              </div>
                        
                          
                     
                          <div className='flex justify-end'>
                          <div style={{background:"#FFFFFF", borderRadius:"8px", height:"48px", width:"48px"}}>
                                          <img src={upload} alt="" style={{display:"flex", justifyContent:"center", alignItems:"center",margin:"auto",paddingTop:"15px"}} />
                                      </div>
                              
                      </div>
                      </div>
             
         </div>
             <Divider/>
          
             
              </>)
          })}
</div>
  )
}

export default CardTabs