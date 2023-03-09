import { useState } from "react";
import PageHeader from '../../../components/PageHeader';
import "../style.scss";

const Intern = () => {
  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">
              Maria Sanoid
            </span>
          </div>
        }
      />
    </>
  )
}

export default Intern