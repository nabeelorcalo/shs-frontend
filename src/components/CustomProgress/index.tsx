import { FC } from 'react'
import { Progress, Row } from 'antd';

// p tag common  styling className
const pStyle = "text-xs leading-[18px] font-normal text-secondary-color capitalize"

const CustomProgress: FC<{ country: string, progress: string | number }> = (props) => {
  const { country, progress } = props;
  return (
    <div>
      <Row justify="space-between" align="middle">
        <p className={pStyle}>{country.replace("_", " ")}</p>
        <p className={pStyle}>{progress}%</p>
      </Row>
      <Progress percent={+progress} size={8} showInfo={false} strokeColor={+progress>49?"#363565":"#9BD5E8"} trailColor="#EBECF1" />
    </div>
  )
}

export default CustomProgress