import { Divider, Button } from "antd";

const personalInfoData = [
  {
    id: "1",
    title: "Name",
    disc: "Firs Cottage, Adams Road, Kirk Langley, DE6 4LW",
  },
  {
    id: "2",
    title: "Phone",
    disc: "070 4531 9507",
  },
  {
    id: "3",
    title: "Address",
    disc: "Firs Cottage, Adams Road, Kirk Langley, DE6 4LW",
  },
  {
    id: "4",
    title: "Email",
    disc: "tranthuy.nute@gmail.com",
  },
  {
    id: "5",
    title: "Occupation",
    disc: "Accountant",
  },
  {
    id: "6",
    title: "Booking Dates",
    disc: "22/09/2022 - 22/09/2022",
  },
];

const PersonalInfo = (props: any) => {
  const { open, setOpen } = props
  return (
    <div>
      <div className="font-semibold text-[28px] text-primary-color pb-2">
        Personal Information
      </div>

      {personalInfoData.map((item) => {
        return (
          <div className="pb-4" key={item.id}>
            <div className="text-primary-color text-base font-medium">
              {item.title}
            </div>

            <div className="text-primary-color text-base font-normal">
              {item.disc}
            </div>
          </div>
        );
      })}
      <Divider />

      <div>
        <div className="font-semibold text-xl pb-2">Message Details</div>
        <div className="text-base font-normal text-teriary-color pb-2">Message</div>
        <div className="text-input-bg-color rounded-[8px] p-4">
          Hi all, I wonder if anyone knows (and can advice how to prevent) why
          paragraphs in XD expand as a single line text box in Figma, when
          copying as SVG? Thanks!
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <div>
          <Button
            onClick={() => setOpen(false)}
            className="white-color page-header-secondary-bg-color"
          >
            Reject
          </Button>
        </div>

        <div>
          <Button htmlType="submit" className="green-graph-tooltip-bg white-color ">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;