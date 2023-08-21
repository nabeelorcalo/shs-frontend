import React, { useEffect, useRef, useState } from "react";
import { Typography, Button } from "antd";
import { PageHeader, PopUpModal } from "../../../components";
import { BlowWistle } from "../../../assets/images";
// import BlowWhistleForm from "./blowWhistleForm";
import BlowWhistleForm from "../Common/blowWhistleForm";
import "./style.scss";
import useCustomHook from "../Manager/actionHandler";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";

const { Text } = Typography;
const index = () => {
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const createGrievanceRef = useRef<any>(null);
  const navigateTo = useNavigate();
  const { getManagerList, managersList, createGrievance, navigateGrievanceList } = useCustomHook();
  useEffect(() => {
    navigateGrievanceList();
    getManagerList({});
  }, []);
  return (
    <div className="intern-grievance">
      <div>
        <PageHeader title="Grievances" actions bordered />
      </div>
      <div className="flex items-center h-[75vh]">
        <div className="mx-auto">
          <div className="flex flex-col">
            <Text className="text-2xl title text-center"> Solve Your workplace problems by blowing a whistle. </Text>
            <div className="flex justify-center items-center my-4">
              <Button
                size="middle"
                onClick={() => {
                  setShowBlowWhistleModal(!showBlowWhistleModal);
                }}
                className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
              >
                <BlowWistle /> Blow a Whistle
              </Button>
            </div>
          </div>
        </div>
      </div>
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => {
          if (createGrievanceRef.current) createGrievanceRef.current.handleCancel();
          setShowBlowWhistleModal(false);
        }}
        footer=""
      >
        <BlowWhistleForm
          ref={createGrievanceRef}
          setState={setShowBlowWhistleModal}
          managers={managersList}
          createGrievance={createGrievance}
          navigate={true}
        />
      </PopUpModal>
    </div>
  );
};

export default index;
