import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import Stats from 'three/examples/jsm/libs/stats.module'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x333333)
const lightDirectional = new THREE.DirectionalLight(0xffffff, 1)
lightDirectional.position.set(5,5,5)
scene.add(lightDirectional)

// Tetrahedron
const tetraGeom = new THREE.TetrahedronGeometry(0.5, 0)
tetraGeom.computeVertexNormals()
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: false
})

const tetrahedron = new THREE.Mesh(tetraGeom, material)
tetrahedron.position.set(-2, 0, -2)
scene.add(tetrahedron)

// TorusKnot

const torusKnotGeom = new THREE.TorusKnotGeometry(0.2, 0.07, 64, 8);
torusKnotGeom.computeVertexNormals()
const torusMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000ff,
    wireframe: false
})

const torusKnot = new THREE.Mesh(torusKnotGeom, torusMaterial)
torusKnot.position.set(2, 0, -2)
scene.add(torusKnot);

// Sphere

const sphereGeom = new THREE.SphereGeometry(0.5, 16, 8);
sphereGeom.computeVertexNormals()
const sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: false
})

const sphere = new THREE.Mesh(sphereGeom, sphereMaterial);
sphere.position.set(-2, 0, 2)
scene.add(sphere);

// Dodecahedron

const dodecaGeom = new THREE.DodecahedronGeometry(0.5, 0);
dodecaGeom.computeVertexNormals()
const dodecaMaterial = new THREE.MeshLambertMaterial({
    color: 0xff8800,
    wireframe: false
})

const dodecahedron = new THREE.Mesh(dodecaGeom, dodecaMaterial);
dodecahedron.position.set(2, 0, 2)
scene.add(dodecahedron);


// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


const stats = Stats()
document.body.appendChild(stats.dom)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 4
camera.position.z = 0
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const rotatePolygon = (object) => {
    object.rotation.y += 0.025
    object.rotation.x += 0.0025
    object.rotation.z += 0.00025
}

const tick = () => {

    stats.update()

    const elapsedTime = clock.getElapsedTime()

    // Update Orbital Controls
    controls.update()

    rotatePolygon(tetrahedron)
    rotatePolygon(torusKnot)
    rotatePolygon(sphere)
    rotatePolygon(dodecahedron)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()