"use client"

import { Canvas,
  //  useFrame, useThree

 } from "@react-three/fiber"
import Model from "./Model"
import { Suspense } from "react"
import { useProgress, Html, 
  // CameraControls 
} from "@react-three/drei"
// import { Vector3 } from "three"

function Loader() {
  const { progress } = useProgress()

  return <Html center>{progress.toFixed(1)} % loaded</Html>
}

// function Rig() {
//   const { camera, mouse } = useThree()
//   const vec = new Vector3()

//   return useFrame(() => {
//     camera.position.lerp(vec.set(mouse.x, mouse.y, camera.position.z), .01)
//     camera.lookAt(0, 0, 0)
//   })
// }

export default function Scene({y} : {y: number}) {
  return (
    <Canvas
      // flat
    camera={{ position: [0, 0, -30], fov: 15, near: 1, far: 200 }}
    className="w-full"
    >
       {/* <CameraControls dollySpeed={0} /> */}
       {/* <Rig /> */}

      <ambientLight intensity={0.1} />
      {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />  */}
      <directionalLight position={[0, 5, -5]} intensity={3} color={"#bbede1"}/>
      <directionalLight position={[0, 5, -5]} intensity={10} color={"#198a7b"}/>
      <Suspense fallback={<Loader />}>
        <Model y={y} />
      </Suspense>
    </Canvas>
  )
}