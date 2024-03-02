"use client";
import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default function Model2Hello({ ...props }) {
  const group = useRef();
  //   const { nodes, materials, animations } = GLTFLoader("./hello.glb");
  //   const { actions } = useAnimations(animations, group);
  const gltf = useLoader(GLTFLoader, "./hello.glb");
  useEffect(() => {
    actions["Armature|mixamo.com|Layer0"].play();
  });
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {/* <skinnedMesh
            name="Ch46"
            geometry={nodes.Ch46.geometry}
            material={materials.Ch46_body}
            skeleton={nodes.Ch46.skeleton}
          /> */}
          <primitive object={gltf.scene} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./hello.glb");
