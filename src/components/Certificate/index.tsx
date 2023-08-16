import React from 'react';
import {
  AppreciationCertificateImgOne, AppreciationCertificateSampleOne,
  AppreciationCertificateImgTwo, AppreciationCertificateSampleTwo,
  CompletionCertificateImgOne, CompletionCertificateSampleOne,
  CompletionCertificateImgTwo, CompletionCertificateSampleTwo,
} from "../../assets/images";

import AppreciationCertificateOne from './Appreciation/certificateOne';
import AppreciationCertificateTwo from './Appreciation/certificateTwo';
import CompletionCertificateOne from './Appreciation/certificateOne';
import CompletionCertificateTwo from './Appreciation/certificateTwo';
interface CertificateProps {
  id: number,
  type: string;
  name: string;
  className?: string;
  imgSignature?: any;
  fontFamily: string;
  txtSignature?: string;
  fileURL?: string;
  description?: string;
}

export const Certificate: any = (props: CertificateProps) => {
  const { id, type, name, description, txtSignature, fontFamily, imgSignature, fileURL, className } = props;

  const appreciationCertificate = (id: number) => {
    const template = id === 1 ?
      <AppreciationCertificateOne
        name={name}
        className={className}
        fontFamily={fontFamily}
        txtSignature={txtSignature}
        imgSignature={imgSignature}
        fileURL={fileURL}
        description={description}
      />
      :
      <AppreciationCertificateTwo
        name={name}
        className={className}
        fontFamily={fontFamily}
        txtSignature={txtSignature}
        imgSignature={imgSignature}
        fileURL={fileURL}
        description={description}
      />

    return template;
  }

  const completionCertificate = (id: number) => {
    const template = id === 1 ?
      <CompletionCertificateImgOne className={className} />
      :
      <CompletionCertificateImgTwo className={className} />

    return template;
  }

  return (
    <>
      {
        type === "Appreciation" ? appreciationCertificate(id) : completionCertificate(id)
      }
    </>
  )
}