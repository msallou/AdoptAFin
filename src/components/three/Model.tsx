import { useGLTF } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { useRef } from "react"
import { Group, Vector3, Quaternion, Euler } from "three"

useGLTF.preload("/koi_fish.glb")

export default function Model({ y } : { y: number }) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF("/koi_fish.glb")
  const { viewport, camera } = useThree()


  useFrame(() => {
    if (group.current) {
      const target = new Vector3(
        0,
        -(y/400.56788502 * viewport.height - 10) / 2, 
      ).applyMatrix4(camera.projectionMatrixInverse)

      const modelPos = group.current.position.clone()

      const direction = target.clone().sub(modelPos).normalize()

      const yaw = Math.atan2(direction.x, direction.z)
      const pitch = Math.asin(direction.y)

      const clampedPitch = Math.max(-Math.PI / 4, Math.min(Math.PI / 4, pitch))

      const lookAtQuaternion = new Quaternion().setFromEuler(new Euler(clampedPitch, yaw, 0))

      group.current.quaternion.slerp(lookAtQuaternion, .05)
    }
  })

  return (
    <group ref={group} scale={[1.2, 1.2, 1.2]}>
      {/* Render Fish */}
      <primitive object={scene} />
    </group>
  )
}