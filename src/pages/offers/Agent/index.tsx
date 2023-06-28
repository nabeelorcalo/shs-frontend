import { useEffect, useState } from "react";
import { Loader, PageHeader, PopUpModal } from "../../../components";
import { Button, Row, Col, Card } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { OfferProperty } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import "./style.scss";
import NewOfferModal from "./newOffer";

const OffersAgent = () => {
  const [state, setState] = useState<any>({ isToggle: false, data: {} });
  const { getOffersDetails, offersData, isLoading } = useCustomHook();

  useEffect(() => {
    getOffersDetails()
  }, [])

  return (
    <div className="offers-agent">
      <PageHeader title="Offers" bordered={true} />
      {offersData?.length === 0 ? (
        <div className="offers-agent-body flex justify-center items-center flex-col h-[50vh] text-center">
          <div className="font-medium text-4xl text-primary-color mb-4">
            No Offers Yet
          </div>
          <div className="font-normal text-base text-primary-color mb-8">
            Create your first offer and draw attention to your properties!
          </div>

          <div className="">
            <Button
              onClick={() => setState({ isToggle: true, data: {} })}
              className="add-offers-btn flex items-center"
            >
              <PlusCircleFilled className="white-color green-graph-tooltip-bg rounded-[80%]"
                width={22}
                height={22}
              />
              <span className="white-color">Add New Offer</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="offers-main">
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setState({ isToggle: true, data: {} })}
              className="add-offers-btn flex items-center"
            >
              <PlusCircleFilled className="white-color green-graph-tooltip-bg rounded-[80%]"
                width={22}
                height={22}
              />
              <span className="white-color">Add New Offer</span>
            </Button>
          </div>

          <Row gutter={[20, 20]}>
            {isLoading ? <Loader /> :
              offersData?.map((item: any, index: any) => {
                return (
                  <Col key={index} xxl={4} xl={6} lg={8} md={12} sm={24} xs={24}>
                    <Card
                      key={item.id}
                      className="offer-card h-[386px]"
                      cover={<img src={OfferProperty} alt="img" />}
                    >
                      <div className="offer-card-body">
                        <div className="dashboard-primary-color font-semibold text-xl pb-4">
                          {item.property?.addressOne}
                        </div>

                        <div className="dashboard-primary-color font-normal text-sm pb-4">
                          {item.monthlyDiscount}% off-between {item.minStayMonths} and {item.maxStayMonths} months bookings
                        </div>

                        <div className="w-full">
                          <Button
                            onClick={() => setState({ isToggle: true, data: item })}
                            className="offer-card-btn w-full">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </div>
      )}
      {state.isToggle && <NewOfferModal state={state} setState={setState} />}
    </div>
  );
};

export default OffersAgent;