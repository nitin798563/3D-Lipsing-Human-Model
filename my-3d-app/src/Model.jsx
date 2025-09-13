import React, { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

const FaceModel = forwardRef(function FaceModel({ modelPath = "/interviewer.glb" }, ref) {
  const gltf = useGLTF(modelPath);
  const morphIndexMap = useRef({});

  useEffect(() => {
    morphIndexMap.current = {};
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.morphTargetInfluences) {
        const dict = child.morphTargetDictionary || {};
        Object.entries(dict).forEach(([name, idx]) => {
          if (!morphIndexMap.current[name]) morphIndexMap.current[name] = [];
          morphIndexMap.current[name].push({ mesh: child, index: idx });
        });
      }
    });
  }, [gltf]);

  function setMorph(name, value) {
    const entries = morphIndexMap.current[name];
    if (!entries) return;
    entries.forEach(({ mesh, index }) => {
      mesh.morphTargetInfluences[index] = value;
    });
  }

  useImperativeHandle(ref, () => ({
    setMorph,
    resetAll: () => {
      Object.keys(morphIndexMap.current).forEach((name) => setMorph(name, 0));
    }
  }));

  // 👇 Add scale + position so model is visible
  return <primitive object={gltf.scene} scale={1.5} position={[0, -1, 0]} />;
});

export default FaceModel;