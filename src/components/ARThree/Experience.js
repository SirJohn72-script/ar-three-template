import * as THREE from "three"
import { ARButton } from "three/examples/jsm/webxr/ARButton"

/**Clas para la construccion de la experiencia Aumented Reallity */
class ARExperience {
  constructor() {
    //create the element
    this.container = document.createElement("div")

    //camera
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.set(0, 1, 8)
    this.scene = new THREE.Scene()

    //renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight
    )
    this.container.appendChild(this.renderer.domElement)

    //initial box
    const geometry = new THREE.BoxBufferGeometry(
      0.2,
      0.2,
      0.2
    )

    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    })

    this.mesh = new THREE.Mesh(geometry, material)
    this.scene.add(this.mesh)

    //resize
    window.addEventListener(
      "resize",
      this.resize.bind(this)
    )
  }

  initScene() {
    document
      .querySelector(".container3D")
      .appendChild(this.container)
  }

  setupARExperience() {
    this.renderer.xr.enabled = true

    let controller = this.renderer.xr.getController(0)
    this.scene.add(controller)

    //tracking all the elements in the scene
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.position
          .set(0, 0, -0.8)
          .applyMatrix4(controller.matrixWorld)
        child.quaternion.setFromRotationMatrix(
          controller.matrixWorld
        )
      }
    })
    this.container.appendChild(
      ARButton.createButton(this.renderer)
    )

    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  resize() {
    const { clientWidth: width, clientHeight: height } =
      document.querySelector(".container3D")
    this.renderer.setSize(width, height)
    this.camera.updateProjectionMatrix()
    this.camera.aspect = width / height
  }

  render() {
    this.renderer.render(this.scene, this.camera)
  }

  cleapUp() {
    this.scene.dispose()
    const container = document.querySelector(".container3D")
    let child = container.lastElementChild
    while (child) {
      container.removeChild(child)
      child = container.lastElementChild
    }
  }
}

export { ARExperience }
