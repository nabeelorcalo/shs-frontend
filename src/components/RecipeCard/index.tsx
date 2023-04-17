import { Col, Rate, Row, Typography } from "antd";
import {BoxWrapper} from "../../components";
const { Paragraph } = Typography;
import "./style.scss";

interface RecipeCardProps {
  title: string;
  thumb: string;
  description: string;
  rating: number;
  status: string;
  onCardClick: () => void
  onRateChange: (value: number) => void
}

export const RecipeCard:React.FC<RecipeCardProps> = (props:any) => {
  const {title, thumb, description, rating, status, onCardClick, onRateChange} = props
  return (
    <div className="recipe-card">
      <div className='recipe-card-body' onClick={onCardClick}>
        <div className='recipe-card-thumb'>
          <img src={thumb} alt={title} />
        </div>
        <div className='recipe-card-header'>
          <Typography.Title level={4}>
            {title}
          </Typography.Title>
          <div className={`recipe-card-status ${status === 'published'? 'published' : 'draft'}`}>
            {status === 'published'? 'Published': 'Draft'}
          </div>
        </div>
        <div className='recipe-card-description'>
          <Paragraph>{description}</Paragraph>
        </div>
      </div>
      <div className='recipe-card-footer'>
        <Rate value={rating} onChange={onRateChange} />
      </div>
    </div>
  );
};
