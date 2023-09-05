import { Divider, Rate } from 'antd';
import './style.scss'

export const InternshipPipeLineCard = (props: any) => {
  const { name, rating, time, status, avatar, handleUserClick } = props

  const fullName = name;
  // Split the full name into separate parts
  const nameParts = fullName.split(" ");
  // Extract the first and second parts
  const firstName = nameParts[0];
  const middleName = nameParts[1];
  // Concatenate the first and second parts
  const shortenedName = `${firstName} ${middleName}`;

  return (
    <div className='flex flex-col gap-1 rounded-lg p-3  pipeline-card-wrapper cursor-pointer' onClick={handleUserClick}>
      <div className='flex flex-row justify-start items-center gap-3'>
        {avatar}
        <div className='flex flex-col gap-2 justify-end' >
          <p className='text-base'>{shortenedName}</p>
          {status === "offerLetter" ? <p><span className='px-2 text-sm text-warning-bg-color text-white rounded-lg'>Pending</span></p> : null}
          {status === "contract" ? <p><span className='px-2 text-sm active-bg text-white rounded-lg'>Signed</span></p> : null}
        </div>
      </div>
      <Divider className='divider-color my-3' />
      <div className='flex flex-row justify-between items-center flex-wrap'>
        <Rate disabled className='text-base' value={rating} defaultValue={0} />
        <p className='text-sm'>{time}</p>
      </div>
    </div>

  )
}