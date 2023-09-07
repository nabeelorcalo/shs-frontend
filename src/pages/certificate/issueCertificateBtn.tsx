import { IssueCertificateIcon } from '../../assets/images';
import { ButtonThemePrimary } from '../../components';

const IssueCertificateBtn = (props: any) => {
  const { onClick } = props;
  return (
    <ButtonThemePrimary onClick={onClick}>
      <IssueCertificateIcon className='mr-[15px]' />
      <span className='text-base font-semibold text-white'>Issue Certificate</span>
    </ButtonThemePrimary>
  )
}

export default IssueCertificateBtn