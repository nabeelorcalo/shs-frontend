// import { Education1Icon, EducationIcon } from '../../assets/images';
import { BoxWrapper } from '../../components';
import './style.scss';
import Education from '../../assets/images/digivault/education.png'
import Education1 from '../../assets/images/digivault/education1.png'

const DigivaultCard = () => {
  return (
    <BoxWrapper className='digivault-wrapper'>
      <div className='upper-part'>
        <div className='bgImg'>
          {/* <EducationIcon  /> */}
          <img src={Education} alt="icon" />
        </div>
        <img src={Education1} alt='icon' />
      </div>
      <h4>Education</h4>
      <h6>Manage your educational documents</h6>
    </BoxWrapper>
  )
}

export default DigivaultCard
