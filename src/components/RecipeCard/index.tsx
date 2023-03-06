import { Rate, Typography } from "antd";
const { Paragraph, Text } = Typography;
interface RecipeCardProps {
  image: string;
  alt?: string;
  title: string;
  description: string;
  radius?: string;
  boxShadow?: string;
  ratingValue: number;
  ratingColor: string;
  onClick?: () => void;
}

export const RecipeCard = ({
  image,
  title,
  description,
  radius,
  boxShadow,
  alt,
  ratingValue,
  ratingColor,
}: RecipeCardProps) => {
  return (
    <div
      style={{ borderRadius: radius, boxShadow: boxShadow }}
      className={`flex flex-col max-w-sm p-5 cursor-pointer`}
    >
      <img src={image} alt={alt} width="100%" />
      <Typography.Title level={5} className="px-2 my-1 font-medium">
        {title}
      </Typography.Title>
      <Paragraph className="md:w-80 px-2 ">{description}</Paragraph>
      <Rate
        disabled
        defaultValue={ratingValue}
        className="px-2"
        style={{ color: ratingColor }}
      />
    </div>
  );
};
