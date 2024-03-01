"use client";
import styled from "@emotion/styled";
import React from "react";
import VideoRecorder from "../components/utils/VideoRecored";

function page() {
  const HeroContent = styled("div")({
    maxWidth: "6xl",
    margin: "auto",
    padding: "4rem 2rem",
    backgroundColor: "#f3f3f3",
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
      backgroundImage: "linear-gradient(to right, #2563eb, #38a3f1)",
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
      gap: 12,
    },
  });
  return (
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
          <VideoRecorder />
        </MaxWidthContainer>
      </SectionHeader>
    </HeroContent>
  );
}

export default page;
