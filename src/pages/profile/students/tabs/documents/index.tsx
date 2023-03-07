import { Button, Divider, Typography } from 'antd'
import React, { useState } from 'react'
import { DropDown } from '../../../../../components'
import upload from '../../../../../assets/images/profile/student/upload.svg'
import download from '../../../../../assets/images/download-icon.png'
import '../Tabs.scss';
import { documentArr } from './DocumentMock';
import { EyeFilled } from '@ant-design/icons';

const Documents = () => {
   
  return (
      <div className='document-tabs'> 
         
          <div className='flex justify-end md:justify-center"'>
              <Button className='upload-button flex items-center justify-between'><img src={upload} alt="" /> Upload</Button>
          </div>
        
          {documentArr.map((item, index) => {
              return (
                  <>
              
              <div className='animate'  >
                          <div className='flex justify-between'>
                              <div className='grid justify-start'>
                              <Typography>{item.name}</Typography>
                          <Typography>{item.subName}</Typography>
                              </div>
                        
                          
                              <div className='flex gap-2'>
                                  <div className='grid justify-end'>
                                  <Typography>{ item.date}</Typography>
                                  <Typography>{item.fileSize}</Typography>
                                  </div>
                         
                                  <div className='button-ts'>
                                      <div style={{background:"#FFFFFF", borderRadius:"8px", height:"48px", width:"48px"}}>
                                          <EyeFilled style={{ fontSize: '22px', color: "#A0A3BD" }} className='flex justify-center mt-4' />
                                      </div>
                                      <div style={{background:"#FFFFFF", borderRadius:"8px", height:"48px", width:"48px"}}>
                                          <img src={download} alt="" style={{display:"flex", justifyContent:"center", alignItems:"center",margin:"auto",paddingTop:"15px"}} />
                                      </div>
                             
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

export default Documents