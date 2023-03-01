import "./App.scss"
import { CommonDatePicker, DropDown, SearchBar } from "./components"

function App() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/

  return (
    <div className="p-10">
      <CommonDatePicker open={false} label={'DatePicker With Label'} />
      <CommonDatePicker open={false} />
      <SearchBar placeholder={'Search'} handleChange={(e: any) => console.log(e.target.value)} />
      <DropDown
        name='simple drop down'
        value={''}
        options={['item 1']}
        setValue={(val: string) => console.log(val)}
      />
      <DropDown
        name='drop down with search bar'
        value={''}
        options={['search', 'item 1']}
        setValue={(val: string) => console.log(val)}
        requireSearchBar
        searchValue=''
        setSearchValue={(e: any) => console.log(e.target.value)}
      />
      <DropDown
        name='drop down with search bar and checkbox'
        value={''}
        options={['search', 'item 1']}
        setValue={(val: string) => console.log(val)}
        requireSearchBar
        searchValue=''
        setSearchValue={(e: any) => console.log(e.target.value)}
        requireCheckbox
        selectedList={[]}
      // setSelectedList
      />
      <DropDown
        name='drop down with search bar and checkbox right'
        value={''}
        options={['search', 'item 1']}
        setValue={(val: string) => console.log(val)}
        requireSearchBar
        searchValue=''
        setSearchValue={(e: any) => console.log(e.target.value)}
        requireCheckbox
        checkboxPosition='right'
        selectedList={[]}
      // setSelectedList
      />
      <DropDown
        name='drop down with date picker'
        value={''}
        options={['item 0', 'item 1', 'custom']}
        setValue={(val: string) => console.log(val)}
        requireDatePicker
        placement='bottomRight'
      />
      <DropDown
        name='drop down pilled with date picker'
        value={''}
        options={['item 0', 'item 1', 'custom']}
        setValue={(val: string) => console.log(val)}
        requireDatePicker
        setDateValue={(val: string) => console.log(val)}
        placement='bottomRight'
        pilled
      />
    </div>
  )
}

export default App
