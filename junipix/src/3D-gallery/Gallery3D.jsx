import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Loader } from "@react-three/drei";
import * as THREE from "three";
import Artpiece from "./Artpiece.jsx";
import artpieceData from "./artpieces.json";
import concreteTexture from "./images/floor.jpg";

export default function Gallery3D() {
  const wallWidth = 30;
  const wallHeight = 10;
  const frontBackWallDepth = 0.1;
  const sideWallDepth = 0.1;
  const artpieceSpacing = 1.0;

  const [textureLoaded, setTextureLoaded] = useState(false);
  const [concreteTextureObj, setConcreteTextureObj] = useState(null);

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      concreteTexture,
      (texture) => {
        setConcreteTextureObj(texture);
        setTextureLoaded(true);
      },
      undefined,
      (err) => {
        console.error("Error loading texture :", err);
      }
    );
  }, []);

  const calculateArtpieceDimensions = (depth) => {
    const wallWidthPercentage = 0.6;
    const wallHeightPercentage = 0.6;
    let artpieceWidth, artpieceHeight;

    if (depth === frontBackWallDepth) {
      artpieceWidth = wallWidth * wallWidthPercentage;
      artpieceHeight = wallHeight * wallHeightPercentage;
    } else {
      artpieceWidth = (wallWidth * wallWidthPercentage) / 2;
      artpieceHeight = wallHeight * wallHeightPercentage;
    }

    return { artpieceWidth, artpieceHeight };
  };

  const artpiecePlacements = [
    {
      position: [0, 0, wallWidth / 2 - frontBackWallDepth / 2],
      rotation: [0, 0, 0],
    },
    {
      position: [0, 0, -wallWidth / 2 + frontBackWallDepth / 2],
      rotation: [0, Math.PI, 0],
    },
    {
      position: [
        -wallWidth / 2.1 - artpieceSpacing / 2,
        0,
        wallWidth / 4 - sideWallDepth / 2,
      ],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      position: [
        wallWidth / 2.1 + artpieceSpacing / 2,
        0,
        wallWidth / 4 - sideWallDepth / 2,
      ],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      position: [
        -wallWidth / 2.1 - artpieceSpacing / 2,
        0,
        -wallWidth / 4 + sideWallDepth / 2,
      ],
      rotation: [0, -Math.PI / 2, 0],
    },
    {
      position: [
        wallWidth / 2.1 + artpieceSpacing / 2,
        0,
        -wallWidth / 4 + sideWallDepth / 2,
      ],
      rotation: [0, -Math.PI / 2, 0],
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Canvas style={{ width: "100%", height: "100%" }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls />
        <Loader />

        <mesh position={[0, 0, -wallWidth / 2]} receiveShadow>
          <boxGeometry args={[wallWidth, wallHeight, frontBackWallDepth]} />
          <meshBasicMaterial color={new THREE.Color("white")} />
        </mesh>

        <mesh position={[0, 0, wallWidth / 2]} receiveShadow>
          <boxGeometry args={[wallWidth, wallHeight, frontBackWallDepth]} />
          <meshBasicMaterial color={new THREE.Color("white")} />
        </mesh>

        <mesh
          position={[-wallWidth / 2, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <boxGeometry args={[wallWidth, wallHeight, sideWallDepth]} />
          <meshBasicMaterial color={new THREE.Color("white")} />
        </mesh>

        <mesh
          position={[wallWidth / 2, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          receiveShadow
        >
          <boxGeometry args={[wallWidth, wallHeight, sideWallDepth]} />
          <meshBasicMaterial color={new THREE.Color("white")} />
        </mesh>

        {textureLoaded && concreteTextureObj && (
          <mesh
            position={[0, -wallHeight / 2, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <boxGeometry args={[wallWidth, wallWidth, 0.1]} />
            <meshBasicMaterial map={concreteTextureObj} />
          </mesh>
        )}

        <group>
          {artpieceData.map((texture, index) => {
            const { artpieceWidth, artpieceHeight } =
              calculateArtpieceDimensions(
                artpiecePlacements[index].position[2]
              );
            return (
              <Artpiece
                key={index}
                position={artpiecePlacements[index].position}
                rotation={artpiecePlacements[index].rotation}
                scale={[artpieceWidth, artpieceHeight, 0.1]}
                texture={texture.texture}
              />
            );
          })}
        </group>
      </Canvas>
    </div>
  );
}
