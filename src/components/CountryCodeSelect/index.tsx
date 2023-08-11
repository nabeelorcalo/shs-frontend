import { useEffect } from "react";
import useCountriesCustomHook from "../../helpers/countriesList";
import { Avatar, Select, Space } from "antd";
import "./style.scss";
const { Option } = Select;

const CountryCodeSelect = (props?: any) => {
  const { onChange, defaultVal = "+44" } = props;

  const { getCountriesList, allCountriesList } = useCountriesCustomHook();

  useEffect(() => {
    getCountriesList();
  }, []);

  let testMap: any = new Map();
  let ukStuff: any = null;

  const selectCode = allCountriesList
    ?.filter((a: any) => Object?.keys(a.idd).length > 0)
    .map((item: any, index: number) => {
      let phoneCode = item?.idd.root + item?.idd.suffixes[0];

      if (item?.cca2 == "GB") {
        ukStuff = {
          avatar: item?.flags[0],
          code: item?.cca2,
          value: phoneCode,
          label: phoneCode,
        };
      }
      testMap.set(phoneCode, {
        avatar: item?.flags[0],
        code: item?.cca2,
        value: phoneCode,
        label: phoneCode,
      });
    });

  testMap.set("+44", ukStuff);

  return (
    <div className="country-code-select">
      <Select
        className="w-full"
        showSearch={true}
        onChange={onChange}
        defaultValue={defaultVal}
      >
        {[...testMap.values()].map((item: any) => (
          <Option value={item?.value} key={item?.value}>
            <Space>
              {item?.avatar && <Avatar size={30} src={item?.avatar}></Avatar>}
              {item?.label}
            </Space>
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CountryCodeSelect;
