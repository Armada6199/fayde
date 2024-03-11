"use client";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import { Grid, Typography } from "@mui/material";
import axios from "axios";
import {
  HeroContent,
  HeroDescription,
  HeroTitle,
  MaxWidthContainer,
  SectionHeader,
} from "../components/HeroText";
import React, { useEffect, useState } from "react";
const webChatOptions = {
  integrationID: "cf134e1a-14b7-4d0c-b7c1-4684c9d5e536", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c", // The ID
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
        const response = await axios.post(
          "https://5c18-178-20-188-157.ngrok-free.app/api/text-to-speech?lang=ar",
          e.data.output.generic[0].text,
          { headers: headers }
        );
        setVoiceResponse(response.data);
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
      <HeroContent>
        <SectionHeader>
          <HeroTitle data-aos="zoom-y-out">
            Turn Text Into <span>Speech</span>
          </HeroTitle>
          <HeroDescription data-aos="zoom-y-out" data-aos-delay="150">
            Speech will appear here once loaded
          </HeroDescription>
          <MaxWidthContainer data-aos="zoom-y-out" data-aos-delay="300">
            <Grid item>
              {voiceResponse && (
                <audio src={`data:audio/mpeg;base64,${voiceResponse}`} controls>
                  test
                </audio>
              )}
            </Grid>
          </MaxWidthContainer>
        </SectionHeader>
      </HeroContent>

      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />
    </Grid>
  );
}

export default page;
