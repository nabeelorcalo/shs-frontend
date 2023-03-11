import { Select } from 'antd'
import React from 'react'

const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
  ];

const { Option } = Select;

const HelpDeskSelect = (props:any) => {

    const defaultValue = props.priorityOption[0].value;
  return (
    <div>
          <Select 
          showArrow={false}
          defaultValue={defaultValue}
          size="small">
          {props.priorityOption.map((option:any) => (
         <Option  key={option.value} value={option.value}>
          {option.label}
         </Option>
      ))}
          </Select>
    </div>
  )
}

export default HelpDeskSelect