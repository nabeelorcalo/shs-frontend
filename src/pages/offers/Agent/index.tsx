import { useState } from "react";
import "./style.scss";
import { PageHeader, PopUpModal } from "../../../components";
import { Button, Row, Col, Card, Select, InputNumber, Form, Input } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { Offerimg1, Offerimg3 } from "../../../assets/images";
import { cardData } from "../../propertyAgent/propertDahboard/Dashboard/DashboardMock";



const OffersAgent = () => {
  const [isOpen, setISOpen] = useState<any>(false);
  const [offersCardData, setData] = useState<any>(
    [
      {
        img: Offerimg1,
        title: "Boston Heights",
        disc: "15% off-between 1 and 6 months bookings",
      },
    ]
  )

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const copyCardData = [...offersCardData]
    copyCardData.push(
      {
        img: Offerimg1,
        title: values.select,
        disc: `${values.discount}%off-between ${values.offer} and ${values.qualify} bookings`,
      }

    )
    setData(copyCardData)
    setISOpen(false)
  };

  return (
    <div className="offers-agent">
      <PopUpModal
        title="New Offer"
        open={isOpen}
        close={() => setISOpen(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Select your property" name="select" className="flex flex-col mb-8">
            <Select
              defaultValue="Select"
              // onChange={(value) => value}
              options={[
                { value: "Boston Heights", label: "Boston Heights" },
                {
                  value: "Gregory Maxwell Hall",
                  label: "Gregory Maxwell Hall",
                },
                { value: "8th Sapphire Avenue", label: "8th Sapphire Avenue" },
                {
                  value: "The Mesa at Hastings Highlands",
                  label: "The Mesa at Hastings Highlands",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Minimum stay to qualify for offer" name="offer" className="flex flex-col mb-8">
            <Select
              defaultValue="Select"
              // onChange={(value) => value}
              options={[
                { value: "1 months", label: "1 months" },
                {
                  value: "2months",
                  label: "2months",
                },
                { value: "3months", label: "3 months" },
                {
                  value: "4 months",
                  label: "4 months",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Maximum stay to qualify for offer (optional)" name="qualify" className="flex flex-col mb-8">
            <Select
              defaultValue="Select"
              // onChange={(value) => value}
              options={[
                { value: "1 months", label: "1 months" },
                {
                  value: "2months",
                  label: "2months",
                },
                { value: "3months", label: "3 months" },
                {
                  value: "4 months",
                  label: "4 months",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Monthly discount" name="discount" className="flex flex-col">
            <InputNumber
              style={{ width: "100%" }}
              defaultValue={1}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
            // onChange={(value) => value}
            />
          </Form.Item>
          <div className="flex justify-end gap-4">
            <div>
              <Button
                onClick={() => setISOpen(false)}
                className="teriary-color"
              >
                Cancel
              </Button>
            </div>
            <div>
              <Button htmlType="submit" className="green-graph-tooltip-bg white-color">
                Save & Close
              </Button>
            </div>
          </div>
        </Form>
      </PopUpModal>

      <PageHeader title="Offers" bordered={true} />

      {offersCardData.length === 0 ? (
        <div className="offers-agent-body flex justify-center items-center flex-col h-[50vh] text-center">
          <div className="font-medium text-4xl text-primary-color mb-4">
            No Offers Yet
          </div>
          <div className="font-normal text-base text-primary-color mb-8">
            Create your first offer and draw attention to your properties!
          </div>

          <div className="">
            <Button
              onClick={() => setISOpen(true)}
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
              onClick={() => setISOpen(true)}
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
            {offersCardData.map((item: any, index: any) => {
              return (
                <Col key={index} xxl={4} xl={6} lg={8} md={12} sm={24} xs={24}>
                  <Card
                    key={item.id}
                    className="offer-card"
                    cover={<img alt="img" src={item.img} height={195} />}
                  >
                    <div className="offer-card-body">
                      <div className="dashboard-primary-color font-semibold text-xl pb-4">
                        {item.title}
                      </div>
                      <div className="dashboard-primary-color font-normal text-sm pb-4">
                        {item.disc}
                      </div>

                      <div className="w-[100%] inline-grid">
                        <Button onClick={() => setISOpen(true)} className="offer-card-btn">
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
    </div>
  );
};

export default OffersAgent;
