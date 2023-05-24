import { Typography, Radio } from 'antd';
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
import type { RadioChangeEvent } from 'antd';
interface EmojiProps {
  title: string,
  value: number
  disabled?: boolean
}


export const EvaluationRating = (props: EmojiProps) => {
  const { title, value, disabled=false } = props;

  return (
    <BoxWrapper className="evaluation-card">
      <div className="flex flex-col gap-2 w-full h-full emoji-mood-container">
        <p className='font-medium text-base'>
          {title}
        </p>
        <div className="flex  flex-row justify-around pb-[20px] pt-[9.16px] emoji-wrapper">
        <Radio.Group defaultValue={value} disabled={disabled}>
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
          {/* {
            data.map((item: any, idx: any) => {
              return (
                <div className='emoji-container text-[#363565]'>
                  <div key={`${id}_${idx}`} className={`flex flex-col items-center ${id}_${idx}`} onClick={onClick}>
                    {
                      activeIconIndex === idx || activeIconIndex === -1 ?
                        <item.comp className='svgIcon' />
                        :
                        <item.colorLessComp className='svgIcon' />
                    }
                    <p className='name-font-size'>{item.name}</p>
                  </div>
                </div>
              )
            })
          } */}
        </div>
      </div>
    </BoxWrapper>
  )
}
