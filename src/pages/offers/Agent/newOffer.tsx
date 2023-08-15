import { Alert, PopUpModal } from "../../../components";
import { Button, Select, InputNumber, Form } from "antd";
import useCustomHook from "../actionHandler";
import { useRecoilValue } from "recoil";
import { listingsState } from "../../../store";
import useListingsHook from "../../listings/actionHandler";
import { useEffect, useState } from "react";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";

const NewOfferModal = (props: any) => {
  const { state, setState } = props;
  const [loading, setLoading] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [form] = Form.useForm();
  const allProperties = useRecoilValue(listingsState);
  const { postOffersDetails, editOffersDetails,deleteOffersDetails } = useCustomHook();
  const { getListings } = useListingsHook();
  const { action } = state;
  useEffect(() => {
    getListings({}, setLoading)
  }, [])

  const onFinish = (values: any) => {
    if (state?.data?.id) {
      values.offerId = state?.data?.id
      editOffersDetails(values)
      setState({ isToggle: false, data: {} })
    }
    else {
      postOffersDetails(values)
      setState({ isToggle: false, data: {} })
      form.resetFields();
    }
  };

  const initialValues = {
    propertyId: state?.data?.id ? state?.data?.property?.addressOne : undefined,
    minStayMonths: state?.data?.minStayMonths ?? undefined,
    maxStayMonths: state?.data?.maxStayMonths ?? undefined,
    discount: state?.data?.monthlyDiscount ?? undefined
  }

  return (
    <>
      <PopUpModal
        title={`${action === 'edit' ? 'Edit' : 'New'} Offer`}
        open={state.isToggle}
        close={() => {
          form.resetFields();
          setState({ isToggle: false, data: {} });
        }}
        footer={false}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValues}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        >
          <Form.Item
            label="Select your property"
            name="propertyId"
            className="flex flex-col mb-8"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select"
              disabled={action === 'edit' ? true : false}
              options={allProperties?.map((item: any) => ({
                label: item.addressOne,
                value: item.id
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Minimum stay to qualify for offer"
            name="minStayMonths"
            className="flex flex-col mb-8"
            rules={[{ required: true }]}
          >
            <Select
              placeholder="Select"
              options={[
                { value: 1, label: "1 months" },
                {
                  value: 2, label: "2 months",
                },
                { value: 3, label: "3 months" },
                {
                  value: 4, label: "4 months",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Maximum stay to qualify for offer (optional)"
            name="maxStayMonths"
            className="flex flex-col mb-8"
          >
            <Select
              placeholder="Select"
              options={[
                { value: 1, label: "1 months" },
                {
                  value: 2, label: "2 months",
                },
                { value: 3, label: "3 months" },
                {
                  value: 4, label: "4 months",
                },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Monthly discount"
            name="discount"
            className="flex flex-col"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1}
              max={100}
              placeholder="Discount"
              formatter={(value) => value && value > 0 ? `${value}%` : value}
              parser={(value: any) => value!.replace("%", "")}
            />
          </Form.Item>

          <div className="flex justify-end gap-4">
            <div>
              {action === 'edit' ?
                <Button className="teriary-color" onClick={() => setDeleteModal(true)}>
                  Delete Offer
                </Button>
                :
                <Button
                  onClick={() => {
                    form.resetFields();
                    setState({ isToggle: false, data: {} });
                  }}
                  className="teriary-color"
                >
                  Cancel
                </Button>}
            </div>

            <div>
              <Button htmlType="submit" className="green-graph-tooltip-bg white-color">
                Save & Close
              </Button>
            </div>
          </div>
        </Form>
      </PopUpModal >
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={deleteModal}
        setState={setDeleteModal}
        type="error"
        width={570}
        children={<p>Deleting this offer will remove it from your listings and will no longer display on the website. If you would like to repeat the offer in the future, you will need to create a new one.</p>}
        okBtnFunc={() => deleteOffersDetails(state?.data?.id)}
      />
    </>
  )
}

export default NewOfferModal
