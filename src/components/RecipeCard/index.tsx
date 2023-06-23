import { Rate, Typography } from "antd";
const { Paragraph } = Typography;
import "./style.scss";

interface RecipeCardProps {
  title: string;
  thumb: string;
  description: string;
  value?: number | undefined;
  defaultValue?: number;
  status: string;
  onCardClick: () => void
  onRateChange: (value: number) => void
  disabledRate?: boolean
}

export const RecipeCard:React.FC<RecipeCardProps> = (props:any) => {
  const {title, thumb, description, value, defaultValue, status, onCardClick, onRateChange, disabledRate} = props
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
        <Rate value={value} onChange={onRateChange} defaultValue={defaultValue} disabled={disabledRate} />
      </div>
    </div>
  );
};
