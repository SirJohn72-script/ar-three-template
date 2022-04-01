import { useEffect } from "react"
import { ARExperience } from "./Experience"

const ARThree = () => {
  useEffect(() => {
    const arExperience = new ARExperience()
    arExperience.initScene()
    arExperience.setupARExperience()

    return () => {
      arExperience.cleapUp()
    }
  }, [])
  return (
    <div
      className="container3D"
      style={{ width: "100%", height: "100vh" }}
    ></div>
  )
}

export default ARThree
