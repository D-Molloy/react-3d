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

  const { size, z } = useSpring({
    size: isBig ? [2, 2, 2] : [1, 1, 1],
    z: isBig ? -2 : 0,
  });

  const color = isHovered ? "orange" : "#9281D1";

  return (
    // rotation={[10, 10, 0]} = [x,y,z]
    // a is a react-spring wrapper
    <a.mesh
      {...props}
      ref={ref}
      scale={size}
      position-z={z}
      // receiving because cubes could block the light for the other spheres
      castShadow={true}
      receiveShadow={true}
      onClick={() => setIsBig(!isBig)}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {/* GEOMETRY TYPES */}
      {/*boxBufferGeometry -  a type of primitive*/}
      {/* buffer === more performant ->  Good for beginners*/}
      {/* boxGeometry is less performant than boxBufferGeometry */}
      {/* Primtive === basic shape */}
      {/* BOX args={[1,1,1]} = [width, height, depth] */}
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
      {/* SPHERE args={[1,1,1]} = (radius : Float, widthSegments : Integer, heightSegments : Integer, phiStart : Float, phiLength : Float, thetaStart : Float, thetaLength : Float) */}
      <sphereBufferGeometry attach="geometry" args={[1, 20, 20]} />
      {/* Circle args={[1,1]} = [radius, segments] */}
      {/* <circleBufferGeometry attach="geometry" args={[2, 32]} /> */}
      {/* Cone args:
          radius — Radius of the cone base. Default is 1.
          height — Height of the cone. Default is 1.
          radialSegments — Number of segmented faces around the circumference of the cone. Default is 8
          heightSegments — Number of rows of faces along the height of the cone. Default is 1. */}
      {/* <coneBufferGeometry attach="geometry" args={[1, 3, 20]} /> */}
      {/* TorusKnot args:
          radius - Radius of the torus. Default is 1.
          tube — Radius of the tube. Default is 0.4.
          tubularSegments — Default is 64.
          radialSegments — Default is 8.
          p — This value determines, how many times the geometry winds around its axis of rotational symmetry. Default is 2.
          q — This value determines, how many times the geometry winds around a circle in the interior of the torus. Default is 3.
      */}
      {/* <torusKnotBufferGeometry attach="geometry" args={[1, 0.4, 100, 100]} /> */}
      {/* MATERIALS */}
      {/* <meshStandardMaterial  attach="material" color={color} /> */}
      {/* <meshStandardMaterial
        roughness={0.5}
        // wireframe={true}
        metalness={0.5}
        attach="material"
        color={color}
      /> */}

      {/* <meshPhysicalMaterial
        roughness={0.5}
        metalness={0.5}
        clearcoat={1}
        attach="material"
        color={color}
      /> */}

      {/* MeshPhong - good for shiny surfaces  --- MeshLambert for not shiny*/}
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
  // meshes must can CAST and RECIEVE shadows, but in this case the plane is just going to receive the shadow
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
  const {
    camera,
    gl: { domElement },
  } = useThree();

  return (
    <>
      {/* 
      AmbientLight

        This light globally illuminates all objects in the scene equally.

        **** This light cannot be used to cast shadows as it does not have a direction. ****
    */}
      {/* ambient light color attribute-  // color="green"  will override the color set on the material */}
      <ambientLight />
      {/* intensity-> 0 to 1 */}
      {/* position={[x, y, z(pos towards screen, neg away)]} */}
      {/* point light - a single point emitted in ALL directions */}
      {/* <pointLight castShadow={true} intensity={0.6} position={[0, 3, 3]} /> */}
      {/* spotLight - a cone that gets bigger the further away it goes */}
      <spotLight castShadow={true} intensity={0.6} position={[2, 5, 4]} />
      <Cube rotation={[10, 10, 0]} position={[0, 0, 0]} speed={0.02} />
      <Cube rotation={[10, 20, 0]} position={[2, 2, 0]} speed={0.03} />
      {/* allow the user to spin/rotate scene */}
      <Plane />
      <orbitControls args={[camera, domElement]} />
    </>
  );
}

function App() {
  // react-three-fiber provides a camera through the canvas
  return (
    /**
     * SHADOWS (needs to be applied/registered with all involved)
     * shadowMap  -  castShadow  - recieveShadow
     */
    <Canvas shadowMap={true}>
      <Scene />
    </Canvas>
  );
}

export default App;
