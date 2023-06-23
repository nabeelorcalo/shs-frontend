import { List, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import AnnouncementCard from "../AnnouncementCard";
import { RoundedAddIcon } from "../../assets/images";
import constants from "../../config/constants";
import "./style.scss";
import { NoDataFound } from "../NoData";
interface AnnouncementProps {
  role?: string;
  data: any;
  loading: boolean;
  handleAddAnnouncement?: () => void;
  loadMoreData: () => void;
  height?: number;
}

export const AnnouncementList: any = (props: AnnouncementProps) => {
  const { data, role = "", handleAddAnnouncement, height } = props;

  return (
    <div className="wrapper-shadow bg-white rounded-2xl xs:p-3 2xl:p-5">
      <Typography.Title className="mb-5" level={4} style={{ fontWeight: 500, marginBottom: 20 }}>
        Announcements
      </Typography.Title>

      {(role === constants?.MANAGER || role === constants?.COMPANY_ADMIN) && (
        <div
          className="light-sky-blue-bg mb-5 flex items-center justify-center h-[69px] rounded-2xl cursor-pointer border border-[#D9DBE9] border-dashed	"
          onClick={handleAddAnnouncement}
        >
          <RoundedAddIcon />
        </div>
      )}
      <div
        className="announcements-wrapper"
        id="scrollableDiv"
        style={{
          height: height ?? 548,
          overflow: "auto",
        }}
      >
        {data ? (
          <List
            dataSource={data?.rows}
            renderItem={(item: any) => (
              <AnnouncementCard
                key={item?.id}
                text={item?.description}
                author={item?.announcer?.firstName + " " + item?.announcer?.lastName}
                avatar={`${constants.MEDIA_URL}/${item?.announcer?.profileImage.mediaId}.${item?.announcer?.profileImage.metaData.extension}`}
                dateTime={item?.createdAt}
              />
            )}
          />
        ) : (
          <NoDataFound isNoBorder={true} />
        )}
      </div>
    </div>
  );
};
