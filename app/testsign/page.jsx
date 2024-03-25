"use client";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import Whammy from "whammy";
import arabicLetterImages from "@/public/sign";
import { useEffect, useState } from "react";
import "../../styles/recording.css";

import VideoRecorder from "../components/utils/VideoRecored";

function customResponseHandler(event) {
  const { message, element, fullMessage } = event.data;
  console.log(message);
}

const webChatOptions = {
  integrationID: process.env.NEXT_PUBLIC_INTEGRATION_ID,
  region: process.env.NEXT_PUBLIC_REGION,
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID,
};

function page() {
  const [instance, setInstance] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [clientText, setClientText] = useState("");
  const handleOpen = () => setIsRecorderOpen(true);
  const handleClose = () => setIsRecorderOpen(false);
  const [base64Video, setBase64Video] = useState("");
  const [word, setWord] = useState(null);
  const [videoSpeech, setVideoSpeech] = useState(null);
  const convertToBase64Video = async (images) => {
    const base64Images = [];
    let count = 0;
    console.log(images);
    const convertNextImage = async () => {
      if (count < images.length) {
        const response = await fetch(images[count]);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          base64Images.push(reader.result);
          count++;
          convertNextImage();
        };
        reader.readAsDataURL(blob);
      } else {
        return convertToVideo(base64Images, 1, setBase64Video);
      }
    };

    convertNextImage();
  };

  const convertToVideo = (images, frameRate, callback) => {
    const encoder = new Whammy.Video(frameRate);
    let count = 0;

    const addFrame = (canvas) => {
      encoder.add(canvas.toDataURL("image/webp"));
      count++;
      if (count === images.length) {
        const blob = encoder.compile();
        const reader = new FileReader();
        reader.onload = () => {
          callback(reader.result);
        };
        reader.readAsDataURL(blob);
      }
    };

    images.forEach((base64) => {
      base64ToCanvas(base64, addFrame);
    });
  };

  const base64ToCanvas = (base64, callback) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      callback(canvas);
    };
    img.src = base64;
  };
  async function preReceiveHandler(event, chatbotResponse) {
    const images = [];
    console.log(chatbotResponse);

    const message = event.data;
    instance?.on({
      type: "customResponse",
      handler: customResponseHandler,
    });
    chatbotResponse
      .split("")
      .map((letter) =>
        arabicLetterImages[letter]
          ? images.push(arabicLetterImages[letter])
          : null
      );
    const base = await convertToBase64Video(images);
    console.log(base);
    if (message.output.generic) {
      message.output.generic[message.output.generic.length] = {
        response_type: "video",
        source: `data:video/webm;base64,`,
      };
    }
  }

  useEffect(() => {
    if (videoSpeech) {
      instance.send(videoSpeech);
      instance.send(clientText.data);
      instance?.on({
        type: "pre:receive",
        handler: async (e) =>
          preReceiveHandler(
            e,
            `${e.data.output.generic[0]?.text} ${e.data.output.generic[1]?.text} ${e.data.output.generic[2]?.text}`
          ),
      });
    }
  }, [videoSpeech]);

  return (
    <Grid container>
      <Box
        position={"absolute"}
        bottom={30}
        right={40}
        sx={{ cursor: "pointer" }}
        onClick={handleOpen}
        zIndex={999999}
      >
        <VideocamIcon
          className={recordingStatus === "inactive" ? "" : "pulse_recording"}
          sx={{ width: 32, height: 32 }}
        />
      </Box>
      <Modal
        open={isRecorderOpen}
        sx={{
          display: "flex",
          outline: "none",
          border: "none",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClose={handleClose}
      >
        <Grid container item xs={8}>
          <VideoRecorder setVideoSpeech={setVideoSpeech} />
        </Grid>
      </Modal>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />
    </Grid>
  );
}

export default page;
