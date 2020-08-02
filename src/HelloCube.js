import React, { useState, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Canvas, useThree, extend, useFrame } from "react-three-fiber";
import { a, useSpring } from "react-spring/three";
import "./App.css";

// dont use any react animation with fiber/three
// useFrame is good for looping
// don't want to connect to state/hook b/c then the component would render 60x/sec
// combining three and react-three-fiber
extend({ OrbitControls });

function Cube(props) {
  const [isBig, setIsBig] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  // dont change react state in useFrame
  useFrame(() => {
    ref.current.rotation.y += props.speed;
    // ref.current.rotation.x += -0.01;
  });

  const { size, x } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    x: isBig ? 2 : 0,
  });

  const color = isHovered ? "orange" : "#9281D1";

  return (
    // rotation={[10, 10, 0]} = [x,y,z]
    // a is a react-spring wrapper
    <a.mesh
      ref={ref}
      {...props}
      scale={size}
      position-x={x}
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* args={[1,1,1]} = [width, height, depth] */}
      <boxBufferGeometry attach="geometry" args={[1, 2, 1]} />
      <meshStandardMaterial attach="material" color={color} />
    </a.mesh>
  );
}

function Scene() {
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <>
      <ambientLight />
      {/* intensity-> 0 to 1 */}
      <pointLight intensity={0.5} position={[-1, 2, 4]} />
      <Cube rotation={[10, 10, 10]} position={[1, 0, 0]} speed={0.05} />
      <Cube rotation={[10, 10, 0]} position={[-1, 0, 0]} speed={-0.05} />
      <orbitControls args={[camera, domElement]} />
    </>
  );
}

function App() {
  // react-three-fiber provides a camera through the canvas
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
}

export default App;
