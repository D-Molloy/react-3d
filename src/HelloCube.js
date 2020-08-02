import React from "react";
import { Canvas } from "react-three-fiber";
import "./App.css";

function Cube() {
  return (
    // rotation={[10, 10, 0]} = [x,y,z]
    <mesh rotation={[10, 10, 0]} position={[0, 0, 0]}>
      {/* args={[1,1,1]} = [width, height, depth] */}
      <boxBufferGeometry attach="geometry" args={[4, 4, 1]} />
      <meshStandardMaterial attach="material" color="#9281D1" />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight />
      {/* intensity-> 0 to 1 */}
      <pointLight intensity={0.5} position={[-1, 2, 4]} />
      <Cube />
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
