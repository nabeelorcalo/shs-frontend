import React, { FC } from "react";
import { Button } from 'antd';
import { IconFilters, IconFiltersAngle } from '../../assets/images'
import './style.scss'

interface FiltersButtonProps {
  label: React.ReactNode;
  onClick: () => void;
}

export const FiltersButton: FC<FiltersButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      className="filter-button"
      icon={<IconFilters />}
      onClick={onClick}
    >
      <span className="label">
      {label}
      <IconFiltersAngle />
      </span>
    </Button>
  )
}
