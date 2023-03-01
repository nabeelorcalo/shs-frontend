
import { useState } from 'react';
import { DropDown } from './components/Dropdown/DropDown';
import './App.scss';
import { Col, Row, Space, Typography } from 'antd'
import { Button, CommonDatePicker } from './components'

function App() {

  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedList, setSelectedList] = useState([]);
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <div className="p-10" style={{ padding: '30px' }}>
      <Row gutter={[10, 10]}>
        <Col span={4}>
          <DropDown
            name='Simple Drop Down'
            value={value}
            options={['item 0', 'item 1', 'item 2']}
            setValue={setValue}
          />
        </Col>
        <Col span={4}>
          <DropDown
            name='Simple Drop Down Pilled'
            value={value}
            options={['item 0', 'item 1', 'item 2']}
            setValue={setValue}
            pilled
          />
        </Col>
        <Col span={4}>
          <DropDown
            name='Drop Down with Search Bar'
            value={value}
            options={['search', 'item 1', 'item 2']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Col>
        <Col span={6}>
          <DropDown
            name='Drop Down with Search Bar and Checkboxes'
            value={value}
            options={['search', 'item 1', 'item 2']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            requireCheckbox
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </Col>
        <Col span={4}>
          <DropDown
            name='Checkboxes on right side'
            value={value}
            options={['search', 'item 1', 'item 2']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            requireCheckbox
            checkboxPosition='right'
            selectedList={selectedList}
            setSelectedList={setSelectedList}
          />
        </Col>
        <Col span={4}>
          <DropDown
            name='Checkboxes on right side'
            value={value}
            options={['search', 'item 1', 'item 2', 'custom']}
            setValue={setValue}
            requireSearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            requireCheckbox
            checkboxPosition='right'
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            requireDatePicker
          />
        </Col>
        <Col span={4}>
          <CommonDatePicker
            name='This Month'
            open={openPicker}
            placement='bottomLeft'
            setOpen={setOpenPicker}
            setValue={(val: string) => console.log(val)}
          />
        </Col>
      </Row>


      <div className="p-10">
        <Button type='dashed' label='new' />
        <Button type='primary' label='stuff' />
        <br />
        <Typography.Title level={1}>
          I'm h1
        </Typography.Title>

        <br />

        <Typography.Title level={2}>
          I'm h2
        </Typography.Title>

        <br />

        <Typography.Title level={3}>
          I'm h3
        </Typography.Title>
      </div>
    </div>
  )
}

export default App
