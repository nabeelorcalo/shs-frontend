import { Col, Row } from "antd"
import { useState } from "react"
import { ArrowDownDark, CalendarIcon } from "../../assets/images";
import { CommonDatePicker } from "../calendars/CommonDatePicker";
import { Input } from "../Input/input";
import { SearchBar } from "../SearchBar/SearchBar";
import { DropDown } from "./DropDown";

function DropDownDemo() {

    const [isdate, setIsDate] = useState(false);
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [selectedList, setSelectedList] = useState([]);

    return (
        <div className="p-10">
            <Row gutter={20}>
                {/* input  */}
                <Col span={4}>
                    <Input
                        type="password"
                        placeholder={'dfdsfsf'}
                        required
                        label="label"
                        handleChange={(e) => { }}
                    />
                </Col>
                {/* search bar sizes */}
                <Col span={4} className='mt-5'>
                    {['small', 'middle', 'large'].map((size: any) =>
                        <SearchBar
                            size={size}
                            key={size}
                            className="my-3"
                            handleChange={(val: string) => console.log(val)}
                        />
                    )}
                </Col>
                {/* date picker with label */}
                <Col span={3} className='mt-5'>
                    <CommonDatePicker
                        requireAsButton
                        btnClassName={'h-[48px]'}
                        btnIcononRight
                        placement="bottomLeft"
                        open={isdate}
                        setOpen={setIsDate}
                        setValue={setValue}
                        btnIcon={CalendarIcon}
                    />
                </Col>
                {/* date picker with label */}
                <Col span={3} className='mt-5'>
                    <CommonDatePicker
                        requireAsButton
                        btnIcon={CalendarIcon}
                        btnClassName={'h-[48px]'}
                        placement="bottomLeft"
                        open={isdate}
                        setOpen={setIsDate}
                        setValue={setValue}
                    />
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

                {/* month picker */}
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

                {/* simple drop down with startIcon */}
                <Col span={4} className='mt-5'>
                    <DropDown
                        name='simple drop down'
                        value={value}
                        options={['item 1', 'item 2', 'item 3']}
                        setValue={setValue}
                        startIcon={ArrowDownDark}
                    />
                </Col>
                {/* simple drop down pilled */}
                <Col span={4} className='mt-5'>
                    <DropDown
                        name='simple drop down pilled'
                        value={value}
                        options={['item 1', 'item 2', 'item 3']}
                        setValue={setValue}
                        pilled
                    />
                </Col>

                {/* dropdown with search bar */}
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

                {/* dropdown with checkbox */}
                <Col span={6} className='mt-5'>
                    <DropDown
                        name='drop down with checkbox'
                        value={value}
                        options={['search', 'item 1', 'item 2', 'item 3']}
                        setValue={setValue}
                        requireCheckbox
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                    />
                </Col>

                {/* drop down with searchbar and checkbox right */}
                <Col span={7} className='mt-5'>
                    <DropDown
                        name='drop down with searchbar and checkbox right'
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

                {/* drop down with custom date picker */}
                <Col span={5} className='mt-5'>
                    <DropDown
                        name='drop down with custom date picker'
                        value={value}
                        options={['item 0', 'item 1', 'custom']}
                        setValue={setValue}
                        showPickerOnVal={'custom'}
                        requireDatePicker
                        placement='bottomLeft'
                    />
                </Col>

                {/* drop down with custom date picker pilled */}
                <Col span={5} className='mt-5'>
                    <DropDown
                        name='drop down with custom date picker'
                        value={value}
                        options={['item 0', 'item 1', 'date range']}
                        setValue={setValue}
                        showPickerOnVal={'date range'}
                        requireDatePicker
                        placement='bottomLeft'
                        pilled
                    />
                </Col>

                {/* download dropdown */}
                <Col span={1} className='mt-5'>
                    <DropDown
                        requiredDownloadIcon
                        options={['pdf', 'excel']}
                        value={value}
                        setValue={setValue}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default DropDownDemo
