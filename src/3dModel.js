import React, { Suspense } from "react";
import { OrbitControls } from "drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader } from "react-three-fiber";

import "./App.css";

// Three uses GLTF JSON files to hold a lot of 3d data
// // SketchFab offers some free models: https://sketchfab.com/3d-models/indoorflower-241421729f38400cad10e6905bbb0de5
function Plant() {
	// const ref = useRef();
	// useLoader params  - what type of loader, path to scene
	const gltf = useLoader(GLTFLoader, "./scene.gltf");

	return <primitive object={gltf.scene} position={[0, -2, 0]} />;
}

function Scene() {
	return (
		<>
			<ambientLight />
			<pointLight intensity={0.6} position={[0, 5, 4]} />
			<Suspense fallback={null}>
				<Plant />
			</Suspense>
			<OrbitControls />
		</>
	);
}

function App() {
	return (
		<>
			<Canvas
				camera={{
					position: [0, 0, 5],
					// has to do with the frustum (the area the view of the camera covers (like a pyramid))
					near: 1,
					far: 40,
				}}
			>
				<Scene />
			</Canvas>
		</>
	);
}

export default App;
