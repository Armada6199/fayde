import React from "react";
import "../../styles/recording.css";
import AudioRecorder from "../components/utils/VoiceRecorder";
import VideoRecorder from "../components/utils/VideoRecored";
import SpeechSignModel from "./utils/SpeechSignModel";
function FeaturesHOC({ feature, handleClose }) {
  switch (feature) {
    case "speechToText":
      return <AudioRecorder handleClose={handleClose} />;
    case "signToText":
      return <VideoRecorder />;
    case "textToSign":
      return <SpeechSignModel />;
  }
}

export default FeaturesHOC;
