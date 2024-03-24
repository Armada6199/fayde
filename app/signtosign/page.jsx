"use client";

import React, { useEffect, useState } from "react";
import arabicLetterImages from "@/public/sign";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import VideoRecorder from "../components/utils/VideoRecored";
import {
  HeroContent,
  HeroDescription,
  HeroTitle,
  MaxWidthContainer,
  SectionHeader,
} from "../components/HeroText";
function isSpecialCharacter(char) {
  const specialCharacterRegex = /[^a-zA-Z0-9\s]/;
  return specialCharacterRegex.test(char);
}
const webChatOptions = {
  integrationID: process.env.NEXT_PUBLIC_INTEGRATION_ID,
  region: process.env.NEXT_PUBLIC_REGION,
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID,
};
function page() {
  const [word, setWord] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [instance, setInstance] = useState(null);
  const [videoSpeech, setVideoSpeech] = useState(null);
  useEffect(() => {
    if (videoSpeech) {
      instance.send(videoSpeech);
      instance?.on({
        type: "receive",
        handler: async (e) => {
          console.log(e.data.output);
          setWord(
            `${e.data.output.generic[0]?.text} ${e.data.output.generic[1]?.text} ${e.data.output.generic[2]?.text}`
          );
        },
      });
    }
  }, [videoSpeech]);
  useEffect(() => {
    let interval;
    if (word) {
      interval = setInterval(() => {
        // Move to the next image
        setCurrentImageIndex((prevIndex) =>
          prevIndex === word.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [instance, word]);
  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems={"center"}
      height={"calc(100vh - 60px)"}
    >
      <HeroContent>
        <SectionHeader>
          <HeroTitle data-aos="zoom-y-out">
            Turn Sign Language Into <span>Sign</span>
          </HeroTitle>
          <HeroDescription data-aos="zoom-y-out" data-aos-delay="150">
            Once You Are ready Click the button Below to start Recording
          </HeroDescription>
          <Grid container item>
            <VideoRecorder setVideoSpeech={setVideoSpeech} />
          </Grid>
          <MaxWidthContainer>
            {word && (
              <Grid
                container
                item
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid item xs={12} textAlign={"center"}>
                  <Typography variant="h4">
                    {word[currentImageIndex]}
                  </Typography>
                </Grid>
                <Grid container item xs={4} justifyContent={"center"}>
                  {!word && <Typography>Signs Will Appear here </Typography>}
                  {isSpecialCharacter(word[currentImageIndex]) ? (
                    <Image
                      src={arabicLetterImages[word[currentImageIndex]]}
                      width={150}
                      height={180}
                      alt="image letter"
                    />
                  ) : (
                    console.log()
                  )}
                </Grid>
              </Grid>
            )}
          </MaxWidthContainer>
        </SectionHeader>
      </HeroContent>
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />{" "}
    </Grid>
  );
}

export default page;
