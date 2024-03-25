"use client";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import MicIcon from "@mui/icons-material/Mic";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import "../../styles/recording.css";
import axios from "axios";
function convertToVideo(images, frameRate, callback) {
  var encoder = new Whammy.Video(frameRate);
  var count = 0;

  function addFrame(canvas) {
    encoder.add(canvas.toDataURL("image/webp"));
    count++;
    if (count === images.length) {
      var blob = encoder.compile();
      var reader = new FileReader();
      reader.onload = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  }

  images.forEach(function (base64) {
    base64ToCanvas(base64, addFrame);
  });
}

function customResponseHandler(event) {
  const { message, element, fullMessage } = event.data;
  console.log(message);
}

const webChatOptions = {
  integrationID: process.env.NEXT_PUBLIC_INTEGRATION_ID,
  region: process.env.NEXT_PUBLIC_REGION,
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID,
};
const mimeType = "audio/mp3";

function page() {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChuncks, setAudioChuncks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [respondSpeech, setRespondSpeech] = useState("");
  const [instance, setInstance] = useState(null);
  async function preReceiveHandler(event) {
    const headers = {
      "Content-Type": "application/json",
    };
    const message = event.data;
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
    console.log(event.data.output.generic);
    console.log(text);
    const chatBotVoice = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/text-to-speech?lang=ar`,
      `${text} ${options}`,
      { headers: headers }
    );
    instance?.on({
      type: "customResponse",
      handler: customResponseHandler,
    });
    if (message.output.generic) {
      message.output.generic[message.output.generic.length] = {
        response_type: "audio",
        source: `data:audio/webm;base64,${chatBotVoice.data}`,
      };
    }
  }
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
        return streamData;
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The mediaRecorder API is not Supported in your browser");
    }
  };
  const startRecording = async () => {
    setRecordingStatus("recording");
    const stream = await getMicrophonePermission();
    console.log(stream);
    const media = new MediaRecorder(stream, {
      type: mimeType,
    });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChuncks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChuncks.push(event.data);
    };
    setAudioChuncks(localAudioChuncks);
  };

  const stopRecording = () => {
    console.log("stop");
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChuncks, { type: mimeType });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudio(audioURL);
      setAudioChuncks([]);
      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
      };
      handleSubmit(audioBlob);
    };
  };
  function blobToBase64(blob, callback) {
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result.split(",")[1];
      callback(base64String);
    };
    reader.readAsDataURL(blob);
  }
  const handleSubmit = async (audioBlob) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      blobToBase64(audioBlob, async function (base64String) {
        const clientText = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/speech-to-text?lang=en`,
          base64String,
          { headers: headers }
        );
        // console.log(clientText.data);
        instance.send(clientText.data);
        instance?.on({
          type: "pre:receive",
          handler: (event) => preReceiveHandler(event),
        });
      });
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };
  useEffect(() => {
    if (respondSpeech) {
      console.log(respondSpeech);
    }
    instance?.updateCSSVariables();
  }, [instance, respondSpeech]);
  return (
    <Grid container>
      <Box
        position={"absolute"}
        bottom={30}
        right={40}
        sx={{ cursor: "pointer" }}
        onClick={() =>
          !permission
            ? getMicrophonePermission()
            : recordingStatus == "recording"
            ? stopRecording()
            : startRecording()
        }
        zIndex={999999}
      >
        <MicIcon
          className={recordingStatus === "inactive" ? "" : "pulse_recording"}
          sx={{ width: 32, height: 32 }}
        />
      </Box>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />
    </Grid>
  );
}

export default page;
