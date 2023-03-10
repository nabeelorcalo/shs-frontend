import React, { FC } from "react";
import './style.scss'
import { Button } from 'antd';
import { IconFilters, IconFiltersAngle } from '../../assets/images'

interface FiltersButtonProps {
  label: React.ReactNode;
  onClick: () => void;
}

const FiltersButton: FC<FiltersButtonProps> = ({ label, onClick }) => {
  return (
    <Button
      className="filter-button"
      icon={<IconFilters />}
      onClick={onClick}
    >
      {label}
      <IconFiltersAngle />
    </Button>
  )
}

export default FiltersButton;
