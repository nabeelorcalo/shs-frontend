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
    <div className="flex flex-col justify-between h-80 pb-5 type-signature-wrapper">
      <Select
        defaultValue="Select Typeface"
        className='w-1/4 border-b-4 border-indigo-500'
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
        <hr className="w-96 h-0.5 mx-auto my-2 bg-signature-border border-rounded md:my-2" />
        <p className="text-sm text-center">Type your signature here</p>
      </div>
    </div>
  )
}

export default TypeSignature
