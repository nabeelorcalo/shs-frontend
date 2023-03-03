import React from "react";
import ReactVideoRecorder from "react-video-recorder";

const VideoRecorderLocal = () => {
  return (
    <ReactVideoRecorder
      onRecordingComplete={(videoBlob:any) => {
        // Do something with the video...
        console.log("videoBlob", videoBlob);
      }}
    />
  );
};

export default VideoRecorderLocal;
