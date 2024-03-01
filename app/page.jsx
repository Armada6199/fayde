"use client";
import React, { useCallback, useState } from "react";
import { Box, styled } from "@mui/system";
import image from "../public/inspireLogo.png";
import { Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function CustomBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
      </BottomNavigation>
    </Box>
  );
}

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
  const [instance, setInstance] = useState(null);
  const toggleWebChat = useCallback(() => {
    instance.toggleOpen();
  }, [instance]);
  return (
    <Grid container item height={"calc(100vh - 160px)"}>
      <HeroSection>
        {/* Illustration behind hero content */}
        <IllustrationContainer aria-hidden="true">
          <svg
            width="1360"
            height="578"
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
              <circle cx="1232" cy="128" r="128" />
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
              Our landing page template works on all devices, so you only have
              to set it up once, and get beautiful results forever.
            </HeroDescription>
            <MaxWidthContainer data-aos="zoom-y-out" data-aos-delay="300">
              {/* Your additional content here */}
            </MaxWidthContainer>
          </SectionHeader>
        </HeroContent>
        <Grid container justifyContent={"center"} gap={8}>
          <Grid item>
            <Button fullWidth variant="outlined">
              Sign To Speech
            </Button>
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" onClick={toggleWebChat}>
              Try Assistant Now
            </Button>
          </Grid>
          <CustomBottomNavigation />
        </Grid>

        <Grid container item></Grid>
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
