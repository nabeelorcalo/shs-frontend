import { AutoComplete, Select } from "antd";
import React, { useRef, useState } from "react";

const CustomAutoComplete = ({
  fetchData,
  selectItem,
  isUni = false,
  isCompany = false,
  defaultSearchValue = "",
}: any) => {
  const [searchText, setSearchText] = useState<string>(defaultSearchValue);
  const [options, setOptions] = useState<any[]>([]);
  const [list, setList] = useState<any>([]);

  const timeout: any = useRef();

  function getListData(text: string) {
    if (options.length == 0 && isCompany == false) text = "";
    fetchData(text)
      .then(async (response: any) => {
        const { data } = response;
        setList(data);
        if (data.length == 0)
          return setOptions([
            {
              label: `No results found.`,
              value: -1,
            },
          ]);
        let opData;
        if (isUni) {
          console.log(data);
          opData = data.map((item: any) => {
            return {
              label: `${item.university.name}`,
              value: item.id,
            };
          });
        } else if (isCompany) {
          opData = data.items.map((item: any) => {
            return {
              label: `${item.title}`,
              value: item.company_number,
            };
          });
        } else {
          opData = data.map((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
        }
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
      console.log(text);
      getListData(text);
    }, 600);
  };

  const onSelect = (data: string) => {
    if (isUni) {
      const viewText = list.find((i: any) => i.id == data);
      selectItem(viewText);
      setSearchText(viewText.university.name);
      console.log("onSelect", data);
    } else if (isCompany) {
      const viewText = list.items.find((i: any) => i.company_number == data);
      selectItem(viewText);
      setSearchText(viewText.title);
      console.log("onSelect", data);
    } else {
      const viewText = list.find((i: any) => i.id == data);
      selectItem(viewText);
      setSearchText(viewText.name);
      console.log("onSelect", data);
    }
  };

  const onChange = (data: string) => {
    setSearchText(data);
  };

  return (
    <>
      <Select
        showSearch
        showArrow
        defaultActiveFirstOption={false}
        filterOption={false}
        value={searchText}
        options={options}
        style={{ width: "100%" }}
        onFocus={() => (!isCompany ? getListData("") : null)}
        onSelect={onSelect}
        onSearch={(text) => handleDebounceSearch(text)}
        onChange={onChange}
        placeholder="Search"
      />
    </>
  );
};

export default CustomAutoComplete;
