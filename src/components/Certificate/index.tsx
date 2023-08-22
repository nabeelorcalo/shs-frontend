import AppreciationCertificateOne from './Appreciation/certificateOne';
import AppreciationCertificateTwo from './Appreciation/certificateTwo';
import CompletionCertificateOne from './Completion/certificateOne';
import CompletionCertificateTwo from './Completion/certificateTwo';
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
      <CompletionCertificateOne
        name={name}
        className={className}
        fontFamily={fontFamily}
        txtSignature={txtSignature}
        imgSignature={imgSignature}
        fileURL={fileURL}
        description={description}
      />
      :
      <CompletionCertificateTwo
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

  return (
    <>
      {
        type === "certificateOfAppreciation" ? appreciationCertificate(id) : completionCertificate(id)
      }
    </>
  )
}