import { useState } from "react";
import { PageHeader, IconButton, EvaluationCard, EvaluationStatsCard } from "../../components";
import { DownloadIconWithBg } from '../../assets/images';
import constants from "../../config/constants";
import "./style.scss";

const ViewPerformance = () => {

  const user = {
    name: 'Calvin Grayson',
    profession: 'Manager',
    avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
    learningObjectives: '74',
    discipline: '61',
    personal: '92',
  };

  const downloadClick = () => {
    alert('download popup');
  }

  return (
    <div className="view-evaluation">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Evaluation Form
            <span className="vertical-line">
              Performance
            </span>
          </div>
        }
      />

      <div className="flex flex-row items-center">
        <p className="evaluation-txt text-teriary-color">
          Evaluation Date:
          <span className="mx-2 font-medium text-secondary-color">
            June 16, 2019
          </span>
        </p>

        <IconButton
          size='large'
          className='icon-btn'
          onClick={downloadClick}
          icon={<DownloadIconWithBg />}
        />
      </div>

      <div className="flex flex-wrap">
        <div className="w-3/12">
          <EvaluationCard
            name={user.name}
            avatar={user.avatar}
            profession={user.profession}
          />
        </div>

        <div className="w-3/12">
          <EvaluationStatsCard
            name='Learning Objectives'
            percentage={user.learningObjectives}
            color='#9BD5E8'
          />
        </div>

        <div className="w-3/12">
          <EvaluationStatsCard
            name='Discipline'
            percentage={user.discipline}
            color='#E96F7C'
          />
        </div>

        <div className="w-3/12">
          <EvaluationStatsCard
            name='Personal'
            percentage={user.personal}
            color='#6AAD8E'
          />
        </div>
      </div>
    </div>
  )
}

export default ViewPerformance;