import { List, Typography } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import AnnouncementCard from "../AnnouncementCard";
import { RoundedAddIcon } from "../../assets/images";
import constants from "../../config/constants";
import "./style.scss";
interface AnnouncementProps {
  role?: string;
  data: any;
  loading: boolean;
  handleAddAnnouncement?: () => void;
  loadMoreData: () => void;
  height?: number;
}

export const AnnouncementList: any = (props: AnnouncementProps) => {
  const {
    data,
    loading,
    loadMoreData,
    role = "",
    handleAddAnnouncement,
    height,
  } = props;

  return (
    <div className="wrapper-shadow bg-white rounded-2xl xs:p-3 2xl:p-5">
      <Typography.Title
        className="mb-5"
        level={4}
        style={{ fontWeight: 500, marginBottom: 20 }}
      >
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
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={!loading}
          loader={<p>Loading ..</p>}
          scrollableTarget="scrollableDiv"
        >
          <List
            dataSource={data}
            renderItem={(item: any) => (
              <AnnouncementCard
                text={item.email}
                author={item.name.last}
                avatar={item.picture.large}
                dateTime="2023-03-09T10:00:00"
              />
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  );
};
