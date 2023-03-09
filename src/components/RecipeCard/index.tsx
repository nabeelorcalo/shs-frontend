import { Rate, Typography } from "antd";
const { Paragraph } = Typography;
import "./RecipeCard.scss";

interface RecipeCardProps {
  image?: string;
  alt?: string;
  title: string;
  description: string;
  ratingValue: number;
  // onClick?: () => void;
}

export const RecipeCard = (props: any) => {
  const { arraydata } = props;
  return (
    <>
      {arraydata.map((item: RecipeCardProps, index: any) => {
        return(
        <div className={`recipe-card flex flex-col sm p-5 cursor-pointer `}>
          <img src={item.image} alt={item.alt} width="100%" />
          <Typography.Title level={5} className="px-2 my-1 font-medium">
            {item.title}
          </Typography.Title>
          <Paragraph className="w-full">{item.description}</Paragraph>
          <Rate disabled defaultValue={item.ratingValue} className="px-2" />
        </div>)
      })}
    </>
  );
};
