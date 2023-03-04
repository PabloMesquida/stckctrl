import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";
import Login from "./Login.js";

export const Hero = () => {
  return (
    <div className="h-screen w-full flex flex-row">
      <div className="hidden  md:flex md:w-1/2">
        <Canvas
          className="w-full"
          camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [5, 3, -5],
          }}
        >
          <Experience />
        </Canvas>
      </div>
      <div className="flex justify-center items-center  w-full md:w-1/2 ">
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
};
