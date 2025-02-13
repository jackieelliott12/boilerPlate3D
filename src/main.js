import './style.css'
import * as THREE from 'three'
import {
	addBoilerPlateMeshes,
	addStandardMesh,
	addTexturedMesh,
} from './addDefaultMeshes'
import { addLight } from './addDefaultLights'

const renderer = new THREE.WebGLRenderer({ antialias: true })
const clock = new THREE.Clock()

//This is our default camera the perspective camera that imitates real life dimensions and proportions, just to recap the 4 parameters we pass in are: (Field of View, Aspect Ratio, Near Frustum, Far Frustum) aka (how wide can we see, what is the proportions of our screen, how close can our camera see, how far can our camera see)
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	100
)

const meshes = {}

const lights = {}

const scene = new THREE.Scene()

init()
function init() {
	renderer.setSize(window.innerWidth, window.innerHeight)
	document.body.appendChild(renderer.domElement)

	meshes.default = addBoilerPlateMeshes()
	meshes.standard = addStandardMesh()
	meshes.physical = addTexturedMesh()

	lights.default = addLight()

	scene.add(lights.default)
	scene.add(meshes.default)
	scene.add(meshes.standard)
	scene.add(meshes.physical)
	console.log(meshes.physical.material.displacementScale)

	camera.position.set(0, 0, 5)
	resize()
	animate()
}

function resize() {
	window.addEventListener('resize', () => {
		renderer.setSize(window.innerWidth, window.innerHeight)
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
	})
}

function animate() {
	const tick = clock.getElapsedTime()

	requestAnimationFrame(animate)

	meshes.physical.rotation.y += 0.01
	meshes.physical.material.displacementScale = Math.sin(tick)

	meshes.default.rotation.x += 0.01
	meshes.default.rotation.y -= 0.01
	meshes.default.rotation.z -= 0.02

	meshes.standard.rotation.x += 0.01
	meshes.standard.rotation.y += 0.02
	meshes.standard.rotation.z -= 0.012

	renderer.render(scene, camera)
}
