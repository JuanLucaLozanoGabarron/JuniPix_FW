import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Artpiece({ position, rotation, scale, texture }) {
  const meshRef = useRef();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load(texture, (tex) => {
      if (meshRef.current) {
        meshRef.current.material.map = tex;
        meshRef.current.material.needsUpdate = true;
      }
    });
  }, [texture]);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 0.1]} />
      <meshBasicMaterial map={null} color={"white"} />
    </mesh>
  );
}
