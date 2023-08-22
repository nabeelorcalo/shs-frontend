import { BoxWrapper, Loader } from "../../components";
import "./style.scss";

interface EmojiProps {
  title: string;
  data: any;
  size?: any;
  feelingTodayMood?: any;
  onClick?: any;
  id?: string;
  isLoading?: boolean
}

const EmojiMoodRating = (props: EmojiProps) => {
  const { title, data, size = 3, feelingTodayMood, onClick, id, isLoading } = props;

  return (
    <BoxWrapper>
      <div className="flex flex-col gap-2 w-full h-full emoji-mood-container">
        <p className="font-medium text-base">{title}</p>
        <div className="flex  flex-row justify-around pb-[20px] pt-[9.16px] emoji-wrapper">
          {isLoading ? <Loader /> : data.map((item: any, idx: any) => {
            return (
              <div className="emoji-container text-[#363565]">
                <div
                  key={`${id}_${idx}`}
                  className={`flex flex-col items-center ${id}_${idx}`}
                  onClick={() => onClick(item?.name)}
                >
                  {
                    <item.comp
                      className={`svgIcon ${item.name.toLowerCase() === feelingTodayMood?.mood?.toLowerCase() ? "p-0" : "grayscale p-4"
                        }  `}
                    />
                  }
                  <p className="name-font-size">{item.name}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BoxWrapper>
  );
};

export default EmojiMoodRating;
