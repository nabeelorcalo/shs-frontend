import { AutoComplete } from 'antd';
import React, { useRef, useState } from 'react';

const CustomAutoComplete = ({ fetchData, selectUser }: any) => {
  const [searchText, setSearchText] = useState<string>('')
  const [options, setOptions] = useState<any[]>([]);
  const [userList, setUserList] = useState<any[]>([])

  const timeout: any = useRef();

  const handleDebounceSearch = (text: string) => {
    //Clear the previous timeout.
    clearTimeout(timeout.current);

    // If there is no search term, do not make API call
    if (!text.trim()) {
      setOptions([]);
      return;
    }
    timeout.current = setTimeout(() => {
      fetchData(text)
        .then(async (response: any) => {
          const { data } = response
          setUserList(data)
          if (data.length == 0) return setOptions([ {
            label: `No results found.`,
            value: -1
          }])
          const opData = data.map((item: any) => {
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
    }, 600);
  };


  const onSelect = (data: string) => {
    selectUser(userList.find(i => i.id == data))
    setSearchText('')
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
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={(text) => handleDebounceSearch(text)}
        onChange={onChange}
        placeholder="Search"
      />
    </>
  );
};

export default CustomAutoComplete;