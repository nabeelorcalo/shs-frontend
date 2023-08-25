import { Button } from "antd";
import { BoxWrapper } from "../../../../../components";
import CoverPhoto from "../../../../../assets/images/serachJobs/logo.png";
import "./Styles.scss";

interface Props {
  maxWidth?: string;
  id?: string;
  coverPhoto?: string;
  discount?: string;
  autualPrice?: string;
  withDiscountPrice?: string;
  propertyAvailableFor?: string;
  propertyType?: string;
  totalBeds?: string;
  totalWashRoom?: string;
  tags?: string[];
  location?: string;
  handleDetailClick?: () => void;
}

const AllCardsTab = (props: any) => {
  const {
    tags = ["Full Time ", "Paid", "On-Site"],
    coverPhoto,
    heading = "Power Source",
    location = "London, UK",
    time = "Posted 45 mins ago",
    post = "Frontend Developer",
    description = "In this role, you will Write high quality, maintainable, reusable code following solid principles, Independently clarify technical requirements, develop coding estimates and apply a broad...",
    handleDetailClick,
    para
  } = props;

  return (
    <>
      <BoxWrapper className="h-full">
        <div className="card-wrapper flex flex-col">
          <div className="flex">
            <div>
              {!coverPhoto?.includes('undefined') ? <img src={coverPhoto} width={30} height={30} /> : <div className="static-avatar">
                <p>{para}</p>
              </div>}
            </div>
            <div className="mx-5">
              <h2 className="comp-title font-normal text-base	m-0">{heading}</h2>
              <span className="my-3 text-secondary-color text-sm">{location}</span>
              <span className="mx-3 text-secondary-color text-sm">{time}</span>
            </div>
          </div>
          <p className="comp-title font-medium text-xl my-3">{post}</p>
          <p className="text-secondary-color text-sm h-[100px] overflow-auto" >{description}</p>
          <div className="tags flex items-center gap-[10px] my-5 flex-wrap">
            {tags.map((tags: any | string, i: number) => (
              <p key={i} className="rounded-[4px] text-sm tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                {tags}
              </p>
            ))}
          </div>
          <Button
            className="view-detail-btn my-7 font-semibold flex-1 card-btn detail-btn rounded-lg accommodation-badger white-color" onClick={handleDetailClick}>
            View Details
          </Button>
        </div>
      </BoxWrapper>
    </>
  );
};

export default AllCardsTab;
