import * as THREE from "three"
import React, { useState, useRef, useEffect } from "react";
import { OrbitControls } from "drei";
import { Canvas, useFrame } from "react-three-fiber";


import "./App.css";

/**
 * Instance Mesh  -  allows to define a lot of different geometry inside of a mesh instead of a single geometry in the standard mesh
 * - used for particle effects
 */

const tempObject = new THREE.Object3D()
function Boxes() {
	const ref = useRef()


	useFrame((state) => {
		// Rotate the cube



		// state.clock is a 3js property
		const time = state.clock.getElapsedTime()
		// Math.sin(time/1) results in a fluctuating number between 1 and -1
		// console.log('time', Math.sin(time / 1))
		const grow = Math.sin(time / 1)
		ref.current.rotation.y += grow * .001;
		ref.current.rotation.x += grow * .001;
		let i = 0;
		for (let x = 0; x < 10; x++) {
			for (let y = 0; y < 10; y++) {
				for (let z = 0; z < 10; z++) {
					const id = i++
					// creating a 3D space grid of tempObjects (the 5 in this case is offsetting everything)
					// tempObject.position.set(x *3, y *3, z*3)
					// this is the boxes positioning in 3d space (when x is 5, the position is 0)
					// to center the cube, make the number below(10) half the number of iterations (20)
					tempObject.position.set(5 - x * grow, 5 - y * grow, 5 - z * grow)
					tempObject.updateMatrix();
					// ref to the instanceMesh
					ref.current.setMatrixAt(id, tempObject.matrix)
				}
			}
		}

		// every frame, update the instanceMesh
		ref.current.instanceMatrix.needsUpdate = true
	})

	// useFrame(() => {
	// 	ref.current.rotation.y += .005;
	// 	ref.current.rotation.x += .005;
	// });

	return (
		// instancedMesh often used for particle effects
		// args [geometry(bufferGeometry), material, count]
		<instancedMesh ref={ref} args={[null, null, 8000]}>
			<boxBufferGeometry attach="geometry" args={[0.8, 0.8, 0.8]} />
			<meshPhongMaterial attach="material" color="teal" />
		</instancedMesh>
	)
}


function Scene() {
	return (
		<>
			<ambientLight />
			<pointLight intensity={0.6} position={[0, 10, 4]} />
			<Boxes rotation={.05} />
			<OrbitControls />
		</>
	);
}

function App() {
	return (
		<>
			<Canvas
				camera={
					{
						position: [0, 0, 15],
						// has to do with the frustum (the area the view of the camera covers (like a pyramid))
						near: 1,
						far: 40
					}
				}
			>
				<Scene />
			</Canvas>
		</>
	);
}

export default App;
