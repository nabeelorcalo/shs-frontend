import { DownloadDocumentIcon, PreviewIcon } from "../../assets/images";
import constants from "../../config/constants";
import { byteToHumanSize } from "../../helpers";
import { NoDataFound } from "../NoData";

export const DocumentList = (props: any) => {
  const { reqDocData, setOpenPreview, setPreViewModal } = props;
  return (
    <div className="files-wrap mt-6">
      {reqDocData?.length > 0 ? (
        reqDocData?.map((data: any, index: number) => (
          <div key={index} className="files flex justify-between py-3 px-3">
            <div className="flex gap-4">
              {data?.image}
              <div className="">
                <p className="cv-heading">{data?.title}</p>
                <p className="text-sm">{data?.descr}</p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <div>
                <p className="text-sm text-success-placeholder-color">{data?.date}</p>
                <p className="text-sm text-success-placeholder-color text-right">{data?.size ? byteToHumanSize(data?.size) : ""}</p>
              </div>
              <div className="icons-sec">
                <p className="h-[40px] w-[40px] flex items-center justify-center"
                  onClick={() => {
                    setOpenPreview(true);
                    setPreViewModal({
                      extension: data?.extension,
                      url: `${constants?.MEDIA_URL}/${data?.fileUrl}`,
                    });
                  }}>
                  <PreviewIcon />
                </p>
              </div>
              <div className="icons-sec">
                <p className="h-[40px] w-[40px] flex items-center justify-center">
                  <a href={`${constants?.MEDIA_URL}/${data?.fileUrl}`}>
                    <DownloadDocumentIcon />
                  </a>
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <NoDataFound />
      )}
    </div>
  );
};
