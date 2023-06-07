import { PopUpModal } from "../../../components";
import { Button, Select, InputNumber, Form } from "antd";
import useCustomHook from "../actionHandler";
import { useRecoilValue } from "recoil";
import { listingsState } from "../../../store";
import useListingsHook from "../../listings/actionHandler";
import { useEffect } from "react";
import { isNull } from "lodash";

const NewOfferModal = (props: any) => {
  const { state, setState } = props;
  const [form] = Form.useForm();
  const allProperties = useRecoilValue(listingsState);
  const { postOffersDetails, editOffersDetails } = useCustomHook();
  const { getListings } = useListingsHook();

  useEffect(() => {
    getListings(isNull)
  }, [])

  const onFinish = (values: any) => {
    if (state?.data?.id) {
      values.offerId = state?.data?.id
      editOffersDetails(values)
      setState({ isToggle: false, data: {} })
    }
    else {
      postOffersDetails(values)
      form.resetFields();
      setState({ isToggle: false, data: {} })
    }
  };
  console.log(state);

  const initialValues = {
    propertyId: state?.data?.id ? state?.data?.property?.addressOne : undefined,
    minStayMonths: state?.data?.minStayMonths ? state?.data?.minStayMonths : undefined,
    maxStayMonths: state?.data?.maxStayMonths ? state?.data?.maxStayMonths : undefined,
    discount: state?.data?.monthlyDiscount ? state?.data?.monthlyDiscount : undefined
  }

  return (
    <PopUpModal
      title="New Offer"
      open={state.isToggle}
      close={() => {
        form.resetFields();
        setState({ isToggle: false, data: {} });
      }}
      footer={false}
    >
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={initialValues}>
        <Form.Item label="Select your property" name="propertyId" className="flex flex-col mb-8">
          <Select
            placeholder="Select"
            // onChange={(value) => value}
            options={allProperties?.map((item: any) => ({
              label: item.addressOne,
              value: item.id
            }))}
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
              onClick={() => {
                form.resetFields();
                setState({ isToggle: false, data: {} });
              }}
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
  )
}

export default NewOfferModal
