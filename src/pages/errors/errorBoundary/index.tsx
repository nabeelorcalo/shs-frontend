import { Typography, Button, Row, Col } from "antd";
import allien from "../../../assets/images/alert/errorboudry/allien.svg";
import { useNavigate } from "react-router-dom";
import "../style.scss";

export function ErrorFallback({ error, resetErrorBoundary }: any) {
  console.log("profile errs",error)
  const navigate = useNavigate();

  return (
    <div role="alert">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <div className="error-boundry pt-[40%] sm:pt-[7%]">
            <center className="img-wrapper">
              <img src={allien} alt="error" />
              <div className="mt-[-40px] md:mt-[-80px]">
                <Typography
                  className="font-medium text-3xl md:text-5xl 
                text-secondary-color"
                >
                  Oops! Something went wrong!
                </Typography>
              </div>
              <div className="pt-[50px] flex items-center justify-center gap-4 flex-wrap">
                <Button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="btn-reload primary-bg-color  white-color rounded-lg 
                font-semibold text-base"
                >
                  Go Back
                </Button>
                <Button
                  onClick={() => {
                    location.reload();
                  }}
                  className="btn-reload primary-bg-color  white-color rounded-lg 
                font-semibold text-base"
                >
                  Reload Page
                </Button>
              </div>
            </center>
          </div>
        </Col>
      </Row>
    </div>
  );
}
