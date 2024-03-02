"use client";
import styled from "@emotion/styled";
import React, { useCallback, useRef, useState } from "react";
import AudioRecorder from "../components/utils/VoiceRecorder";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import { Grid } from "@mui/material";

const webChatOptions = {
  integrationID: "cf134e1a-14b7-4d0c-b7c1-4684c9d5e536", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c", // The ID
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};
function page() {
  // const [instance, setInstance] = useState(null);
  const instanceRef = useRef(null);
  const [speechText, setSpeechText] = useState(null);

  const HeroContent = styled("div")({
    maxWidth: "6xl",
    margin: "auto",
    padding: "4rem 2rem",
  });

  const SectionHeader = styled("div")({
    textAlign: "center",
    paddingBottom: "4rem",
  });

  const HeroTitle = styled("h1")({
    fontSize: "2.5rem",
    "@media (min-width: 768px)": {
      fontSize: "3rem",
    },
    fontWeight: "bold",
    lineHeight: "1.2",
    marginBottom: "1rem",
    "& span": {
      backgroundClip: "text",
      color: "transparent",
      backgroundImage: "linear-gradient(to right, #165634, #165634)",
    },
  });

  const HeroDescription = styled("p")({
    fontSize: "1.25rem",
    color: "#718096",
    marginBottom: "2rem",
  });
  const toggleWebChat = (currentInstance) => {
    // instance.toggleOpen();
    currentInstance.send(speechText);
  };

  const MaxWidthContainer = styled("div")({
    maxWidth: "48rem",
    margin: "auto",
    "@media (min-width: 640px)": {
      display: "flex",
      justifyContent: "center",
      gap: 12,
    },
  });
  return (
    <Grid container>
      <HeroContent>
        <SectionHeader>
          <HeroTitle data-aos="zoom-y-out">
            Turn Speech Into <span>TEXT</span>
          </HeroTitle>
          <HeroDescription data-aos="zoom-y-out" data-aos-delay="150">
            Once you are ready click on the button below to start recording
          </HeroDescription>
          <MaxWidthContainer data-aos="zoom-y-out" data-aos-delay="300">
            {/* Your additional content here */}
            <AudioRecorder
              speechText={speechText}
              setSpeechText={setSpeechText}
              // toggleWebChat={toggleWebChat}
            />
          </MaxWidthContainer>
        </SectionHeader>

        <WebChatContainer
          config={webChatOptions}
          onAfterRender={(instance) => toggleWebChat(instance)}
          instanceRef={instanceRef}
        />
      </HeroContent>
    </Grid>
  );
}

export default page;
