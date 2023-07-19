import { Radio } from 'antd';
import { BoxWrapper } from '../../components';
import './style.scss';
import {
  SadSelected,
  SadGray,
  NeutralSelected,
  NeutralGray,
  HappySelected,
  HappyGray,
  AwesomeSelected,
  AwesomeGray,
} from '../../assets/images';
interface EmojiProps {
  title: string,
  rating?: any
  disabled?: boolean
  onChange?: any
  name?: any
  value?: any
}


export const EvaluationRating = (props: EmojiProps) => {
  const { title, rating, disabled=false, onChange, name, value } = props;

  return (
    <BoxWrapper className="evaluation-card">
      <div className="flex flex-col gap-2 w-full h-full emoji-mood-container">
        <p className='font-medium text-base'>
          {title}
        </p>
        <div className="flex  flex-row justify-around pb-[20px] pt-[9.16px] emoji-wrapper">
          <Radio.Group value={value} disabled={disabled} onChange={onChange} name={name}>
            <Radio.Button value={1}>
              <div className="emoji-icons">
                <SadGray />
                <SadSelected className='selected' />
              </div>
              <p className='emoji-icon-title'>Unsatisfactory</p>
            </Radio.Button>
            <Radio.Button value={2}>
              <div className="emoji-icons">
                <NeutralGray />
                <NeutralSelected className='selected' />
              </div>
              <p className='emoji-icon-title'>Still Learning</p>
            </Radio.Button>
            <Radio.Button value={3}>
              <div className="emoji-icons">
                <HappyGray />
                <HappySelected className='selected' />
              </div>
              <p className='emoji-icon-title'>Meeting Expectations</p>
            </Radio.Button>
            <Radio.Button value={4}>
              <div className="emoji-icons">
                <AwesomeGray />
                <AwesomeSelected className='selected' />
              </div>
              <p className='emoji-icon-title'>Exceeding Expectations</p>
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>
    </BoxWrapper>
  )
}
