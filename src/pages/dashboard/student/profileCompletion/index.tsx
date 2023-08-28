import React, { useEffect, useState } from "react";
import { Typography, Progress, Steps, Button } from "antd";
import "../style.scss";
import { VerifyIcon } from "../../../../assets/images";
import { InfoCircleFilled } from "@ant-design/icons";
import useCustomHook from "../../actionHandler";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentProfileCompletionState } from "../../../../store";

const ProfileCompletion = (props: any) => {
  const action = useCustomHook();
  const [profileCompletion, setProfileCompletion] = useRecoilState<any>(
    studentProfileCompletionState
  );
  const [completionPercent, setCompletionPercent] = useState<any>(0);
  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    setCurrent(value);
  };

  // for api
  useEffect(() => {
    action.getStudentProfile();
  }, []);

  // for percentage total steps
  useEffect(() => {
    const completedSteps = profileCompletion && Object.values(profileCompletion).filter(
      (status) => status === "COMPLETED"
    );
    const percent = (completedSteps?.length / 7) * 100;
    setCompletionPercent(percent.toFixed(0));
  }, [profileCompletion]);

  return (
    <div className="profile-completion">
      {/* <Button
        onClick={() => {
          setProfileCompletion((oldVal: any) => {
            return { ...oldVal, addressDetails: "COMPLETED" };
          });
        }}
      >
        Test
      </Button>
      {JSON.stringify(profileCompletion)} */}
      <div className="card-style">
        <Typography className="main-title ">Profile Completion</Typography>
        <Typography className="percent">{completionPercent}%</Typography>
        <Typography className="main-title pt-4">
          of your profile is complete
        </Typography>
        <div className="pt-2 pb-2">
          <Progress
            percent={completionPercent}
            showInfo={false}
            strokeColor="#E94E5D"
            trailColor="#E6F4F9"
            strokeLinecap="round"
          />
        </div>
        <div className="steps-complet">
          <Typography className="step-desc">
            Complete your profile to apply for jobs!
          </Typography>
          <Typography className="step-detail">
            Job search made easy with us!
          </Typography>
          <Typography className="step-detail">
            Go through these simple steps of
            profile completion on our platform and apply for jobs with one
            click.
          </Typography>
        </div>
        <div>
          <Steps
            direction="vertical"
            current={current}
            onChange={onChange}
            items={[
              {
                title: (
                  <span className="step-color">Identity Verification</span>
                ),
                status:
                  profileCompletion?.identityVerification === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.identityVerification === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
              {
                title: <span className="step-color">DBS Verification</span>,
                status:
                  profileCompletion?.dbsVerification === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.dbsVerification === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
              {
                title: <span className="step-color">University Details</span>,
                status:
                  profileCompletion?.universityDetails === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.universityDetails === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
              {
                title: <span className="step-color">Identity Documents</span>,
                status:
                  profileCompletion?.identityDocuments === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.identityDocuments === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
              {
                title: <span className="step-color">Address Details</span>,
                status:
                  profileCompletion?.addressDetails === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.addressDetails === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
              {
                title: <span className="step-color">Profile Picture</span>,
                status:
                  profileCompletion?.profilePicture === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.profilePicture === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
              {
                title: <span className="step-color">Introduction Video</span>,
                status:
                  profileCompletion?.introductionVideo === "COMPLETED"
                    ? "finish"
                    : "wait",
                icon:
                  profileCompletion?.introductionVideo === "COMPLETED" ? (
                    <VerifyIcon />
                  ) : (
                    <InfoCircleFilled className="text-[#FFC15D] text-xl" />
                  ),
              },
            ]}
          />
        </div>
        <div>
          {completionPercent == 100 ? (
            <Typography className="font-semibold text-base text-center page-header-secondary-color white-color btn-veri py-2">
              Completed!
            </Typography>
          ) : (
            <Button
              block
              className="btn-veri"
              onClick={() => {
                props.setHide(false);
              }}
            >
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
