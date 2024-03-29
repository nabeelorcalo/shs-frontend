import React, { useState, useEffect } from "react";
import type { ColumnsType } from "antd/es/table";
import { Table, Typography, Row, Col, Form, Input, Button } from "antd";
import useEarnWithUsHook from "../actionHandler";
import { useRecoilValue } from "recoil";
import {
  RegisterMemberAndFeddbackGraph,
  PopUpModal,
  Loader,
  ButtonThemePrimary,
} from "../../../components";
import {
  delegateDashboardState,
  delegateMembersState,
  earnWithUsTabsState,
} from "../../../store";
import {
  IconWalletMoney,
  IconInactiveMemberBal,
  IconTotalMember,
  IconActiveMember,
  IconInactiveMember,
  IconShare,
  FacebookCircle,
  TwitterCircle,
  WhatsAppCircle,
  IconDocumentCopy,
  Logo,
} from "../../../assets/images";
import "./style.scss";
interface DataType {
  key: React.Key;
  name: string;
  delegateAmount: string;
  member: string;
  status: string;
}

const Dashboard = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { getDelegateDashboard, getDelegateMembers, sendReferenceInvite } = useEarnWithUsHook();
  const delegateDashboard: any = useRecoilValue(delegateDashboardState);
  const delegateMembers: any = useRecoilValue(delegateMembersState);
  const tabKey = useRecoilValue(earnWithUsTabsState);
  const [formShareLink] = Form.useForm();
  const [modalShareLinkOpen, setModalShareLinkOpen] = useState(false);
  const [modalInvitaionOpen, setModalInvitaionOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(false);
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState("");
  const delegateLink =
    window?.location?.origin +
      "/login?signup=true&referenceNo=" +
      delegateDashboard?.userRes?.delegateRef ?? "";
  

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (tabKey === "earnWithUsDashboard") {
      getDelegateDashboard(setLoading);
      getDelegateMembers({}, setLoadingMembers);
    }
  }, [tabKey]);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function openModalShareLink() {
    setModalShareLinkOpen(true);
  }

  function closeModalShareLink() {
    formShareLink.resetFields();
    setIsCopy(false);
    setModalShareLinkOpen(false);
  }

  function openModalInvitaion(email: any) {
    setModalInvitaionOpen(true);
    setInvitedEmail(email);
  }

  function closeModalInvitaion() {
    setModalInvitaionOpen(false);
    setInvitedEmail("");
  }

  async function submitShareLink(values: any) {
    setLoadingInvite(true);
    try {
      const response = await sendReferenceInvite(values);
      if (!response.error) {
        openModalInvitaion(values.email);
      }
    } catch (error: any) {
      return;
    } finally {
      setLoadingInvite(false);
      closeModalShareLink();
    }
  }

  const handleCopyClick = () => {
    const inputValue = formShareLink.getFieldValue("referenceLink");
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        setIsCopy(true);
        setTimeout(() => {
          setIsCopy(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Failed to copy value:", error);
      });
  };

  function shareOnSocialMedia(platform: any) {
    const linkToShare = encodeURIComponent(delegateLink);
    var socialMediaURL;
    if (platform === "whatsapp") {
      socialMediaURL = "https://api.whatsapp.com/send?text=" + linkToShare;
    } else if (platform === "facebook") {
      socialMediaURL =
        "https://www.facebook.com/sharer/sharer.php?u=" + linkToShare;
    } else if (platform === "twitter") {
      socialMediaURL = "https://twitter.com/intent/tweet?text=" + linkToShare;
    } else {
      alert("Unsupported platform: " + platform);
      return;
    }
    window.open(socialMediaURL, "_blank");
  }

  const tableColumns: ColumnsType<DataType> = [
    {
      title: "No",
      dataIndex: "no.",
      align: "center",
      render: (_, row, index) => {
        return (
          <>
            {index < 9 ? `0${index + 1}` : index + 1}
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (_, row: any) => (
        <>
          {row?.referredToUser?.firstName} {row?.referredToUser?.lastName}
        </>
      ),
    },
    {
      title: "Delegate Amount",
      dataIndex: "rewardAmount",
      render: (_, row: any) => <>£ {row?.rewardAmount}</>,
    },
    {
      title: "Member",
      dataIndex: "member",
      render: (_, row: any) => <>{row?.referredToUser?.role.toLowerCase()}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (_, row: any) => {
        return (
          <div
            className={`shs-status-badge ${
              row?.referredToUser?.status === "ACTIVE" ? "success" : "error"
            }`}
          >
            {row?.referredToUser?.status === "ACTIVE" ? "Active" : "Inactive"}
          </div>
        );
      },
    },
  ];

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="earn-with-us-dashboard">
        <div className="earnwith-topcards">
          <Row gutter={30}>
            <Col xs={24} xl={12}>
              <div className="top-card">
                <Row gutter={[20, 20]}>
                  <Col xs={24} md={12}>
                    <div className="top-card-inner">
                      <div className="top-card-icon balance">
                        <IconWalletMoney />
                      </div>
                      <div className="top-card-body">
                        <div className="top-card-title">Current Balance</div>
                        <div className="top-card-value">
                          £{delegateDashboard?.currentBalance}
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="top-card-inner with-divider">
                      <div className="top-card-icon inactive">
                        <IconInactiveMemberBal />
                      </div>
                      <div className="top-card-body">
                        <div className="top-card-title">
                          Inactive Members Balance
                        </div>
                        <div className="top-card-value">
                          £{delegateDashboard?.inactiveMemberBalance}
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
                {loading && <Loader />}
              </div>
            </Col>
            <Col xs={24} xl={12}>
              <div className="card-share-wrapper">
                <div className="card-share" onClick={openModalShareLink}>
                  <div>
                    Share <IconShare />
                  </div>
                </div>
                <div className="top-card card-user-welcome">
                  <Row gutter={15}>
                    <Col xs={24} lg={12}>
                      <div className="top-card-inner">
                        <div className="user-welcome-text">
                          Welcome Back,{" "}
                          <span>{delegateDashboard?.userRes?.firstName}</span>
                        </div>
                      </div>
                    </Col>
                    <Col xs={24} lg={12}>
                      <div className="top-card-inner ref-number">
                        <div className="user-reference-no">
                          Reference Number:{" "}
                          <span>{delegateDashboard?.userRes?.delegateRef}</span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {loading && <Loader />}
              </div>
            </Col>
          </Row>
        </div>

        <div className="members-cards">
          <Row gutter={30}>
            <Col xs={24} lg={8}>
              <div className="member-card">
                <div className="member-card-icon">
                  <IconTotalMember />
                </div>
                <div className="member-card-body">
                  <div className="member-card-title">Total Members</div>
                  <div className="member-card-value">
                    {delegateDashboard?.totalMembers}
                  </div>
                </div>
                {loading && <Loader />}
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div className="member-card">
                <div className="member-card-icon">
                  <IconActiveMember />
                </div>
                <div className="member-card-body">
                  <div className="member-card-title">Active Members</div>
                  <div className="member-card-value">
                    {delegateDashboard?.activeMembers}
                  </div>
                </div>
                {loading && <Loader />}
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div className="member-card">
                <div className="member-card-icon">
                  <IconInactiveMember />
                </div>
                <div className="member-card-body">
                  <div className="member-card-title">Inactive Members</div>
                  <div className="member-card-value">
                    {delegateDashboard?.inactiveMembers}
                  </div>
                </div>
                {loading && <Loader />}
              </div>
            </Col>
          </Row>
        </div>

        <div className="earnwith-bottom-content">
          <Row gutter={[30, 30]}>
            <Col xs={24} lg={12}>
              <div className="registered-members">
                {delegateDashboard.length !== 0 && (
                  <RegisterMemberAndFeddbackGraph
                    graphName="registerMember"
                    title="Registered Members"
                    graphData={delegateDashboard?.graphData}
                  />
                )}
                {loading && <Loader />}
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="shs-table-card table-members-detail">
                <Typography.Title level={4}>Members Details</Typography.Title>
                <div className="shs-table">
                  <Table
                    scroll={{ x: "max-content" }}
                    columns={tableColumns}
                    dataSource={delegateMembers}
                    pagination={false}
                  />
                </div>
                {loadingMembers && <Loader />}
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* STARTS: MODAL SHARE LINK
       *************************************************************************/}
      <PopUpModal
        open={modalShareLinkOpen}
        close={closeModalShareLink}
        footer={null}
        width={560}
        wrapClassName="modal-share-link"
      >
        <div className="modal-share-link-title">Share Link</div>
        <Form
          form={formShareLink}
          requiredMark={false}
          layout="vertical"
          initialValues={{ referenceLink: delegateLink }}
          name="updateListing"
          onFinish={submitShareLink}
        >
          <div className="reference-link-item">
            <Form.Item name="referenceLink" label="Delegate Link">
              <Input
                disabled
                placeholder="Placeholder"
                suffix={
                  <IconDocumentCopy
                    style={{ cursor: "pointer" }}
                    onClick={handleCopyClick}
                  />
                }
              />
            </Form.Item>
            {isCopy && <div className="text-link-copied">Link Copied</div>}
          </div>
          <div className="invite-email">
            <div className="invite-email-field">
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Placeholder" />
              </Form.Item>
            </div>
            <div className="invite-email-submit">
              <Form.Item>
                <ButtonThemePrimary
                  loading={loadingInvite}
                  htmlType="submit"
                  block
                >
                  Invite
                </ButtonThemePrimary>
              </Form.Item>
            </div>
          </div>
        </Form>
        <div className="share-links-cont">
          <div className="share-link-label">Share this link via:</div>
          <div className="share-links">
            <div
              className="share-link-item"
              onClick={() => shareOnSocialMedia("facebook")}
            >
              <FacebookCircle />
            </div>
            <div
              className="share-link-item"
              onClick={() => shareOnSocialMedia("twitter")}
            >
              <TwitterCircle />
            </div>
            <div
              className="share-link-item"
              onClick={() => shareOnSocialMedia("whatsapp")}
            >
              <WhatsAppCircle />
            </div>
          </div>
        </div>
      </PopUpModal>
      {/* ENDS: MODAL SHARE LINK
       *************************************************************************/}

      {/* STARTS: MODAL INVITATION SENT
       *************************************************************************/}
      <PopUpModal
        open={modalInvitaionOpen}
        close={closeModalInvitaion}
        footer={null}
        width={560}
        wrapClassName="modal-invitation"
      >
        <div className="invitation-content">
          <div className="invitation-content-header">
            <Logo />
          </div>
          <div className="invitation-body">
            <div className="invitaion-title">Invitation Sent!</div>
            <div className="invitation-text-light">
              We have sent an invitation to “{invitedEmail}” to join Student
              Help Squad.
            </div>
            <div className="invitation-text-dark">
              If an email is not received, contact our support team.
            </div>
          </div>
        </div>
      </PopUpModal>
      {/* ENDS: MODAL INVITATION SENT
       *************************************************************************/}
    </>
  );
};

export default Dashboard;
