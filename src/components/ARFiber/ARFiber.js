import {
  ARCanvas,
  DefaultXRControllers,
} from "@react-three/xr"

const ARComponents = () => {
  return (
    <div>
      <div
        className="container3D"
        style={{ width: "100%", height: "100vh" }}
      >
        <ARCanvas vr="true">
          <mesh position={[0, 0, -0.5]}>
            <boxBufferGeometry args={[0.09, 0.09, 0.09]} />
            <meshBasicMaterial color={"#ff0000"} />
          </mesh>

          <DefaultXRControllers />
        </ARCanvas>
      </div>
    </div>
  )
}

export default ARComponents
