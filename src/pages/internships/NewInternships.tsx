import { useEffect, useState } from 'react';
import { Button, Col, Divider, Row, Radio, Select, Input, Form } from 'antd';
import { PageHeader, BoxWrapper, Breadcrumb, CommonDatePicker, Notifications } from '../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../config/validationMessages';
import { useNavigate, useLocation } from 'react-router-dom';
import type { RadioChangeEvent } from 'antd';
import constants, { ROUTES_CONSTANTS } from '../../config/constants';
import useCustomHook from './actionHandler';
import dayjs from 'dayjs';
import UserSelector from '../../components/UserSelector';
import { useRecoilValue } from 'recoil';
import { currentUserRoleState } from '../../store';
import './style.scss';

const { TextArea } = Input;

const amountOptions = [
  {
    value: '£',
    label: 'GBP',
  },
  {
    value: '$',
    label: 'USD',
  },
]
const durationOptions = [
  { value: '1 month', label: '1 month' },
  { value: '2 months', label: '2 months' },
  { value: '3 months', label: '3 months' },
  { value: '4 months', label: '4 months' },
  { value: '5 months', label: '5 months' },
  { value: '6 months', label: '6 months' },
  { value: '7 months', label: '7 months' },
  { value: '8 months', label: '8 months' },
  { value: '9 months', label: '9 months' },
  { value: '10 months', label: '10 months' },
  { value: '11 months', label: '11 months' },
  { value: '12 months', label: '12 months' }
]
const frequencyOptions = [
  { value: 'HOURLY', label: 'Hourly' },
  { value: 'DAILY', label: 'Daily' },
  { value: 'WEEKLY', label: 'Weekly' },
  { value: 'MONTHLY', label: 'Monthly' },
  { value: 'QUARTERLY', label: 'Quarterly' },
  { value: 'ANNUALLY', label: 'Annually' }
]

