import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Input,  Select, Button, Slider } from 'antd'
import GlobalTable from '../../../components/Table/Table'
import "./style.scss";
import thumb1 from '../../../assets/images/gallery/thumb1.png'
import thumb2 from '../../../assets/images/gallery/thumb2.png'
import thumb3 from '../../../assets/images/gallery/thumb3.png'
import thumb4 from '../../../assets/images/gallery/thumb4.png'
import thumb5 from '../../../assets/images/gallery/thumb5.png'

const data = [
  {id: '01', coverPhoto: thumb1, discount: '30', autualPrice: '1200', discountPrice: '840', propertyAvailableFor: 'week', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '2', tags: ['Utility Bills', 'Laundry', 'Meals'], location: 'Black horse Lane, London, E17 6DS'},
  {id: '02', coverPhoto: thumb2, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '03', coverPhoto: thumb3, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '04', coverPhoto: thumb4, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
  {id: '05', coverPhoto: thumb5, discount: '0', autualPrice: '1200', discountPrice: '0', propertyAvailableFor: 'month', propertyType: 'Apartment', totalBeds: '2', totalWashRoom: '1', tags: ['Utility Bills', 'Laundry', 'Meals'], location: '11 Queensway London EC49 5PC'},
]

const BookingRequests = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const [drawerOpen, setDrawerOpen] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="booking-requests">
      <GlobalTable
        columns={[{
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },]}
        tableData={[
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
          },
        ]}
      />
    </div>
  )
}

export default BookingRequests