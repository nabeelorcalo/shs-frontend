import React, { useEffect, useState } from 'react'
import { Typography, Divider, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Logo } from '../../../../assets/images'
import { DropDown } from '../../../../components'
import { useRecoilState } from 'recoil'
import { withDrawalRequestState } from '../../../../store/withDrawalRequest'
import useCustomHook from '../../actionHandler'
import { useParams } from 'react-router-dom'
import '../../style.scss'
import dayjs from 'dayjs'

const limit = 100;

const ViewReciept = () => {
  let params = useParams()
  const [value, setValue] = useState('')
  const action = useCustomHook()
  const withDrawalAmount = useRecoilState<any>(withDrawalRequestState)
  const selectedItem = withDrawalAmount[0].filter(
    (item: any) => item.transactionId === params.id
  )

  const pdfHeader = [
    'Bank Name',
    'Beneficiary Account Name',
    'Beneficiary Account Number',
    'Position',
    'Amount',
    'Fees'
  ]

  const pdfBody = withDrawalAmount[0]?.map((item: any) => [
    item?.bankName,
    item?.userName,
    item?.bankId,
    item?.position,
    item?.amount,
    item?.fee
  ])

  useEffect(() => {
    action.getWithDrawalRequestData({ page: 1, limit: limit })
  }, [])
  return (
    <div className='delgate-agent-view-reciept p-12'>
      <div className='main-box'>
        <div className='flex items-center justify-between p-4'>
          <Typography className='text-primary-title-color font-medium text-xl'>
            Withdrawal Request
          </Typography>
          <CloseOutlined />
        </div>
        <hr className='mb-7 mt-2' />
        <div className='action-button flex items-center justify-between pr-4 pl-4'>
          <Logo />
          <div className='flex items-center justify-end gap-x-4'>
            <Button className='px-[36px] py-[9px] text-info-color-opacity text-info-color-dark text-base font-semibold border-none'>
              Completed
            </Button>
            <DropDown
              requiredDownloadIcon
              options={['pdf', 'excel']}
              value={value}
              setValue={(val: any) => {
                action.downloadPdfOrCsv(
                  val,
                  pdfHeader,
                  withDrawalAmount[0]?.map((item: any) => {
                    return {
                      bankName: item?.bankName,
                      beneficaryAccountName: item?.userName,
                      beneficaryAccountNumber: item?.bankId,
                      position: item?.position,
                      amount: item?.amount,
                      fee: item?.fee
                    }
                  }),
                  'With Drawal Request',
                  pdfBody
                )
              }}
            />
          </div>
        </div>
        <div className='flex items-end justify-between p-4'>
          <div className='grid gap-y-1'>
            <Typography className='text-primary-title-color text-base font-medium'>
              Name:
              <span className='pl-[8rem] text-secondary-color text-base font-normal'>
                Luna Todd
              </span>
            </Typography>
            <Typography className='text-primary-title-color text-base font-medium'>
              Position :
              <span className='pl-[6.6rem] text-secondary-color text-base font-normal'>
                Delegate Agent
              </span>
            </Typography>
            <Typography className='text-primary-title-color text-base font-medium'>
              Withdrawal Date:
              <span className='pl-[3rem] text-secondary-color text-base font-normal'>
                {dayjs(selectedItem[0]?.createdAt).format('YYYY-MM-DD')}
              </span>
            </Typography>
          </div>
          <Typography className='text-primary-title-color text-base font-medium'>
            Transaction ID :
            <span className='pl-[3rem] text-secondary-color text-base font-normal'>
              {selectedItem[0]?.transactionId}
            </span>
          </Typography>
        </div>
        <div className='m-3 rounded-lg border-1 border-solid border-[#E6F4F9] text-input-bg-color p-2'>
          <div className='flex items-center justify-between p-2'>
            <Typography className='text-dark-blue-recipt text-sm font-semibold'>
              Bank Name
            </Typography>
            <Typography className='text-secondary-color text-sm font-normal'>
              {selectedItem[0]?.bankName}
            </Typography>
          </div>
          <hr className='text-error-bg-color mt-2' />
          <div className='flex items-center justify-between p-2'>
            <Typography className='text-dark-blue-recipt text-sm font-semibold'>
              Beneficiary Account Name
            </Typography>
            <Typography className='text-secondary-color text-sm font-normal'>
              Luna Todd
            </Typography>
          </div>
          <hr className='text-error-bg-color mt-2' />
          <div className='flex items-center justify-between p-2'>
            <Typography className='text-dark-blue-recipt text-sm font-semibold'>
              Beneficiary Account Number
            </Typography>
            <Typography className='text-secondary-color text-sm font-normal'>
              {selectedItem[0]?.bankId}
            </Typography>
          </div>
          <hr className='text-error-bg-color mt-2' />
          <div className='flex items-center justify-between p-2'>
            <Typography className='text-dark-blue-recipt text-sm font-semibold'>
              Amount
            </Typography>
            <Typography className='text-secondary-color text-sm font-normal'>
              {selectedItem[0]?.amount}
            </Typography>
          </div>
          <hr className='text-error-bg-color mt-2' />
          <div className='flex items-center justify-between p-2'>
            <Typography className='text-dark-blue-recipt text-sm font-semibold'>
              Fees
            </Typography>
            <Typography className='text-secondary-color text-sm font-normal'>
              £ {selectedItem[0]?.fee}
            </Typography>
          </div>
          <hr className='text-error-bg-color mt-2 mb-2' />
          <div className='total-section'>
            <Typography className='white-color text-sm font-semibold'>
              Total Amount
            </Typography>
            <Typography className='white-color text-sm font-normal'>
              £ {selectedItem[0]?.totalAmount}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewReciept
