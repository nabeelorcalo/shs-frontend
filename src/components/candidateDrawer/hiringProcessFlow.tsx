const bgColor: any = {
  pending: "yellow-bg",
  signed: "text-success-bg-color",
}
export const HiringProcessFlow = (props: any) => {
  const { internshipTitle, offerContractStatus, hiringProcessList, setOpen, handleHiringProcess, hiringBtnText } =
    props;
  return (
    <div className="hiring flex flex-wrap justify-between items-center mt-5">
      <div className="flex items-center gap-5">
        <p className="heading capitalize">{internshipTitle}</p>
        {offerContractStatus && (
          <p
            className={`text-sm text-white capitalize 
            ${bgColor[offerContractStatus?.toLowerCase()] || `text-error-bg-color`}
              px-[10px] py-[2px] rounded-lg`}
          >
            {offerContractStatus?.toLowerCase() === "changerequest"
              ? "change request" : offerContractStatus?.toLowerCase()}
          </p>
        )}
      </div>
      {!hiringProcessList?.includes("rejected") && (
        <div className="gap-2 flex">
          <button onClick={() => setOpen(true)} className="rej-btn cursor-pointer">
            Reject
          </button>
          {!hiringProcessList?.includes("hired") &&
            !["changerequest", "rejected"].includes(offerContractStatus?.toLowerCase()) && (
              <button className="move-btn cursor-pointer" onClick={() => handleHiringProcess()}>
                {hiringBtnText}
              </button>
            )}
        </div>
      )}
    </div>
  );
};
