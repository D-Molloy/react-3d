import React, { useState, useRef } from "react";
import { OrbitControls, Torus } from "drei";
import { Canvas, useFrame } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";
import { Controls, useControl } from "react-three-gui";
import "./App.css";

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  useFrame(() => {
    ref.current.rotation.y += props.speed;
  });

  const { size, z } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    z: isBig ? -2 : 0,
  });

  const color = isHovered ? "orange" : "#9281D1";

  return (
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-z={z}
      castShadow={true}
      receiveShadow={true}
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <sphereBufferGeometry attach="geometry" args={[1, 20, 20]} />
      <meshPhongMaterial
        flatShading={true}
        roughness={1}
        metalness={0.5}
        shininess={100}
        attach="material"
        color={color}
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
  // react-three-gui controls are for
  //   type allows for a specific type of input
  const positionX = useControl("Pos. X", { type: "number", max: 5, min: -5 });
  //   Rotation - xypad is currently broken
  //   const { x, y } = useControl("Rot. X", { type: "xypad" });
  const positionY = useControl("Pos. Y ", { type: "number" });
  const positionZ = useControl("Pos. Z", { type: "number" });
  const torusColor = useControl("Torus Color", {
    type: "color",
    value: "gold",
  });
  return (
    <>
      <ambientLight />
      <spotLight castShadow={true} intensity={0.6} position={[2, 5, 4]} />
      <Cube
        rotation={[10, 10, 0]}
        position={[positionX, positionY, positionZ]}
        speed={0.02}
      />
      <Cube rotation={[10, 0, 0]} position={[2, 2, 0]} speed={-0.03} />
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
          flatShading={true}
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
