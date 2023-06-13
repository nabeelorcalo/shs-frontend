import { StageProgressStepper } from '../StageProgressStepper'
import { Divider } from 'antd'
import { IconEmail, IconPhone, IconLocation } from '../../assets/images'
import './style.scss'
import dayjs from 'dayjs'

interface drawerProps {
  data?: any
}
export const StageStepper = (props: drawerProps) => {
  const { data } = props;
  const appliedDate = dayjs(data?.createdAt).format("DD/MM/YYYY")
  const statusArray = [
    {
      title: 'Applied Date',
      data: appliedDate,
    },
    {
      title: 'Position',
      data: data?.internship?.title,
    },
    {
      title: 'Type of Work',
      data: data?.internship?.internType,
    },
    {
      title: 'Internship Type',
      data: data?.internship?.salaryType,
    },
    {
      title: 'Nature of Word',
      data: data?.internship?.locationType,
    },
  ]
  return (
    <div className='flex flex-col'>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className='img-box-shadow'>
          <img
            src={`https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
            width={150}
            height={150}
          />
        </div>
        <div className='flex flex-col justify-between gap-3'>
          <p className='text-xl font-medium comp-title'>
            {data?.internship?.company?.businessName}.
            {data?.internship?.company?.businessSector}
          </p>
          <div className='flex flex-row flex-wrap gap-3'>
            <IconEmail />
            <p className='text-sm'>{data?.internship?.company?.website}</p>
          </div>
          <div className='flex flex-row flex-wrap gap-3'>
            <IconPhone />
            <p className='text-sm'>{data?.internship?.company?.user?.phoneNumber}</p>
          </div>
          <div className='flex flex-row flex-wrap gap-3'>
            <IconLocation />
            <p className='text-sm'>{data?.internship?.company?.ownerAddress}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className='flex flex-col gap-2'>
        <p className='font-semibold comp-title text-lg'>Stage</p>
        <StageProgressStepper />
        <div className='flex flex-row flex-wrap justify-between'>
          {
            statusArray.map((item: any) => {
              return (
                <div className='flex flex-col gap-1'>
                  <p className='font-semibold text-base comp-title'>{item?.title}</p>
                  <p className='text-sm capitalize'>{item?.data?.toLowerCase()?.replace("_",' ')}</p>
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}
