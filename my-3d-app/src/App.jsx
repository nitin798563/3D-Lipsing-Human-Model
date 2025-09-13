import React, { useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import FaceModel from "./Model";
import { visemeMap } from "./visemeMap";

export default function App() {
  const modelRef = useRef(null);

  // 👇 Add state
  const [modelLoaded, setModelLoaded] = useState(false);

  function speakWithVisemes(text) {
    if (!("speechSynthesis" in window)) {
      alert("Speech Synthesis not supported.");
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 1;

    let i = 0;
    utter.onboundary = () => {
      const char = text[i]?.toUpperCase();
      const viseme = visemeMap[char] || "UNK";

      if (modelRef.current) {
        modelRef.current.resetAll();
        modelRef.current.setMorph(viseme, 1);
      }
      i++;
    };

    utter.onend = () => {
      if (modelRef.current) modelRef.current.resetAll();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1, position: "relative" }}>
        {/* Loading UI */}
        {!modelLoaded && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              zIndex: 10,
            }}
          >
            Loading model...
          </div>
        )}

        <Canvas camera={{ position: [0, 1.2, 3], fov: 50 }}>
          <color attach="background" args={["#222"]} />
          <ambientLight intensity={0.4} />
          <directionalLight intensity={1} position={[5, 5, 5]} />

          <Suspense fallback={null}>
            <FaceModel
              ref={modelRef}
              modelPath="/interviewer1.glb"
              // 👇 When model loads, update state
              onLoad={() => setModelLoaded(true)}
            />
            <Environment preset="studio" />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>

      <div style={{ width: 350, padding: 20, background: "#f7f7f7" }}>
        <h2>Face Lipsync (Vite)</h2>
        <TTSPanel onSpeak={speakWithVisemes} />
      </div>
    </div>
  );
}

function TTSPanel({ onSpeak }) {
  const [text, setText] = useState("Hello friend, how are you?");

  return (
    <div>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%" }}
      />
      <button onClick={() => onSpeak(text)}>Speak & Animate</button>
    </div>
  );
}