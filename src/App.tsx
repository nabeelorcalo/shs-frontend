
import { useState } from 'react';
import { DropDown } from './components/Dropdown/DropDown';
import './App.scss';

function App() {

  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selectedList, setSelectedList] = useState([]);

  return (
    <div className="p-10" style={{ padding: '30px' }}>
      <DropDown
        name='this month'
        value={value}
        options={['search', 'item 1', 'item 2', 'custom']}
        requireSearchBar
        // requireCheckbox
        // checkboxPosition={'right'}
        searchValue={searchValue}
        setValue={setValue}
        setSearchValue={setSearchValue}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
    </div>
  )
}

export default App
