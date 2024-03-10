"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
const mimeType = "audio/mp3";
const webChatOptions = {
  integrationID: "dafaa13b-18bf-4e88-aff5-649228cb84f7", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c", // The ID of your service instance.
};
const AudioRecorder = () => {
  const [permission, setPermission] = useState(false);
  const mediaRecorder = useRef(null);
  const [recordingStatus, setRecordingStatus] = useState("inactive");
  const [stream, setStream] = useState(null);
  const [audioChuncks, setAudioChuncks] = useState([]);
  const [audio, setAudio] = useState(null);
  const [respondSpeech, setRespondSpeech] = useState("");
  const [instance, setInstance] = useState(null);

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
      saveAs(audioBlob, "audio1.mp3");
      handleSubmit(audioBlob);
      // ->>>>>>>>> saveAs(audioBlob, 'audio1'); <<<<<<<<<<<
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
          "https://5c18-178-20-188-157.ngrok-free.app/api/speech-to-text?lang=en",
          base64String,
          { headers: headers }
        );
        // console.log(clientText.data);
        instance.send(clientText.data);
        instance?.on({
          type: "receive",
          handler: async (e) => {
            const chatBotVoice = await axios.post(
              "https://5c18-178-20-188-157.ngrok-free.app/api/text-to-speech?lang=ar",
              e.data.output.generic[0].text,
              { headers: headers }
            );
            console.log(chatBotVoice.data, "chat bot voice resposne ");
            setRespondSpeech(chatBotVoice.data);
          },
        });
        // toggleWebChat();
      });
    } catch (error) {
      // Handle any errors (e.g., display an error message)
      console.error("Error uploading video:", error);
    }
  };
  useEffect(() => {
    instance?.updateCSSVariables({
      "BASE-width": "100vw",
      "LAUNCHER-color-avatar": "#fff",
      "LAUNCHER-color-background": "#165634",
      "LAUNCHER-color-background-hover": "#165634",
    });
  }, [instance]);
  return (
    <>
      <div>
        <h2>Audio Recorder</h2>
        <main>
          <div className="audio-controls">
            {!permission ? (
              <button onClick={getMicrophonePermission} type="button">
                Get Microphone
              </button>
            ) : null}
            {permission && recordingStatus === "inactive" ? (
              <button onClick={startRecording} type="button">
                Start Recording
              </button>
            ) : null}
            {recordingStatus === "recording" ? (
              <button onClick={stopRecording} type="button">
                stop Recording
              </button>
            ) : null}
          </div>
          <div>
            {audio ? (
              <div className="audio-container">
                <audio src={audio} controls></audio>
                {/* <a download href={audio}>
                  Download Recording
                </a> */}
              </div>
            ) : null}
            {respondSpeech ? (
              <div className="audio-container">
                <audio
                  src={`data:audio/mp3;base64,${respondSpeech}`}
                  controls
                ></audio>
                {/* <a download href={audio}>
                  Download Recording
                </a> */}
              </div>
            ) : null}
          </div>
        </main>
      </div>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />{" "}
    </>
  );
};

export default AudioRecorder;
