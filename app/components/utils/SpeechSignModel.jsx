import { HelloModel } from "@/app/speechtosign/Hello";
import "@/styles/chatbot.css";
import { WebChatContainer } from "@ibm-watson/assistant-web-chat-react";
import { Button, Grid } from "@mui/material";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
const webChatOptions = {
  integrationID: process.env.NEXT_PUBLIC_INTEGRATION_ID,
  region: process.env.NEXT_PUBLIC_REGION,
  serviceInstanceID: process.env.SERVICE_INSTANCE_ID,
};
function SpeechSignModel() {
  const [start, setStart] = useState();
  const [instance, setInstance] = useState(null);

  return (
    <Grid container item gap={4}>
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
      <Grid container item justifyContent={"center"}>
        <Grid item xs={4}>
          {start ? (
            <Button variant="contained" onClick={() => setStart(false)}>
              Stop
            </Button>
          ) : (
            <Button variant="contained" onClick={() => setStart(true)}>
              SAY HELLO
            </Button>
          )}
        </Grid>
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
