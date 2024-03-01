import { Button, Grid, Typography } from "@mui/material";
import { useState, useRef } from "react";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SendIcon from "@mui/icons-material/Send";
import { glassmorphismStyle } from "@/styles/styles";
const mimeType = "video/webm";

const VideoRecorder = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const liveVideoFeed = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [videoChuncks, setVideoChuncks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);

  const getCameraPermission = async () => {
    setRecordedVideo(null);

    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };
        const audioConstrains = { audio: true };

        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );
        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstrains
        );
        setPermission(true);

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ]);

        setStream(combinedStream);
        liveVideoFeed.current.srcObject = videoStream;
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The media Recorder API is not supported in your browser");
    }
  };
  const startRecording = async () => {
    getCameraPermission();
    console.log("started");
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localVideoChuncks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localVideoChuncks.push(event.data);
    };
    setVideoChuncks(localVideoChuncks);
  };
  const stopRecording = () => {
    setPermission(false);
    setRecordingStatus("inactive");
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChuncks, { type: mimeType });
      const videoUrl = URL.createObjectURL(videoBlob);
      setRecordedVideo(videoUrl);
      setVideoChuncks([]);
    };
  };
  return (
    <Grid container item>
      <Grid item xs={12}>
        <Typography variant="h1">Video Recorder</Typography>
      </Grid>
      <Grid
        container
        item
        sx={{
          ...glassmorphismStyle,
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
        justifyContent={"space-around"}
        className="video-controls"
      >
        <Grid item>
          <StopCircleIcon
            sx={{ cursor: "pointer", width: 32, height: 28 }}
            onClick={() =>
              recordingStatus === "recording" ? stopRecording : null
            }
          />
        </Grid>
        <Grid item>
          <PlayCircleIcon
            sx={{ cursor: "pointer", width: 32, height: 28 }}
            onClick={recordingStatus === "inactive" ? null : startRecording}
          />
        </Grid>

        <Grid item>
          <SendIcon sx={{ cursor: "pointer", width: 32, height: 28 }} />
        </Grid>
      </Grid>
      {!recordedVideo && recordingStatus == "recording" && (
        <Grid container item>
          <video
            ref={liveVideoFeed}
            autoPlay
            style={{
              width: "100%",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
              height: "300px",
            }}
            className="live-player"
          ></video>
        </Grid>
      )}
      {recordedVideo && recordingStatus == "inactive" && (
        <Grid container item>
          <video
            src={recordedVideo}
            autoPlay
            style={{
              width: "100%",
              borderBottomRightRadius: "20px",
              borderBottomLeftRadius: "20px",
              height: "300px",
            }}
            className="live-player"
          ></video>
        </Grid>
      )}
      {!recordedVideo && recordingStatus == "inactive" && (
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          item
          sx={{ height: "300px", bgcolor: "primary.main" }}
        >
          <Typography variant="h6">
            Video Recording will appear here once recording started
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoRecorder;
