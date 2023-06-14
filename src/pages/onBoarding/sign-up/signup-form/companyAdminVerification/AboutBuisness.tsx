import React, { useEffect, useState } from 'react'
import { Col, Row, Typography, Form, Input, Button, Select } from 'antd';
import { BackButton, SHSLogo } from '../../../../../assets/images';
import { CommonDatePicker, DropDown, Notifications } from '../../../../../components';
import '../../../styles.scss';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../../config/validationMessages';
import useCustomHook from '../../../actionHandler';
import { CaretDownOutlined } from '@ant-design/icons';
import useCountriesCustomHook from '../../../../../helpers/countriesList';
import UserSelector from '../../../../../components/UserSelector';
import dayjs from 'dayjs';
import { useRecoilState } from 'recoil';
import { companyStepperData } from '../../../../../store/Signup';
const { Option } = Select;

const businessTypeOptions: any[] = [
  {
    label: 'Private Limited',
    value: 'Private Limited',
  },
  {
    label: 'Public Limited',
    value: 'Public Limited',
  },
  {
    label: 'Limited Liability Partnership',
    value: 'Limited Liability Partnership',
  },
  {
    label: 'Limited Partnership',
    value: 'Limited Partnership',
  },
  {
    label: 'Partnership',
    value: 'Partnership',
  },
  {
    label: 'Sole Trader / Individual',
    value: 'Sole Trader / Individual',
  }
]

const businessSectorOptions: any[] = [
  {
    label: 'Crypto / Blockchain',
    value: 'Crypto / Blockchain'
  },
  {
    label: 'Information Technology',
    value: 'Information Technology'
  },
  {
    label: 'Marketing',
    value: 'Marketing'
  },
  {
    label: 'Education',
    value: 'Education'
  },
  {
    label: 'Real estate',
    value: 'Real estate'
  },
  {
    label: 'Health and Fitness',
    value: 'Health and Fitness'
  }
]


const AboutBuisness = (props: any) => {
  const [initialValues, setInitialValues] = useRecoilState(companyStepperData)
  const [value, setValue] = useState<string>();
  const [open, setOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const { currentStep, setCurrentStep } = props;
  const { companyVerification } = useCustomHook()

  useEffect(() => {
    getCountriesList()
  }, [])

  const selectCountry = allCountriesList?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.name?.common,
        label: item?.name?.common,
      }
    )
  })

  const onFinish = async (values: any) => {
    setBtnLoading(true)
    values.dateOfIncorporation = dayjs(values.dateOfIncorporation).format('YYYY-MM-DD')
    console.log('Form Items: ', values)

    const response = await companyVerification(values, 1)
    console.log(response)
    if (response.statusCode != 200) {
      setBtnLoading(false)
      Notifications({
        title: "Error",
        description: `Failed to update date`,
        type: "error",
      });
      return
    }
    setBtnLoading(false)
    setInitialValues({ ...initialValues, ...values })
    setCurrentStep(currentStep + 1);
  }

  return (
    <div className='about-buisness'>
      <Row className='about-buisness-style'>
        <Col xxl={8} xl={8} lg={14} md={18} sm={24} xs={24}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className='form-inner-wrapper'>
            <div className="main-title-wrapper">
              <Typography className="steps">Step 1 of 3</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Tell us about your Business
                  </Typography.Title>
                </div>
              </div>
            </div>
            <div className='secondary-form-wrapper'>
              <Form
                layout='vertical'
                name='company_business'
                className='business-form'
                initialValues={{ remember: true }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="Business Type"
                  name="businessType"
                  initialValue={initialValues.businessType}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Valid field!",
                    },
                  ]}
                >
                  <Select
                    placeholder='Select Business type'
                    size="middle"
                    suffixIcon={<CaretDownOutlined />}
                  >
                    {businessTypeOptions.map((option: any) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Business Sector"
                  name="businessSector"
                  initialValue={initialValues.businessSector}
                  rules={[
                    {
                      required: true,
                      message: "Please Select Valid field!",
                    },
                  ]}
                >
                  <Select
                    placeholder='Select business sector'
                    size="middle"
                    suffixIcon={<CaretDownOutlined />}
                  >
                    {businessSectorOptions.map((option: any) => (
                      <Option key={option.value} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label='Legal Business Name'
                  name='businessName'
                  initialValue={initialValues.businessName}
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input placeholder='Enter Legal Buisness Name' className='text-input-bg-color' />
                </Form.Item>
                <Form.Item
                  label='Company Registration Number'
                  name='registrationNumber'
                  initialValue={initialValues.registrationNumber}
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input placeholder='Enter company registration number' className='text-input-bg-color' />
                </Form.Item>
                <Row gutter={10}>
                  <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                    <Form.Item
                      label="Country of Incorporation"
                      name="countryOfIncorporation"
                      initialValue={initialValues.countryOfIncorporation}
                      rules={[{ required: true }, { type: "string" }]}
                    >
                      <UserSelector
                        options={selectCountry}
                        placeholder="Select Country"
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={10} md={12} sm={12} xs={12}>
                    <Form.Item
                      label='Date of Incorporation'
                      name='dateOfIncorporation'
                    >
                      <CommonDatePicker open={open} setOpen={setOpen} setValue={setValue} initialDate={initialValues.dateOfIncorporation} />
                    </Form.Item>

                  </Col>
                </Row>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={btnLoading}
                  >
                    Next
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AboutBuisness