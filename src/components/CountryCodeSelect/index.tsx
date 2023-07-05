import { useEffect } from "react";
import useCountriesCustomHook from "../../helpers/countriesList";
import { Avatar, Select, Space } from "antd";
const { Option } = Select;

const CountryCodeSelect = (props?: any) => {

  const { onChange } = props

  const { getCountriesList, allCountriesList } = useCountriesCustomHook();

  useEffect(() => {
    getCountriesList()
  }, [])

  const selectCode = allCountriesList?.filter((a: any) => Object.keys(a.idd).length > 0).map((item: any, index: number) => {
    return (
      {
        key: index,
        avatar: item?.flags[0],
        value: item?.idd.root + item?.idd.suffixes[0],
        label: item?.idd.root + item?.idd.suffixes[0],
      }
    )
  })

  const listOptions = [...new Map(selectCode.map((item: any) =>
    [item['label'], item])).values()];

  return (
    <>
      <Select 
        className="w-full"
        showSearch={true}
        onChange={onChange}
        defaultValue={'+44'}
        >
        {listOptions?.map((item: any) => {
          return <Option value={item?.value} key={item.value}>
            <Space>
              {item?.avatar && <Avatar size={30} src={item?.avatar}>
              </Avatar>}
              {item?.label}
            </Space>
          </Option>
        })}
      </Select>
    </>
  )
}

export default CountryCodeSelect