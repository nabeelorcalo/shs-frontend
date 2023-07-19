import { Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import { CountingCard, FavouritesViewCard, GreetingCard, RegisterMemberAndFeddbackGraph } from "../../../components";
import MembersDetails from "./MembersDetails";
import ShareModal from "../../../components/ShareModal";
import InvitationModal from "../../../components/InvitationModal";
import { gutter } from "..";
import "../style.scss";
import useCustomHook from "./actionHandler";

const DelegateAgent = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowInvitationModal, setIsShowInvitationModal] = useState<boolean>(false);
  const [invitationalEmail, setInvitationalEmail] = useState<string>("");
  const {
    delegateDashboardData: {
      activeMembers,
      inactiveMemberBalance,
      inactiveMembers,
      currentBalance,
      graphData,
      totalMembers,
      userRes,
    },
    delegateMembers,
    sendInvite,
    fetchDelegateDashboardData,
  }: any = useCustomHook();

  const [state, setState] = useState({
    loading: false,
  });
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      fetchDelegateDashboardData();
    }
  }, []);

  return (
    <>
      <Row gutter={gutter}>
        <Col xs={24} xxl={12}>
          <FavouritesViewCard
            currentBalance={currentBalance.toString()}
            inactiveMembersBalance={JSON.stringify(inactiveMemberBalance ?? 0)}
          />
        </Col>
        <Col xs={24} xxl={12}>
          <GreetingCard
            name={(userRes?.firstName || "") + " " + (userRes?.lastName || "")}
            referenceNumber={userRes?.delegateRef ?? " "}
            handleShareModal={() => setIsShowModal(!isShowModal)}
          />
        </Col>
        <Col xs={24}>
          <CountingCard
            totalMembers={totalMembers.toString()}
            activeMembers={activeMembers.toString()}
            inActiveMembers={inactiveMembers.toString()}
            isSeprate={true}
          />
        </Col>

        <Col xs={24} xl={12}>
          <div className="bg-white p-5 mb-5 rounded-2xl wrapper-shadow">
            <RegisterMemberAndFeddbackGraph
              styling={{ height: 468 }}
              graphName="registerMember"
              title="Registered Members"
              graphData={graphData}
            />
          </div>
        </Col>
        <Col xs={24} xl={12}>
          <MembersDetails membersDetails={delegateMembers} />
        </Col>
      </Row>
      <ShareModal
        isShowModal={isShowModal}
        close={() => setIsShowModal(false)}
        handleInvitation={(delegateRef: string, email: string) => {
          sendInvite(delegateRef, email).then(() => {
            setInvitationalEmail(email);
            setIsShowInvitationModal(true);
          });
        }}
        delegateLink={window?.location?.origin + "/signup?referenceNo=" + userRes?.delegateRef ?? ""}
      />
      <InvitationModal
        isShowModal={isShowInvitationModal}
        close={() => setIsShowInvitationModal(false)}
        email={invitationalEmail}
      />
    </>
  );
};

export default DelegateAgent;
