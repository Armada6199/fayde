"use client";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/system";
import FeaturesHOC from "./components/FeaturesHOC.jsx";
import { Button, Grid, Modal, Typography } from "@mui/material";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { glassmorphismStyle } from "@/styles/styles";
import ChatIcon from "@mui/icons-material/Chat";
const HeroSection = styled("section")({
  position: "relative",
  height: "calc(100vh - 120px)",
  width: "100%",
});
const webChatOptions = {
  integrationID: "cf134e1a-14b7-4d0c-b7c1-4684c9d5e536", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c", // The ID
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};
const IllustrationContainer = styled("div")({
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  bottom: 0,
  pointerEvents: "none",
  zIndex: -1,
});

const HeroContent = styled("div")({
  maxWidth: "6xl",
  margin: "auto",
  padding: "4rem 2rem",
  bgcolor: "#f3f3f3",
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
    backgroundImage: "linear-gradient(to right, #165634, #45785d)",
  },
});

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
  },
});

const Hero = () => {
  [];
  const [instance, setInstance] = useState(null);
  const [open, setOpen] = React.useState({
    speechToText: false,
    videoToText: false,
    textToSign: false,
    textToSpeech: false,
  });

  const handleOpen = (text) => {
    setOpen((prev) => ({ ...prev, [text]: true }));
    setActiveFeature(text);
  };
  const handleClose = () => {
    setOpen((prev) => ({ ...prev, [activeFeature]: false }));
  };

  const toggleWebChat = useCallback(() => {
    instance.toggleOpen();
  }, [instance]);
  const [activeFeature, setActiveFeature] = useState("");
  useEffect(() => {
    console.log(instance);
    instance?.send("hello");
    instance?.on({
      type: "receive",
      handler: (e) => {
        console.log(e.data.output.generic[0].text);
      },
    });
  }, [instance]);
  return (
    <Grid container item height={"calc(100vh - 160px)"}>
      <HeroSection>
        {/* Illustration behind hero content */}
        <IllustrationContainer aria-hidden="true">
          <svg
            width="100vw"
            height="100vh"
            viewBox="0 0 1360 578"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                x1="50%"
                y1="0%"
                x2="50%"
                y2="100%"
                id="illustration-01"
              >
                <stop stopColor="#8bab9a" offset="0%" />
                <stop stopColor="#45785d" offset="77.402%" />
                <stop stopColor="#165634" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="100%" cy="80" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </IllustrationContainer>
        <HeroContent>
          <SectionHeader>
            <HeroTitle data-aos="zoom-y-out">
              Elevating Conversations Igniting <span>Innovation</span>
            </HeroTitle>
            <HeroDescription data-aos="zoom-y-out" data-aos-delay="150">
              Elevating Conversations Igniting Innovation
            </HeroDescription>
            <MaxWidthContainer data-aos="zoom-y-out" data-aos-delay="300">
              {/* Your additional content here */}
            </MaxWidthContainer>
          </SectionHeader>
          <Grid container item justifyContent={"center"} gap={4}>
            <Grid item xs={2}>
              <Button fullWidth variant="outlined">
                Explore Featuers
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button fullWidth variant="contained">
                Try Our Assistant
              </Button>
            </Grid>
          </Grid>
        </HeroContent>

        <Grid container item justifyContent={"center"}>
          <Grid container item xs={12} md={8} gap={4} flexWrap={"nowrap"}>
            <Grid
              container
              item
              sx={{
                ...glassmorphismStyle,
                cursor: "pointer",
                textAlign: "center",
                bgcolor: activeFeature === "speechToText" ? "primary.main" : "",
                color:
                  activeFeature === "speechToText" ? "#fff" : "primary.main",
                transition: "all .5s ease-in-out",
              }}
              onClick={() => handleOpen("speechToText")}
              xs={12}
              md={3}
              gap={2}
              p={2}
            >
              <Grid item xs={12}>
                <MicIcon
                  sx={{
                    fontSize: 64,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Speech To Text</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sx={{
                ...glassmorphismStyle,
                cursor: "pointer",
                textAlign: "center",
                bgcolor: activeFeature === "signToText" ? "primary.main" : "",
                color: activeFeature === "signToText" ? "#fff" : "primary.main",
                transition: "all .5s ease-in-out",
              }}
              onClick={() => handleOpen("signToText")}
              xs={12}
              md={3}
              gap={2}
              p={2}
            >
              <Grid item xs={12}>
                <VideocamIcon sx={{ fontSize: 64 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Sign To Text</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sx={{
                ...glassmorphismStyle,
                cursor: "pointer",
                textAlign: "center",
                bgcolor: activeFeature === "textToSign" ? "primary.main" : "",
                color: activeFeature === "textToSign" ? "#fff" : "primary.main",
                transition: "all .5s ease-in-out",
              }}
              onClick={() => handleOpen("textToSign")}
              xs={12}
              md={3}
              gap={2}
              p={2}
            >
              <Grid item xs={12}>
                <SignLanguageIcon sx={{ fontSize: 64 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Text To Sign Language</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sx={{
                ...glassmorphismStyle,
                cursor: "pointer",
                textAlign: "center",
                bgcolor:
                  activeFeature === "speechToSpeech" ? "primary.main" : "",
                color:
                  activeFeature === "speechToSpeech" ? "#fff" : "primary.main",
                transition: "all .5s ease-in-out",
              }}
              onClick={() => handleOpen("speechToSpeech")}
              xs={12}
              md={3}
              gap={2}
              p={2}
            >
              <Grid item xs={12}>
                <RecordVoiceOverIcon sx={{ fontSize: 64 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Speech To Speech</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              sx={{
                ...glassmorphismStyle,
                cursor: "pointer",
                textAlign: "center",
                bgcolor: activeFeature === "textToSpeech" ? "primary.main" : "",
                color:
                  activeFeature === "textToSpeech" ? "#fff" : "primary.main",
                transition: "all .5s ease-in-out",
              }}
              onClick={() => handleOpen("textToSpeech")}
              xs={12}
              md={3}
              gap={2}
              p={2}
            >
              <Grid item xs={12}>
                <ChatIcon sx={{ fontSize: 64 }} />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h5">Text To Speech</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Modal
            open={open[activeFeature] || false}
            onClose={handleClose}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              outline: "none",
              border: "none",
            }}
          >
            <Grid
              container
              item
              md={8}
              justifyContent={"center"}
              p={4}
              position={"relative"}
              sx={{
                outline: "none",
                border: "none",
              }}
            >
              <FeaturesHOC feature={activeFeature} handleClose={handleClose} />
              {/* <ClearSharp
                sx={{
                  position: "absolute",
                  top: 50,
                  right: 100,
                  fontSize: 68,
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              /> */}
            </Grid>
          </Modal>
        </Grid>
        {/* {Load_bot()} */}
        <WebChatContainer
          config={webChatOptions}
          onBeforeRender={setInstance}
        />
      </HeroSection>
    </Grid>
  );
};

export default Hero;
{
  /* <Grid container item justifyContent={"center"}>
            <Image src={image} alt="landingimage" />
            <Typography variant="h1" color={"darkgreen"}>
            INSPIRE
          </Typography>
          </Grid> */
}