const NewInternships = () => {
  const role = useRecoilValue(currentUserRoleState);

  const { state } = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [status, setStatus] = useState(role === constants.COMPANY_ADMIN ? "PUBLISHED" : "PENDING");
  const [internShipFormData, setInternShipFormData] = useState(state);
  const [partAndFullTime, setPartAndFullTime] = useState(null);
  const [paidAndUnpaid, setPaidAndUnpaid] = useState(internShipFormData?.salaryType ?? null);
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [remoteOnsite, setRemoteOnsite] = useState(internShipFormData?.locationType ?? null);
  const [amount, setAmount] = useState({
    amountType: internShipFormData?.salaryCurrency ?? null,
    amount: internShipFormData?.salaryAmount ?? null
  });

  const natureofwork = {
    virtual: "VIRTUAL",
    onsite: "ONSITE",
    hybride: "HYBRIDE",
  }
  const { postNewInternshipsData, getAllDepartmentData,
    departmentsData, EditNewInternshipsData, getAllLocationsData, locationsData } = useCustomHook();

  useEffect(() => {
    getAllDepartmentData
    getAllLocationsData
  }, [])

  const tempArray = [
    { name: "New Internship" },
    {
      name: "Internships",
      onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNSHIPS}`,
    },
  ];

  const onWorkTypeChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPartAndFullTime(e.target.value);
  };

  const onInternshipTypeChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPaidAndUnpaid(e.target.value);
  };

  const onNatureChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRemoteOnsite(e.target.value);
  };

  const onFinish = (values: any) => {
    const newVals = {
      ...values,
      amount: amount.amount,
      salaryAmount: amount.amountType,
      status,
    }
    if (internShipFormData) {
      EditNewInternshipsData(newVals)
    } else {
      postNewInternshipsData(newVals);
    }
    setStatus('')
    form.resetFields();
    setInternShipFormData({})
  };

  const onSelectChange = (value: any) => {
    console.log('slected item', value);
  };
console.log(internShipFormData);

  const initialValues = {
    title: internShipFormData?.title ?? undefined,
    department: internShipFormData?.departmentId ?? undefined,
    description: internShipFormData?.description ?? undefined,
    responsibilities: internShipFormData?.responsibilities ?? undefined,
    requirements: internShipFormData?.requirements ?? undefined,
    typeofwork: internShipFormData?.internType ?? undefined,
    salaryType: internShipFormData?.salaryType ?? undefined,
    frequency: internShipFormData?.salaryFrequency ?? undefined,
    amount: internShipFormData?.salaryAmount ?? undefined,
    amountType: internShipFormData?.salaryCurrency ?? undefined,
    natureofwork: internShipFormData?.locationType ?? undefined,
    location: internShipFormData?.locationId ?? undefined,
    positions: internShipFormData?.totalPositions ?? undefined,
    duration: internShipFormData?.duration ?? undefined,
    closingDate: internShipFormData?.closingDate ? dayjs(internShipFormData?.closingDate) : undefined,
    status: status
  }

  const filteredData = departmentsData?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })

  const validatePositiveNumber = (rule: any, value: any, callback: any) => {
    if (value < 0) {
      callback('Negative values are not allowed');
    } else {
      callback();
    }
  };
  return (
    <>
      <PageHeader bordered title={<Breadcrumb breadCrumbData={tempArray} />} />
      <BoxWrapper className='new-intern-main'>
        <Form
          form={form}
          layout='vertical'
          onFinish={onFinish}
          initialValues={initialValues}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
          <h4 className='upcomming_Holiday mb-1 text-2xl font-semibold text-primary-color'>Internship Details</h4>
          <p>This information will be displayed publicly so be careful what you share</p>
          <Divider />
          <Row className='flex flex-row flex-wrap gap-5'>
            <Col xl={8} lg={12} md={12} xs={24} className='p-4'>
              <h4 className='upcomming_Holiday font-semibold text-xl mb-1 text-primary-color'>Description</h4>
              <p>Describe the details of internship that will be reflected on internship portal</p>
            </Col>
            <Col xl={8} lg={12} md={12} xs={24} className="flex flex-col gap-6 p-4">
              <Form.Item name="title" label="Title" rules={[{ required: status === 'DRAFT' ? false : true }, { type: "string" }]}>
                <Input className="input" placeholder="Enter Title" type="text" />
              </Form.Item>
              <Form.Item name="department" label="Department" rules={[{ required: status === 'DRAFT' ? false : true }, { type: 'number' }]}>
                <UserSelector
                  placeholder='Select'
                  className='input'
                  hasSearch={true}
                  searchPlaceHolder='Search'
                  options={filteredData}
                  onChange={onSelectChange}
                />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={[{ required: status === 'DRAFT' ? false : true }, { type: "string" }]}>
                <TextArea rows={6} placeholder="Write your description of internship" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row className='gap-5'>
            <Col xl={8} lg={12} md={12} xs={24} className='p-4'>
              <h4 className='upcomming_Holiday font-semibold text-xl mb-1 text-primary-color'>Responsibilities and Requirements</h4>
              <p>Briefly define the responsibilities and requirements of the internship</p>
            </Col>
            <Col xl={8} lg={12} md={12} xs={24} className='flex flex-col gap-6 p-4'>
              <Form.Item label="Responsibilities" name="responsibilities" rules={[{ required: status === 'DRAFT' ? false : true }, { type: "string" }]}>
                <TextArea rows={6} placeholder="Write about responsibilies of internship" />
              </Form.Item>
              <Form.Item label="Requirements" name="requirements" rules={[{ required: status === 'DRAFT' ? false : true }, { type: "string" }]}>
                <TextArea rows={6} placeholder="Write about requirements of internship" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row className='gap-5'>
            <Col xxl={8} xl={8} lg={8} xs={24} className='p-4'>
              <h4 className='upcomming_Holiday font-semibold text-xl mb-1 text-primary-color'>General</h4>
              <p>Provide the details of internship</p>
            </Col>
            <Col xxl={10} xl={14} lg={14} xs={24} className='flex flex-col  p-4'>
              <Form.Item label="Type of work" name="typeofwork" >
                <Radio.Group onChange={onWorkTypeChange} value={partAndFullTime} className='flex flex-col lg:flex-row  lg:gap-20'>
                  <Radio value={'PART_TIME'}>Part Time</Radio>
                  <Radio value={'FULL_TIME'}>Full Time</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Internship Type" name="salaryType" >
                <Radio.Group onChange={onInternshipTypeChange} value={paidAndUnpaid} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                  <Radio value={"UNPAID"}>Unpaid</Radio>
                  <Radio value={"PAID"}>Paid</Radio>
                </Radio.Group>
              </Form.Item>
              {paidAndUnpaid === "PAID" ?
                <div className='flex flex-col gap-2 max-sm:w-full md:w-[410px]'>
                  <Form.Item name="frequency" label="Frequency"
                    rules={[{ required: (status !== 'DRAFT' && paidAndUnpaid === "PAID") ? true : false }, { type: "string" }]}
                  >
                    <Select
                      className='input '
                      placeholder="Select"
                      onChange={onSelectChange}
                      options={frequencyOptions}
                    />
                  </Form.Item>
                  <Form.Item label="Amount" name="amountType"
                    rules={[{ required: (status !== 'DRAFT' && paidAndUnpaid === "PAID") ? true : false }, { type: "string" }, {
                      validator: validatePositiveNumber,
                    }]}>
                    <div className='flex gap-1'>
                      <Select
                        placeholder='Currency'
                        className='currency-select input'
                        onChange={(e) => setAmount({ ...amount, amountType: e })}
                        value={amount.amountType}
                        options={amountOptions} />

                      <Input
                        type='number'
                        value={amount.amount}
                        onChange={(e) => setAmount({ ...amount, amount: e.target.value })}
                        name="amount"
                        placeholder='0.00'

                      />
                    </div>
                  </Form.Item>
                </div>
                :
                null
              }
              <Form.Item name="natureofwork" label="Nature of work">
                <Radio.Group onChange={onNatureChange} value={remoteOnsite} className='flex flex-col lg:flex-row gap-5 lg:gap-24'>
                  <Radio value={natureofwork.virtual}>Virtual</Radio>
                  <Radio value={natureofwork.onsite}>On site</Radio>
                  <Radio value={natureofwork.hybride}>Hybrid</Radio>
                </Radio.Group>
              </Form.Item>
              {remoteOnsite === natureofwork.onsite ?
                <div className='flex flex-col gap-2  max-sm:w-full md:w-[410px]'>
                  <Form.Item name="location" label="Location"
                    rules={[{ required: (status !== 'DRAFT' && remoteOnsite === natureofwork.onsite) ? true : false }]}>
                    <Select
                      className='input'
                      placeholder="Select"
                      onChange={onSelectChange}
                      options={locationsData.map((item: any) => {
                        return { value: item.id, label: item.name }
                      })}
                    />
                  </Form.Item>
                </div>
                :
                null
              }
            </Col>
          </Row>
          <Divider />
          <Row className='gap-5'>
            <Col xl={8} lg={12} md={12} xs={24} className='p-4'>
              <h4 className='upcomming_Holiday font-semibold text-xl mb-1 text-primary-color'>Additional Information</h4>
              <p>Enter the additional information related to internship</p>
            </Col>
            <Col xl={8} lg={12} md={12} xs={24} className='flex flex-col gap-4 p-4'>
              <Form.Item label="Total Positions" name="positions"
                rules={[
                  // { required: status === 'DRAFT' ? false : true },
                  {
                    validator: validatePositiveNumber,
                  }]}>
                <Input className="input" placeholder="Enter number of positions" type="number" min={1} />
              </Form.Item>
              <Form.Item name='closingDate'
                label={<span>Expected Closing Date
                  <span className='text-slate-400'> (Optional)</span></span>}
              >
                <CommonDatePicker
                  onBtnClick={onSelectChange}
                  open={openDataPicker}
                  setOpen={setOpenDataPicker}
                  setValue={() => { }}

                />
              </Form.Item>
              <Form.Item label="Internship Duration" name="duration" rules={[{ required: status === 'DRAFT' ? false : true }, { type: "string" }]}>
                <Select
                  className='input'
                  placeholder="Select"
                  onChange={onSelectChange}
                  options={durationOptions}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Row className="flex my-3 flex-row gap-4 md:justify-end">
            <Button
              type="link"
              size="middle"
              htmlType="submit"
              onClick={() => {
                setStatus('DRAFT');
                // Notifications({ title: "Success", description: "Internship saved as draft", type: "success" })
              }}
              className="new-intern-btn white-bg-color teriary-color main-btn font-medium">
              Save Draft
            </Button>
            <Button
              type="default"
              size="middle"
              className="button-default-tertiary main-btn font-medium"
              onClick={() => {
                navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS);
                setInternShipFormData({})
              }}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              size="middle"
              className="button-tertiary main-btn font-medium">
              {role === constants.COMPANY_ADMIN ? "Publish" : "Submit"}
            </Button>
          </Row>
        </Form>
      </BoxWrapper>
    </>
  )
}

export default NewInternships;
