const SenderRecieverDetails = (props: any) => {
  const { detailsData, hasEmail } = props;
  return (
    <div>
      {detailsData?.slice(0, hasEmail ? 4 : -1)?.map((item: any, index: any) => {
        return (
          <div key={index}>
            <div className="pb-4">
              <p className="text-success-placeholder-color text-base font-normal">
                {item.label}
              </p>
              <p className="text-lg font-normal text-secondary-color">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default SenderRecieverDetails
