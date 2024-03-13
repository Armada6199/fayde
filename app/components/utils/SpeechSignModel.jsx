import { HelloModel } from "@/app/speechtosign/Hello";
import "@/styles/chatbot.css";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import { Grid } from "@mui/material";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
const webChatOptions = {
  integrationID: "cf134e1a-14b7-4d0c-b7c1-4684c9d5e536", // The ID of this integration.
  region: "eu-gb", // The region your integration is hosted in.
  serviceInstanceID: "dd8f0bab-351b-4c0d-bcfc-3ef8dcb5958c", // The ID
  // subscriptionID: 'only on enterprise plans',
  // Note that there is no onLoad property here. The WebChatContainer component will override it.
  // Use the onBeforeRender or onAfterRender prop instead.
};
function SpeechSignModel() {
  const [start, setStart] = useState();
  const [instance, setInstance] = useState(null);

  return (
    <Grid container item>
      {/* <Grid
        container
        item
        xs={12}
        sx={{
          bgcolor: "#fff",
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
        }}
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            sx={{
              borderRadius: "0px",
              borderTopLeftRadius: "20px",
              border: "none",
              outline: "none",
            }}
            placeholder="Enter your text here"
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              height: "100%",
              borderRadius: "0",
              borderTopRightRadius: "20px",
            }}
            onClick={() => setStart(true)}
          >
            Convert
          </Button>
        </Grid>
      </Grid> */}
      <Grid container item>
        <Canvas
          camera={{ position: [2, 0, 7.25], fov: 15 }}
          style={{
            width: "50vw",
            backgroundColor: "#111a21",
            height: "50vh",
          }}
        >
          <ambientLight intensity={1.25} />
          <ambientLight intensity={0.1} />
          <directionalLight intensity={0.4} />
          <Suspense fallback={null}>
            <HelloModel start={start} position={[0.025, -0.9, 1]} />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </Grid>
      <Grid container item>
        <WebChatContainer
          config={webChatOptions}
          onBeforeRender={setInstance}
        />
      </Grid>
    </Grid>
  );
}

export default SpeechSignModel;
