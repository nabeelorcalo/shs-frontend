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

  const appreciationTemplates: any = {
    // Blue color appreciation certitifcate
    1: <AppreciationCertificateOne
      name={name}
      className={className}
      fontFamily={fontFamily}
      txtSignature={txtSignature}
      imgSignature={imgSignature}
      fileURL={fileURL}
      description={description}
    />,
    
    // Red color appreciation certitifcate
    2: <AppreciationCertificateTwo
      name={name}
      className={className}
      fontFamily={fontFamily}
      txtSignature={txtSignature}
      imgSignature={imgSignature}
      fileURL={fileURL}
      description={description}
    />
  }

  const completionTemplates: any = {
    // Blue color completion certitifcate
    1: <CompletionCertificateOne
      name={name}
      className={className}
      fontFamily={fontFamily}
      txtSignature={txtSignature}
      imgSignature={imgSignature}
      fileURL={fileURL}
      description={description}
    />,

    // Red color completion certitifcate
    2: <CompletionCertificateTwo
      name={name}
      className={className}
      fontFamily={fontFamily}
      txtSignature={txtSignature}
      imgSignature={imgSignature}
      fileURL={fileURL}
      description={description}
    />
  }

  const appreciationCertificate = (id: number) => {
    const template = appreciationTemplates[id];

    return template;
  }

  const completionCertificate = (id: number) => {
    const template = completionTemplates[id];

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