import React,{useState} from 'react'
import { Col, Divider, Row ,Button} from 'antd'
import { ReloadOutlined } from '@ant-design/icons'

function SideMenuColor({sideBarColor,setSideBarColor}:any) {
    // const [primaryColor, setPrimaryColor] = useState('#000000')

    const handleColorChangePrimary = (event :any) => {
      setSideBarColor(event.target.value)
    }
  
    const handleRefreshPrimary = () => {
      setSideBarColor('#000000')
    }
   
  return (
    <div>
        <h4 className="font-medium text-xl mb-4 m-4">Side Menu Color</h4>
      {/* div that works for open or close most outer div */}

      <div className="m-4 ">
        <div className="flex gap-2 flex-col mb-4">
          <div className="grid grid-cols-6 w-full">
            <div className="col-span-1">
              <input
                type="color"
                value={sideBarColor}
                onChange={handleColorChangePrimary}
                id="primary_color"
                className="field-radio"
              />
            </div>
            <div className="col-start-2 col-span-4">
              <input
                type="text"
                value={sideBarColor}
                onChange={handleColorChangePrimary}
                className="h-10 border-none sky-blue-color-bg rounded-md p-4 w-11/12"
              />
            </div>
            <div className="col-span-1">
              <Button
                className="w-10 min-w-10 min-h-10 h-10 sky-blue-color-bg p-0 shadow-none"
                icon={<ReloadOutlined  />}
                onClick={handleRefreshPrimary}
                type="primary"
              />
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default SideMenuColor