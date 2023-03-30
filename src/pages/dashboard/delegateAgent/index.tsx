import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import {
  CountingCard,
  FavouritesViewCard,
  GreetingCard,
  RegisterMemberAndFeddbackGraph,
} from "../../../components";
// import Graph from "../../../components/Graph/graphForRegisteredMembersAndFeedback";
import MembersDetails from "./MembersDetails";
import "../style.scss";
import ShareModal from "../../../components/ShareModal";
import InvitationModal from "../../../components/InvitationModal";
import { gutter } from "..";

const DelegateAgent = () => {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowInvitationModal, setIsShowInvitationModal] = useState<boolean>(false);

  const [state, setState] = useState({
    loading: false,
  });

  const loadMoreData = () => {
    setState((prevState) => {
      return {
        ...prevState,
        loading: !state.loading,
      };
    });

    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setState((prevState) => {
          return {
            ...prevState,
            loading: !state.loading,
          };
        });
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <Row gutter={gutter}>
        <Col xs={24} xxl={12}>
          <FavouritesViewCard currentBalance={33} inactiveMembersBalance={6} />
        </Col>
        <Col xs={24} xxl={12}>
          <GreetingCard
            name={"Stephen"}
            referenceNumber={"DF41331056"}
            handleShareModal={() => setIsShowModal(!isShowModal)}
          />
        </Col>
        <Col xs={24}>
          <CountingCard
            totalMembers={33}
            activeMembers={6}
            inActiveMembers={9}
            isSeprate={true}
          />
        </Col>

        <Col xs={24} xl={12}>
          <div className="bg-white p-5 mb-5 rounded-2xl wrapper-shadow">
            <RegisterMemberAndFeddbackGraph
              styling={{ height: 493 }}
              graphName="registerMember"
            />
          </div>
        </Col>
        <Col xs={24} xl={12}>
          <MembersDetails />
        </Col>
      </Row>
      <ShareModal
        isShowModal={isShowModal}
        close={() => setIsShowModal(false)}
        handleInvitation={()=>setIsShowInvitationModal(true)}
      />
      <InvitationModal
        isShowModal={isShowInvitationModal}
        close={() => setIsShowInvitationModal(false)}
      />
    </>
  );
};

export default DelegateAgent;
