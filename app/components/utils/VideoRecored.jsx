import { glassmorphismStyle } from "@/styles/styles";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SendIcon from "@mui/icons-material/Send";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import TvIcon from "@mui/icons-material/Tv";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useRef, useState } from "react";
import "../../../styles/video.css";
const mimeType = "video/webm";

const VideoRecorder = ({
  setVideoSpeech,
  base64Video,
  setIsRecorderOpen,
  setIsLoading,
}) => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const liveVideoFeed = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [videoChuncks, setVideoChuncks] = useState([]);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  function blobToBase64(blob, callback) {
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result.split(",")[1];
      callback(base64String);
    };
    reader.readAsDataURL(blob);
  }
  const handleSubmit = async (videoBlob) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };
      setIsLoading({ status: true, message: "Generating Text from video" });
      setIsRecorderOpen(false);
      blobToBase64(videoBlob, async function (base64String) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/api/signLang-to-text?lang=ar`,
          base64String,
          { headers: headers }
        );
        setVideoSpeech(response.data);
        // toggleWebChat();
        setIsLoading({ status: false, message: "" });
      });
      // Handle the response (e.g., show a success message)
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("Error uploading video:", error);
    }
  };
  const getCameraPermission = async () => {
    setRecordedVideo(null);
    if ("MediaRecorder" in window) {
      try {
        const videoConstraints = {
          audio: false,
          video: true,
        };

        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        );

        setPermission(true);

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
        ]);

        // setStream(combinedStream);
        setRecordingStatus("recording");
        liveVideoFeed.current.srcObject = videoStream;
        setStream(combinedStream);
        startRecording(combinedStream);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("The media Recorder API is not supported in your browser");
    }
  };
  const startRecording = async (combinedStream) => {
    const media = new MediaRecorder(combinedStream, { mimeType });
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
      setVideoBlob(videoBlob);
      setVideoChuncks([]);
    };
  };
  return (
    <Grid container item textAlign={"center"}>
      <Grid container item>
        <Grid
          container
          sx={{
            ...glassmorphismStyle,
            height: "60px",
            borderRadius: "0px",
            borderTopRightRadius: "20px",
            borderTopLeftRadius: "20px",
          }}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <Grid item>
            <StopCircleIcon
              sx={{
                cursor: "pointer",
                width: 32,
                height: 28,
                color: "primary.main",
              }}
              onClick={() =>
                recordingStatus === "recording" ? stopRecording() : null
              }
            />
          </Grid>
          <Grid item>
            <PlayCircleIcon
              sx={{
                cursor: "pointer",
                width: 32,
                height: 28,
                color: "primary.main",
              }}
              onClick={() =>
                recordingStatus == "inactive" ? getCameraPermission() : null
              }
            />
          </Grid>
          <Grid item>
            <SendIcon
              sx={{
                cursor: "pointer",
                width: 32,
                height: 28,
                color: "primary.main",
              }}
              onClick={() => (recordedVideo ? handleSubmit(videoBlob) : null)}
            />
          </Grid>
        </Grid>
        <Grid container item>
          <Grid
            container
            item
            sx={{
              display: recordingStatus === "recording" ? "block" : "none",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                overflow: "hidden",
              }}
            >
              <video
                ref={liveVideoFeed}
                autoPlay
                style={{
                  width: "100%",
                  border: "none",
                }}
              ></video>
            </Box>
          </Grid>
          {recordedVideo && (
            <Box
              sx={{
                width: "100%",
                height: "80vh",
                borderBottomRightRadius: "20px",
                borderBottomLeftRadius: "20px",
                overflow: "hidden",
              }}
            >
              <video
                src={base64Video ? base64Video : recordedVideo}
                autoPlay
                style={{
                  width: "100%",

                  border: "none",
                }}
                className="live-player"
              ></video>
            </Box>
          )}

          {!recordedVideo && recordingStatus == "inactive" && (
            <Grid
              container
              item
              sx={{ height: "300px", width: "100%", bgcolor: "primary.main" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid item xs={12}>
                <TvIcon sx={{ fontSize: 120, color: "#fff" }} />
              </Grid>
              <Typography color={"#fff"} variant="h5">
                Video will appear here once started
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default VideoRecorder;
