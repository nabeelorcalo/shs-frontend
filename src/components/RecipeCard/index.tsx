import { Col, Rate, Row, Typography } from "antd";
import {BoxWrapper} from "../BoxWrapper/boxWrapper";
import { Button } from "../Button";
const { Paragraph } = Typography;
import "./RecipeCard.scss";

interface RecipeCardProps {
  image?: string;
  alt?: string;
  title: string;
  description: string;
  ratingValue: number;
  button?: any
  onClick?: () => void;
}

export const RecipeCard = (props: any) => {
  const { arraydata } = props;
  return (
    <div className="recipe-card">
      <Row gutter={[10,10]}>
        {arraydata.map((item: RecipeCardProps, index: any) => {
          return (

            <Col key={index} className="gutter-row" xs={24} xl={12} xxl={6} >
              <BoxWrapper className=" boxwrapper">
                <div className={` flex flex-col sm  cursor-pointer `}>
                  <img src={item.image} alt={item.alt} width="100%" />
                  <div className="flex justify-between"><Typography.Title level={5} className="px-2 my-1 font-medium">
                    {item.title}
                  </Typography.Title>
                    {item?.button}
                  </div>
                  <Paragraph className="w-full font-normal text-sm md:text-base">{item.description}</Paragraph>
                  <Rate disabled defaultValue={item.ratingValue} className="px-2" />
                </div>
              </BoxWrapper>
            </Col>


          )
        })}
      </Row>


    </div>
  );
};
