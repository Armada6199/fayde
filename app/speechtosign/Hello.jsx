import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function HelloModel(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/hello.glb");
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (props.start) actions["Armature|mixamo.com|Layer0"].play();
    actions;
  }, [props.start]);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Ch46"
            geometry={nodes.Ch46.geometry}
            material={materials.Ch46_body}
            skeleton={nodes.Ch46.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/hello.glb");
