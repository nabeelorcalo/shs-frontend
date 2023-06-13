import { AutoComplete } from 'antd';
import React, { useRef, useState } from 'react';

const CustomAutoComplete = ({ fetchData, selectItem, isUni = false }: any) => {
  const [searchText, setSearchText] = useState<string>('')
  const [options, setOptions] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([])

  const timeout: any = useRef();

  function getListData (text: string) {

    if(options.length == 0) text = ''
    fetchData(text)
        .then(async (response: any) => {
          const { data } = response
          setList(data)
          if (data.length == 0) return setOptions([ {
            label: `No results found.`,
            value: -1
          }])
          const opData = data.map((item: any) => {
            if(isUni) {
              return {
                label: `${item.university.name}`,
                value: item.id
              }
            }
            return {
              label: `${item.firstName} ${item.lastName}`,
              value: item.id
            }
          })
          setOptions(opData);
        })
        .catch((err: any) => {
          setOptions([]);
          console.error(err);
        });
  }

  const handleDebounceSearch = (text: string) => {
    //Clear the previous timeout.
    clearTimeout(timeout.current);

    // If there is no search term, do not make API call
    if (!text.trim()) {
      setOptions([]);
      return;
    }
    timeout.current = setTimeout(() => {
      getListData(text)
    }, 600);
  };


  const onSelect = (data: string) => {
    const viewText = list.find(i => i.id == data)
    selectItem(viewText)
    setSearchText(viewText.university.name)
    console.log('onSelect', data);
  };

  const onChange = (data: string) => {
    setSearchText(data);
  };

  return (
    <>
      <AutoComplete
        value={searchText}
        options={options}
        style={{ width: '100%' }}
        onFocus={() => getListData('')}
        onSelect={onSelect}
        onSearch={(text) => handleDebounceSearch(text)}
        onChange={onChange}
        placeholder="Search"
      />
    </>
  );
};

export default CustomAutoComplete;