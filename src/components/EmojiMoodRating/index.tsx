import { Typography } from 'antd';
import { BoxWrapper } from '../../components';
import './style.scss';

interface EmojiProps {
  title: string,
  data: any,
  size?: any,
  activeIconIndex?: number,
  onClick?: any,
  id?: string,
}

const EmojiMoodRating = (props: EmojiProps) => {
  const { title, data, size = 3, activeIconIndex = -1, onClick, id } = props;

  return (
    <BoxWrapper>
      <div className="flex flex-col gap-2 w-full h-full emoji-mood-container">
        <p className='font-medium text-base'>
          {title}
        </p>
        <div className="flex  flex-row justify-around pb-[20px] pt-[9.16px] emoji-wrapper">
          {
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
          }
        </div>
      </div>
    </BoxWrapper>
  )
}

export default EmojiMoodRating