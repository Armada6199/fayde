import { useState, useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
// import sendAudioForm from "./sendAudioForm";
import * as FFmpeg from "@ffmpeg/ffmpeg";
import { Button, Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import CardAudio from "../CardAudio";
import { Box } from "@mui/system";

const mimeType = "audio/mp3";

const AudioRecorder = ({ speechText, setSpeechText, toggleWebChat }) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChuncks, setAudioChuncks] = useState([]);
  const [audio, setAudio] = useState(null);
  const audioRef = useRef(null);
  const [isPlaying, SetIsPlaying] = useState(false);
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });
        setPermission(true);
        setStream(streamData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The mediaRecorder API is not Supported in your browser");
    }
  };
  const startRecording = async () => {
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { type: mimeType });
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

  // try to use asysnc(e) here as in predict application
  const stopRecording = () => {
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChuncks, { type: mimeType });
      const audioURL = URL.createObjectURL(audioBlob);
      setAudio(audioURL);
      setAudioChuncks([]);
      // Create a file name for the recording

      const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0]);
      };
      // saveAs(audioBlob, "audio1.mp3");
      handleSubmit(audioBlob);
      // ->>>>>>>>> saveAs(audioBlob, 'audio1'); <<<<<<<<<<<
    };
  };
  function playAudio() {
    SetIsPlaying(true);
    audioRef.current.play();
  }

  function pauseAudio() {
    SetIsPlaying(false);
    audioRef.current.pause();
  }
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
        const response = await axios.post(
          "https://3a8c-178-20-188-157.ngrok-free.app/api/speech-to-text",
          base64String,
          { headers: headers }
        );
        setSpeechText(response.data);
        // toggleWebChat();
      });
      // Handle the response (e.g., show a success message)
      console.log("Audio uploaded successfully:", response.data);
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("Error uploading video:", error);
    }
  };
  return (
    <Box height={"calc(100vh - 120px)"}>
      <main>
        <div className="audio-controls">
          {!permission ? (
            <Button
              onClick={getMicrophonePermission}
              variant="contained"
              type="Button"
            >
              Get Microphone
            </Button>
          ) : null}
          {permission && recordingStatus === "inactive" ? (
            <Button onClick={startRecording} type="Button">
              Start Recording
            </Button>
          ) : null}
          {recordingStatus === "recording" ? (
            <Button onClick={stopRecording} type="Button">
              stop Recording
            </Button>
          ) : null}
        </div>
        <Box display={"none"}>
          {audio ? (
            <div className="audio-container">
              <audio src={audio} ref={audioRef} controls></audio>
              <a download href={audio}>
                Download Recording
              </a>
            </div>
          ) : null}
        </Box>
      </main>
      {audio && (
        <CardAudio
          isPlaying={isPlaying}
          SetIsPlaying={SetIsPlaying}
          playAudio={playAudio}
          pauseAudio={pauseAudio}
        />
      )}

      <Typography>{speechText}</Typography>
    </Box>
  );
};

export default AudioRecorder;
