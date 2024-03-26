"use client";
import arabicLetterImages from "@/public/sign";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import VideocamIcon from "@mui/icons-material/Videocam";
import { Grid, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import "../../styles/recording.css";
import VideoRecorder from "../components/utils/VideoRecored";
import axios from "axios";

function customResponseHandler(event) {
  const { message, element, fullMessage } = event.data;
  console.log(message);
}
export function handleGetResponseImages(chatbotResponse, setImages) {
  let images = [];
  chatbotResponse
    .split("")
    .map((letter) =>
      arabicLetterImages[letter]
        ? images.push(arabicLetterImages[letter])
        : null
    );
  images = images.filter((img) => (img.src ? true : false));
  setImages(images);
  return images;
}
const webChatOptions = {
  integrationID: process.env.NEXT_PUBLIC_INTEGRATION_ID,
  region: process.env.NEXT_PUBLIC_REGION,
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID,
};
export function handleExtractChatbotText(event) {
  let options = "";
  const text = event.data.output.generic
    .map((e) => {
      if (e.options) {
        e.options.map((option) => (options += `${option.label} or `));
      } else {
        return e.text;
      }
    })
    .join("");

  return `${text} ${options}`;
}
const headers = {
  "Content-Type": "application/json",
};
function page() {
  const [instance, setInstance] = useState(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const handleOpen = () => setIsRecorderOpen(true);
  const handleClose = () => setIsRecorderOpen(false);
  const [base64Video, setBase64Video] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState(null);

  async function preReceiveHandler(event) {
    const message = event.data;
    instance?.on({
      type: "customResponse",
      handler: customResponseHandler,
    });
    const text = handleExtractChatbotText(event);
    const video = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/imagesToVideo?lang=ar`,
        text,
        { headers: headers, responseType: "blob" }
      )
      .then((response) => {
        const sourceData = URL.createObjectURL(response.data);
        setBase64Video(sourceData);
        return sourceData;
      });
    setBase64Video(video);

    if (message.output.generic) {
      message.output.generic[message.output.generic.length] = {
        response_type: "video",
        source: video,
        title: "Signs",
        description: "Converted Sign to Sign",
        alt_text: "Sign",
        chat: {
          dimensions: {
            base_height: 300,
          },
        },
      };
    }
  }
  useEffect(() => {
    if (chatbotResponse) {
      instance?.send(chatbotResponse);
      instance?.on({
        type: "pre:receive",
        handler: async (e) => preReceiveHandler(e),
      });
    }
  }, [chatbotResponse]);

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
      {base64Video && (
        <Box
          position={"absolute"}
          width={"200px"}
          height={"200px"}
          zIndex={999999}
          right={100}
        >
          <video controls style={{ width: "200px", height: "200px" }} autoPlay>
            <source src={base64Video} type="video/mp4" />
          </video>
        </Box>
      )}

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
          <VideoRecorder setVideoSpeech={setChatbotResponse} />
        </Grid>
      </Modal>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />
    </Grid>
  );
}

export default page;
