import React, { FC } from "react";
import './style.scss'
import { Typography, Avatar } from 'antd';
import dayjs from "dayjs";
import constants from "../../../../config/constants";
interface AgentProps {
  data: any,
  publishedProperties: any,
  successfullClients: any,
  lastSeen: any
}

const AgentDetail: FC<AgentProps> = ({data, publishedProperties, successfullClients, lastSeen}) => {
  const {MEDIA_URL} = constants;
  return (
    <div className="property-agent-detail">
      <div className='agent-profile-info'>
        <Avatar size={80} src={`${MEDIA_URL}/${data?.profileImage?.mediaId}.${data?.profileImage?.metaData.extension}`}>
          {data?.firstName.charAt(0)} {data?.lastName.charAt(0)}
        </Avatar>
        <div className='agent-info'>
          <Typography.Title level={4}>{data?.firstName} {data?.lastName}</Typography.Title>
          <div className='last-seen'>Last seen {lastSeen}</div>
        </div>
      </div>

      <div className='agent-member-since'>
        <div className="member-since-label">
          Member Since
        </div>
        <div className="member-since-value">
          {dayjs(data?.createdAt).format('MMMM YYYY')}
        </div>
      </div>

      <div className="agent-detail-list">
        <ul>
          <li>
            <div className="agent-detail-list-item-left">Language spoken</div>
            <div className="agent-detail-list-item-right">English</div>
          </li>
          <li>
            <div className="agent-detail-list-item-left">Listing published</div>
            <div className="agent-detail-list-item-right">{publishedProperties}</div>
          </li>
          <li>
            <div className="agent-detail-list-item-left">Successful clients</div>
            <div className="agent-detail-list-item-right">{successfullClients}</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AgentDetail;
