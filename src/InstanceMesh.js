import React, { useState, useRef, Suspense } from "react";
import { OrbitControls, Torus } from "drei";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";
import { Controls, useControl } from "react-three-gui";
import { TextureLoader } from "three";
import "./App.css";
// import joeImg from "./img/JOE.png";
// import denisImg from "./img/DENIS.png";
import logoImg from "./img/logo.png"
// commented out because the logo border messed up the displacement map
// import logoBump from "./img/logo2.png"
import logoDispMap from "./img/logoDisp.png"
// Bumpmaps imgs should ALWAYS be black and white && seamless
// import snakeBumpMap from "./img/bump.jpg"

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  const texture = useLoader(TextureLoader, props.img);
  const bump = useLoader(TextureLoader, props.bump);

  useFrame(() => {
    ref.current.rotation.y += props.speed;
  });

  const { size, z } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    z: isBig ? -2 : 0,
  });

  //   const color = isHovered ? "orange" : "#9281D1";

  return (
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-z={z}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setIsBig(!isBig)}
    // onPointerOver={() => setIsHovered(true)}
    // onPointerOut={() => setIsHovered(false)}
    >
      {/* Prior to displacement map*/}
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}

      <boxBufferGeometry attach="geometry" args={[1, 1, 1, 40, 40, 40]} />
      {/* <cylinderBufferGeometry attach="geometry" args={[1, 1, 3, 30]} /> */}
      <meshPhongMaterial
        map={texture}
        // color="teal"
        // duplicating map/bumpmap will have an embossing effect (doesn't look good on images)
        // can use alpha 
        // bumpMap={bump}
        displacementMap={bump}
        // How far thing protrude
        displacementScale={0.06}
        flatShading={true}
        roughness={1}
        metalness={0.5}
        shininess={100}
        attach="material"
      />
    </a.mesh>
  );
}

function Plane() {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -2, -5]}
    >
      <planeBufferGeometry attach="geometry" args={[20, 30]} />
      <meshPhongMaterial attach="material" color="#D3D3D3" />
    </mesh>
  );
}

function Scene() {
  // JOE CONTROLS
  // react-three-gui controls are for
  //   type allows for a specific type of input
  const positionX = useControl("Pos. X", { type: "number", max: 5, min: -5 });
  //   Rotation - xypad is currently broken
  //   const { x, y } = useControl("Rot. X", { type: "xypad" });
  const positionY = useControl("Pos. Y ", { type: "number", max: 5, min: -5 });
  const positionZ = useControl("Pos. Z", { type: "number", max: 5, min: -5 });
  const torusColor = useControl("Torus Color", {
    type: "color",
    value: "gold",
  });

  //   DENIS CONTROLS
  const rotationX = useControl("Rot. X", { type: "number", max: 5, min: -5 });
  //   Rotation - xypad is currently broken
  //   const { x, y } = useControl("Rot. X", { type: "xypad" });
  const rotationY = useControl("Rot. Y ", { type: "number", max: 5, min: -5 });
  const rotationZ = useControl("Rot. Z", { type: "number", max: 5, min: -5 });

  return (
    <>
      <ambientLight />
      <spotLight castShadow={true} intensity={0.6} position={[2, 5, 4]} />
      <Suspense fallback={null}>
        <Cube
          rotation={[rotationX, rotationY, rotationZ]}
          position={[positionX, positionY, positionZ]}
          speed={0.02}
          img={logoImg}
          bump={logoDispMap}
        />
      </Suspense>
      <Suspense fallback={null}>
        <Cube
          rotation={[0, 0, 0]}
          position={[2, 2, 0]}
          speed={0.02}
          img={logoImg}
          bump={logoDispMap}
        />
      </Suspense>
      {/* Commented out to avoid bumping my img  */}
      {/* <Suspense fallback={null}>
        <Cube
          rotation={[0, 0, 0]}
          position={[2, 2, 0]}
          speed={-0.03}
          img={denisImg}
        />
      </Suspense> */}
      {/*   radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
            tube — Radius of the tube. Default is 0.4.
            radialSegments — Default is 8
            tubularSegments — Default is 6.
            arc — Central angle. Default is Math.PI * 2.  */}
      <Torus
        position={[-3, 1, 0]}
        args={[1, 0.2, 10, 30]}
        rotation={[0, 10, 0]}
        castShadow={true}
        receiveShadow={true}
      >
        <meshPhongMaterial
          roughness={0.5}
          metalness={1}
          shininess={100}
          attach="material"
          color={torusColor}
        />
      </Torus>
      <Plane />
      <OrbitControls />
    </>
  );
}

function App() {
  return (
    <>
      <Canvas shadowMap={true}>
        <Scene />
      </Canvas>
      <Controls />
    </>
  );
}

export default App;
