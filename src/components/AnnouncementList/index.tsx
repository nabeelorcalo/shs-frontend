import React from 'react';
import { List, Skeleton, Typography } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import AnnouncementCard from '../AnnouncementCard';

interface AnnouncementProps {
  data: any,
  loading: boolean,
  loadMoreData: () => void;
}

export const AnnouncementList: any = (props: AnnouncementProps) => {
  const { data, loading, loadMoreData } = props;

  return (
    <BoxWrapper>
      <Typography.Title
        level={4}
        style={{ fontWeight: 500 }}
      >
        Announcements
      </Typography.Title>

      <div
        id="scrollableDiv"
        style={{
          height: 548,
          overflow: 'auto',
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
    </BoxWrapper>
  )
}