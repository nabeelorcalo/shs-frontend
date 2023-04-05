import React from "react";

import { Divider, Typography } from "antd";
import { Button } from "../../../../components";

const { Title, Paragraph, Text, Link } = Typography;

function AddVideo() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
        borderRadius: "16px",
        padding: "2rem",
        height: "80vh",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <Title>Video</Title>
      <Title level={5}>Create your video interview to get hired</Title>
      <Title level={4}>
        Create an introductory video by answering the following <br /> questions
        in 30 to 60 seconds
      </Title>
      <div className="ml-12 mt-6">
        <ul>
          <li>
            <Typography>Tell us about yourself</Typography>
          </li>

          <li>
            <Typography>Why have you applied for this internship?</Typography>
          </li>

          <li>
            <Typography>Why do you want to work in this industry?</Typography>
          </li>
        </ul>
        <Button
          //   className='btn-secondary'
          label="Add Video"
          type="primary"
          size="large"
          color="red"
          loading={false}
          shape="default" // | 'circle' | 'round'
          onClick={() => {}}
          disabled={false}
          style={{ marginTop: "2rem" }}
        />
      </div>
    </div>
  );
}

export default AddVideo;
