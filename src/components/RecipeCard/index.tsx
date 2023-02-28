import { Rate } from 'antd';
interface RecipeCardProps {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  radius?: string;
  boxShadow?: string;
  padding?: string;
}

export const RecipeCard = ({
  image,
  title,
  description,
  radius,
  boxShadow,
  alt,
  padding,
}: RecipeCardProps) => {
  return (
    <div className={`flex flex-col max-w-sm ${padding}  ${radius} ${boxShadow}`}>
      <img src={image} alt={alt} />
      <p>{title}</p>
      <p>{description}</p>
      <Rate disabled defaultValue={4} />
    </div>
  );
};
