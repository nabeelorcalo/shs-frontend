import { Button } from 'antd';
import { IssueCertificateIcon } from '../../assets/images';

const IssueCertificateBtn = (props: any) => {
  const { onClick } = props;
  return (
    <Button className='issue-certificate flex items-center capitalize' onClick={onClick}>
      <IssueCertificateIcon className='mr-[15px]' />
      <span className='text-base font-semibold text-white'>issue certificate</span>
    </Button>
  )
}

export default IssueCertificateBtn