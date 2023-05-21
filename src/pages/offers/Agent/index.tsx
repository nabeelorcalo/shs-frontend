import { useEffect, useState } from "react";
import { PageHeader, PopUpModal } from "../../../components";
import { Button, Row, Col, Card, Select, InputNumber, Form } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { OfferProperty } from "../../../assets/images";
import useCustomHook from "../actionHandler";
import "./style.scss";

const OffersAgent = () => {
  const [form] = Form.useForm();
  const [isOpen, setISOpen] = useState<any>(false);
  const [offers, setOffers] = useState<any>({})
  const { getOffersDetails, offersData, postOffersDetails, editOffersDetails } = useCustomHook();

  useEffect(() => {
    getOffersDetails()
  }, [])

  const onFinish = (values: any) => {
    if (offers) {
      values.offerId = offers.id
      editOffersDetails(values)
      setOffers({})
    }
    else {
    }
    postOffersDetails(values)
    setOffers(values)
    setISOpen(false)
  };

  const editHanlder = (value: any) => {
    setISOpen(true),
      setOffers(value)
  }
  console.log(offers);

  const initialValues = {
    select: offers?.id ?? null,
    minStayMonths: offers?.minStayMonths ?? null,
    maxStayMonths: offers?.maxStayMonths ?? null,
    discount: offers?.monthlyDiscount ?? null
  }

  return (
    <div className="offers-agent">
      <PopUpModal
        title="New Offer"
        open={isOpen}
        close={() => { setISOpen(false), setOffers({}) }}
        footer={false}
      >
        <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
          <Form.Item label="Select your property" name="select" className="flex flex-col mb-8">
            <Select
              placeholder="Select"
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

          <Form.Item label="Minimum stay to qualify for offer" name="minStayMonths" className="flex flex-col mb-8">
            <Select
              placeholder="Select"
              // onChange={(value) => value}
              options={[
                { value: "1", label: "1 months" },
                {
                  value: "2",
                  label: "2months",
                },
                { value: "3", label: "3 months" },
                {
                  value: "4",
                  label: "4 months",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Maximum stay to qualify for offer (optional)" name="maxStayMonths" className="flex flex-col mb-8">
            <Select
              placeholder="Select"
              options={[
                { value: "1", label: "1 months" },
                {
                  value: "2",
                  label: "2months",
                },
                { value: "3", label: "3 months" },
                {
                  value: "4",
                  label: "4 months",
                },
              ]}
            />
          </Form.Item>

          <Form.Item label="Monthly discount" name="discount" className="flex flex-col">
            <InputNumber
              style={{ width: "100%" }}
              // defaultValue={1}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
            // onChange={(value) => value}
            />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <div>
              <Button
                onClick={() => { setISOpen(false), setOffers({}) }}
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
            {offersData?.map((item: any, index: any) => {
              return (
                <Col key={index} xxl={4} xl={6} lg={8} md={12} sm={24} xs={24}>
                  <Card
                    key={item.id}
                    className="offer-card"
                    cover={<img src={OfferProperty} alt="img" />}
                  >
                    <div className="offer-card-body">
                      <div className="dashboard-primary-color font-semibold text-xl pb-4">
                        {item.propertyId}
                      </div>

                      <div className="dashboard-primary-color font-normal text-sm pb-4">
                        {item.monthlyDiscount}% off-between {item.minStayMonths} and {item.maxStayMonths} months bookings
                      </div>

                      <div className="w-[100%] inline-grid">
                        <Button
                          onClick={() => editHanlder(item)}
                          className="offer-card-btn">
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