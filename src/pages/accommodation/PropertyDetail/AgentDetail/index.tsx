import React, { FC } from "react";
import './style.scss'
import { Typography, Avatar } from 'antd';
import avatar from '../../../../assets/images/header/avatar.svg'


const AgentDetail = () => {
  return (
    <div className="property-agent-detail">
      <div className='agent-profile-info'>
        <Avatar size={80} src={avatar} />
        <div className='agent-info'>
          <Typography.Title level={4}>Lincoln George</Typography.Title>
          <div className='last-seen'>Last seen 2 hours ago</div>
        </div>
      </div>

      <div className='agent-member-since'>
        <div className="member-since-label">
          Member Since
        </div>
        <div className="member-since-value">
          January 2022
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
            <div className="agent-detail-list-item-right">1</div>
          </li>
          <li>
            <div className="agent-detail-list-item-left">Happy tenants</div>
            <div className="agent-detail-list-item-right">4</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AgentDetail;
