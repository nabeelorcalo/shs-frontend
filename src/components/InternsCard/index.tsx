import { Button, Divider } from "antd";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../store";
import { BoxWrapper } from "../../components";
import constants from "../../config/constants";
import "./style.scss";

export const InternsCard = (props: any) => {
  const {
    status,
    pupover,
    posted_by,
    department,
    joining_date,
    company,
    company_rep,
    name,
    navigateToChat,
    handleProfile,
    date_of_birth
  } = props;

  const currentUser = useRecoilState(currentUserState);

  // const { STUDENTPROFILE } = ROUTES_CONSTANTS;
  // const navigate = useNavigate();

  const fullName = name;
  // Split the full name into separate parts
  const nameParts = fullName?.split(" ");
  // Extract the first and second parts
  const firstName = nameParts[0];
  const middleName = nameParts[1];
  // Concatenate the first and second parts
  const shortenedName = `${firstName} ${middleName}`;

  function handleChatNav() {
    if (navigateToChat) {
      navigateToChat();
    } else {
      console.error("Chat is not setup in this component");
    }
  }

  return (
    <div className="interns-card-main">
      <BoxWrapper className="interns-card">
        <div className={`flex flex-row ${status ? "justify-between" : "justify-end"} cursor-pointer`}>
          {status ? status : ""}
          {pupover ? pupover : null}
        </div>
        <div className="flex flex-col gap-4 items-center main-card-jsx">
          <div className="flex flex-col gap-2 items-center">
            {posted_by}
            {name ? (
              <p className="text-2xl font-medium">{shortenedName}</p>
            ) : null}
            <p className="text-sm font-normal">{department}</p>
            {company ? (
              <p className="text-sm">
                Company:
                <span className="text-sm pl-2 font-semibold">{company}</span>
              </p>
            ) : null}
          </div>
          <div className="flex flex-row max-xs:flex-col gap-3 items-center p-3 max-sm:p-2 rounded-md join-dob-card-style">
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-success-placeholder-color">Joining</p>
              <p className="text-sm">{joining_date}</p>
            </div>
            <Divider type="vertical" />

            {currentUser[0]?.role === constants.UNIVERSITY ? <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-success-placeholder-color">
                Company Rep
              </p>
              {company_rep ? <p className="text-sm">{company_rep}</p> : "N/A"}
            </div> : <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-success-placeholder-color">
                Date of birth
              </p>
              {date_of_birth === "Invalid Date" ? "N/A" : <p className="text-sm">{date_of_birth}</p>}
            </div>}

          </div>
          <div className="flex sm:flex-row flex-col gap-3 items-center">
            <Button
              className="profile-btn border-0 accommodation-btn-info-bg text-info-color-dark font-semibold"
              size="small"
              onClick={handleProfile}
            >
              Profile
            </Button>
            <Button
              className="chat-btn border-0 light-green-bg-color text-success-hover-color font-semibold"
              size="small"
              onClick={handleChatNav}
            >
              Chat
            </Button>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};
