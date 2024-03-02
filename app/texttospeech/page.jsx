"use client";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { a } from "react-spring";
import saveAs from "save-as";

const webChatOptions = {
  integrationID: "cf134e1a-14b7-4d0c-b7c1-4684c9d5e536", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c", // The ID
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};
function page() {
  const [instance, setInstance] = useState(null);
  const [voiceResponse, setVoiceResponse] = useState(null);
  const headers = {
    "Content-Type": "application/json",
  };
  useEffect(() => {
    // instance?.send("hello");
    instance?.on({
      type: "receive",
      handler: async (e) => {
        // console.log(e.data.output.generic[0].text);
        const response = await axios.post(
          "https://5c18-178-20-188-157.ngrok-free.app/api/text-to-speech",
          "dadddy",
          { headers: headers }
        );
        console.log(response.data);
        // console.log(response);
        // var blob = new Blob([response.data], { type: "audio/mp3" });
        // // const url = URL.createObjectURL(blob);
        // // setVoiceResponse(blob);
        // console.log(blob);
        // saveAs(blob, "audio1.mp3");
        const mimeType = "audio/mp3";
        const audioBlob = new Blob(response.data, { type: mimeType });
        const audioURL = URL.createObjectURL(audioBlob);
        console.log(audioURL);
        saveAs(audioURL, "audio.mp3");
      },
    });
  }, [instance]);
  return (
    <Grid
      container
      item
      sx={{ height: "calc(100vh - 160px)" }}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      gap={8}
    >
      <Grid item>
        <Typography variant="h2">
          Speech will appear here once loaded
        </Typography>
      </Grid>
      <Grid item>
        {voiceResponse && <audio src={voiceResponse} type="audio/mpeg"></audio>}
      </Grid>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />
    </Grid>
  );
}

export default page;
