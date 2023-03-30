import { Input, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import './style.scss'

const TypeSignature = () => {
  const [fontFamily, setFontFamily] = useState(null)
  const inputRef: any = useRef()
  const handleChange = (value: any) => {
    setFontFamily(value)
  }
  useEffect(() => {
    inputRef.current.focus()
  })
  console.log(fontFamily)
  return (
    <div className="flex flex-col justify-between h-80 pb-5 rounded border-dashed border-2 border-[#D9DBE9] bg-[#E6F4F9] hover:border-[#DDE2E5] type-signature-wrapper">
      <Select
        defaultValue="Select Typeface"
        className='w-1/3 border-b-4 border-indigo-500'
        bordered={false}
        options={[
          { value: 'roboto', label: 'Roboto' },
          { value: 'montserrat', label: 'Montserrat' },
          { value: 'ariel', label: 'Ariel' },
          { value: 'poppins', label: 'Poppins' },
        ]}
        onChange={(value) => { handleChange(value) }}
      />

      <div className='flex flex-col justify-end signature-input'>
        <Input bordered={false} className={`text-center text-size-lg text-${fontFamily} input-no-border`}ref={inputRef} />
        <hr className="w-48 h-0.5 mx-auto my-1 bg-gray-100 border-0 rounded md:my-2 dark:bg-gray-700" />
        <p className="text-sm text-center">Type your signature here</p>
      </div>
    </div>
  )
}

export default TypeSignature
