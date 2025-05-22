"use client" 

import dynamic from "next/dynamic"
import { useState } from "react";

const Scene = dynamic(() => import("@/components/three/Scene"), { ssr: false })

export default function Home() {
  const [y, setY] = useState(0);
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setY(e.clientY - rect.top);

  };

  return (
    <main className="h-screen flex justify-end bg-white " onMouseMove={onMouseMove}>
      <div className="w-full h-full text-black flex " >
        <div className="w-full flex flex-col gap-8 lgmax:px-20">
          {[1,1,1,1,1,1,1,11,1,,1,1,1,1,1,1].map((_, i) => (
            <h1 key={i} className="text-5xl">HII</h1>
          ))}
        </div>
        <div className="w-[50%]">
          <Scene y={y} />
        </div>
      </div>
    </main>
  )
}