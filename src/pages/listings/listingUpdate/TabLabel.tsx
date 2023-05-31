import React, { FC } from 'react'
import {Typography} from 'antd'
interface Props {
  icon: React.ReactNode
  title: React.ReactNode
  desc: React.ReactNode
}

const TabLabel: FC<Props> = ({icon, title, desc}) => {
  return (
    <div className="listing-edit-nav-item">
      <div className="listing-edit-nav-title">{icon} {title}</div>
      <Typography.Paragraph>
        {desc}
      </Typography.Paragraph>
    </div>
  )
}

export default TabLabel