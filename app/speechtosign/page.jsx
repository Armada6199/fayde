"use client";

import React, { useEffect, useState } from "react";
import arabicLetterImages from "@/public/sign";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";

function isSpecialCharacter(char) {
  const specialCharacterRegex = /[^a-zA-Z0-9\s]/;
  return specialCharacterRegex.test(char);
}
const webChatOptions = {
  integrationID: "cf134e1a-14b7-4d0c-b7c1-4684c9d5e536",
  region: "eu-gb",
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c",
};
function page() {
  const [word, setWord] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    instance?.on({
      type: "receive",
      handler: async (e) => {
        setWord(e.data.output.generic[0]?.text);
      },
    });
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
      {word && (
        <Grid container item justifyContent={"center"}>
          <Grid item>
            <Typography variant="h4">{word[currentImageIndex]}</Typography>
          </Grid>
          <Grid container item justifyContent={"center"}>
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
      <WebChatContainer config={webChatOptions} onBeforeRender={setInstance} />{" "}
    </Grid>
  );
}

export default page;
