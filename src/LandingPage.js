import React, { Suspense, useRef } from "react";
import { OrbitControls } from "drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useLoader, useFrame } from "react-three-fiber";

import "./App.css";

function Plant() {
	const ref = useRef();

	const gltf = useLoader(GLTFLoader, "./scene.gltf");
	useFrame(() => {
		ref.current.rotation.y += 0.01;
	});
	return <primitive ref={ref} object={gltf.scene} position={[0, -1.2, 0]} />;
}

function Scene() {
	return (
		<>
			<ambientLight />
			<pointLight intensity={1} position={[-2, 5, 4]} />
			<Suspense fallback={null}>
				<Plant />
			</Suspense>
			{/* Commented out to prevent user's from moving/scrolling the plant */}
			{/* <OrbitControls /> */}
		</>
	);
}

function App() {
	return (
		<>
			<h1>Plants 'r Us</h1>
			{/* additional styles in App.css */}
			<Canvas style={{ height: "40vh" }} camera={{ position: [0, 0, 2] }}>
				<Scene />
			</Canvas>
			<main>
				<h3>So great, you'll want one of your own!</h3>
				<button>Buy Now</button>
			</main>
		</>
	);
}

export default App;
