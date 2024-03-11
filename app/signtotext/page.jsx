"use client";
import styled from "@emotion/styled";
import React, { useState } from "react";
import VideoRecorder from "../components/utils/VideoRecored";
import { Grid } from "@mui/material";
import {
  HeroContent,
  HeroDescription,
  HeroTitle,
  MaxWidthContainer,
  SectionHeader,
} from "../components/HeroText";
function page() {
  const [videoSpeech, setVideoSpeech] = useState(null);
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
    </Grid>
  );
}

export default page;
