import { Link } from "react-router-dom";
import { Typography, Button, Row, Col } from 'antd';
import allien from '../../../assets/images/alert/errorboudry/allien.svg';
import '../style.scss';


export function ErrorFallback({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <div className="error-boundry pt-[7%]">
            <center className="img-wrapper">
             <img src={allien} alt='error' />
              <div className="mt-[-80px]">
                <Typography className="font-medium text-3xl md:text-5xl 
                text-secondary-color">Oops! Something went wrong!</Typography>
              </div>
              <div className="pt-[50px]">
                <Button className="btn-reload primary-bg-color  white-color rounded-lg 
                font-semibold text-base">
                  Reload Page
                </Button>
              </div>
            </center>
          </div>
        </Col>

      </Row>

    </div>
  )
}