import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

export default function Artpiece({ position, rotation, scale, texture }) {
  const textureMap = useLoader(THREE.TextureLoader, texture);
  return (
    <mesh position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshBasicMaterial map={textureMap} />
    </mesh>
  );
}
