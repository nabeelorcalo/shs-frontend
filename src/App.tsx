import { Col, Row } from "antd"
import { useState } from "react"
import "./App.scss"
import { CommonDatePicker, DropDown, SearchBar } from "./components"

function App() {

  const [isdate, setIsDate] = useState(false);
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedList, setSelectedList] = useState([]);
  console.log(value);

  return (
    <div className="p-10">
      <Row gutter={20}>
        <Col span={4} className='mt-5'>
          {['small', 'middle', 'large'].map((size: any) =>
            <SearchBar size={size} className="my-3" handleChange={(val: string) => console.log(val)} />
          )}
        </Col>
        <Col span={4} className='mt-5'>
          <CommonDatePicker
            placement="bottomLeft"
            open={isdate}
            setOpen={setIsDate}
            setValue={setValue}
            label={'DatePicker With Label'}
          />
        </Col>
        <Col span={4} className='mt-5'>
          <CommonDatePicker
            monthPicker
            picker="month"
            placement="bottomLeft"
            open={isdate}
            setOpen={setIsDate}
            setValue={setValue}
          />
        </Col>
        <Col span={4} className='mt-5'>
          <DropDown
            name='simple drop down'
            value={value}
            options={['item 1', 'item 2', 'item 3']}
            setValue={setValue}
          />
        </Col>
        <Col span={4} className='mt-5'>
          <DropDown
            name='status'
            value={value}
            options={['item 1', 'item 2', 'item 3']}
            setValue={setValue}
          />
        </Col>

        <Col span={4} className='mt-5'>
          <DropDown
            name='drop down with search bar'
            value={value}
            options={['search', 'item 1']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Col>

        <Col span={6} className='mt-5'>
          <DropDown
            name='drop down with search bar and checkbox'
            value={value}
            options={['search', 'item 1', 'item 2', 'item 3']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            requireCheckbox
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </Col>

        <Col span={7} className='mt-5'>
          <DropDown
            name='drop down with search bar and checkbox right'
            value={value}
            options={['search', 'item 1', 'item 2', 'item 3']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            requireCheckbox
            checkboxOnRight
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </Col>

        <Col span={5} className='mt-5'>
          <DropDown
            name='drop down with custom date picker'
            value={value}
            options={['item 0', 'item 1', 'custom']}
            setValue={setValue}
            datePickerValue={'custom'}
            requireDatePicker
            placement='bottomLeft'
          />
        </Col>
        <Col span={5} className='mt-5'>
          <DropDown
            name='drop down with custom date picker'
            value={value}
            options={['item 0', 'item 1', 'date range']}
            setValue={setValue}
            datePickerValue={'date range'}
            requireDatePicker
            placement='bottomLeft'
            pilled
          />
        </Col>

        <Col span={5} className='mt-5'>
          <DropDown
            name='drop down with custom date picker'
            value={value}
            options={['item 0', 'item 1', 'custom']}
            setValue={setValue}
            datePickerValue={'custom'}
            requireDatePicker
            placement='bottomLeft'
            pilled
          />
        </Col>

        <Col span={5} className='mt-5'>
          <DropDown
            name='drop down with custom month picker'
            value={value}
            options={['item 0', 'item 1', 'custom']}
            datePickerValue={'custom'}
            setValue={setValue}
            placement='bottomLeft'
            requireDatePicker
          />
        </Col>
        <Col span={1} className='mt-5'>
          <DropDown requiredDownloadIcon options={['pdf', 'excel']} value={value} setValue={setValue} />
        </Col>
      </Row>
    </div>
  )
}

export default App
