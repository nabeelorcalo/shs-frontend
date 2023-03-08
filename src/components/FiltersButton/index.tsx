import React, { FC } from "react";
import './style.scss'
import { Button } from 'antd';

interface FiltersButtonProps {
  title: React.ReactNode;
  actions?: boolean;
  children?: React.ReactNode 
}

const FiltersButton: FC<FiltersButtonProps> = ({ title, actions=false, children  }) => {
  return (
    <Button>
      
    </Button>
  )
}

export default FiltersButton;
