import { FC } from 'react';
import CustomProgress from '../CustomProgress';
interface IRegionData {
  greater_london: string;
  west_midlands: string;
  north_east: string;
  scotland: string;
  other: string;
  northern_ireland: string;
}
export const RegionCard: FC<{ regionData: any }> = (props) => {
  const { regionData }: any = props;
  const regionDataList = Object.keys(regionData);
  return (
    <div className=''>
      <p className='font-semibold text-[20px] leading-[28px] pb-[32px]'>
        Region
      </p>
      {regionDataList?.map((item: string, index: number) => (
        <div key={index} className='pb-[26px]'>
          <CustomProgress country={item} progress={regionData[item]} />
        </div>
      ))}
    </div>
  );
};
