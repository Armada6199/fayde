"use client";
import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { HeroContent, HeroTitle, SectionHeader } from "../components/HeroText";
import VideoRecorder from "../components/utils/VideoRecored";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
const webChatOptions = {
  integrationID: process.env.NEXT_PUBLIC_INTEGRATION_ID, // The ID of this integration.
  region: process.env.NEXT_PUBLIC_REGION, // The region your integration is hosted in.
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID, // The ID
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};
function page() {
  const [videoSpeech, setVideoSpeech] = useState(null);
  const [instance, setInstance] = useState();
  const HeroDescription = styled("p")({
    fontSize: "1.25rem",
    color: "#718096",
    marginBottom: "2rem",
  });

  const MaxWidthContainer = styled("div")({
    maxWidth: "48rem",
    margin: "auto",
    "@media (min-width: 640px)": {
      display: "flex",
      justifyContent: "center",
      gap: 12,
    },
  });
  useEffect(() => {
    if (instance) {
      instance.send(videoSpeech);
    }
  }, [videoSpeech]);
  return (
    <Grid container item height={"calc(100vh - 160px)"}>
      <HeroContent>
        <SectionHeader>
          <HeroTitle data-aos="zoom-y-out">
            Turn Sign Lanaguage Into <span>TEXT</span>
          </HeroTitle>
          <HeroDescription data-aos="zoom-y-out" data-aos-delay="150">
            Once you are ready click on the button below to start recording
          </HeroDescription>
          <MaxWidthContainer data-aos="zoom-y-out" data-aos-delay="300">
            {/* Your additional content here */}
            <VideoRecorder setVideoSpeech={setVideoSpeech} />
          </MaxWidthContainer>
        </SectionHeader>
      </HeroContent>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />
    </Grid>
  );
}

export default page;
