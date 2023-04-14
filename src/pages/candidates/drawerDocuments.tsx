import { useState } from 'react'
import "./style.scss"
import RequestDocModel from './requestDocModel';
import { CvIcon, DbsIcon, UalIcon, PassportIcon, BrpIcon, PoaIcon,DocumentIconD } from "../../assets/images"

const ReqDocData = [

  {
    image: <CvIcon />,
    title: 'Cv',
    descr: 'Resume.pdf',
    date: "01/07/2022",
    size: '2.3 MB'
  },
  {
    image: <DbsIcon />,
    title: 'DBS',
    descr: 'Resume.pdf',
    date: "01/07/2022",
    size: '2.3 MB'
  },
  {
    image: <UalIcon />,
    title: 'University Approved Letter',
    descr: 'Resume.pdf',
    date: "01/07/2022",
    size: '2.3 MB'
  },
  {
    image: <PassportIcon />,
    title: 'Passport',
    descr: 'Resume.pdf',
    date: "01/07/2022",
    size: '2.3 MB'
  },
  {
    image: <BrpIcon />,
    title: 'BRP',
    descr: 'Resume.pdf',
    date: "01/07/2022",
    size: '2.3 MB'
  },
  {
    image: <PoaIcon />,
    title: 'Proof of Address',
    descr: 'Resume.pdf',
    date: "01/07/2022",
    size: '2.3 MB'
  },
]

const DrawerDocuments = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="doc-wrapper">
      <div className='justify-end flex mt-4'>
        <button onClick={() => setOpen(true)} className='req-btn flex items-center justify-center cursor-pointer'>
          <DocumentIconD />
          <p className='btn-text'>Request Document</p>
        </button>
        <RequestDocModel setOpen={setOpen} open={open} />
      </div>
      
      <div className='files-wrap mt-6'>
        {ReqDocData.map((data: any) => (
          <div className='files flex justify-between py-3'>
            <div className="flex gap-4">
              {data.image}
              <div className="">
                <p className='cv-heading'>{data.title}</p>
                <p>{data.descr}</p>
              </div>
            </div>
            <div>
              <p>{data.date}</p>
              <p className='ml-8'>{data.size}</p>
            </div>
          </div>

        ))}
      </div>
    </div>

  )
}

export default DrawerDocuments
