import { Rate, Typography } from "antd";
const { Paragraph} = Typography;
import './RecipeCard.scss'

interface RecipeCardProps {
  image: string;
  alt?: string;
  title: string;
  description: string;
  boxShadow?: string;
  ratingValue: number;
  onClick?: () => void;
}

export const RecipeCard = (props: RecipeCardProps) => {
  const { image,
    title,
    description,
    alt,
    ratingValue,
  } = props
  return (
    <div
      className={`recipe-card flex flex-col max-w-sm p-5 cursor-pointer w-full`}
    >
      <img src={image} alt={alt} width="100%" />
      <Typography.Title level={5} className="px-2 my-1 font-medium">
        {title}
      </Typography.Title>
      <Paragraph className="">{description}</Paragraph>
      <Rate
        disabled
        defaultValue={ratingValue}
        className="px-2"
      
      />
    </div>
  );
};
