import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.js";
import Login from "./Login.js";
import stylesHero from "@/styles/Hero.module.css";

THREE.ColorManagement.enabled = true;

export const Hero = () => {
  return (
    <div className={stylesHero.hero_container}>
      <div className={stylesHero.hero_col1}>
        <Canvas
          className="w-full"
          camera={{
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [5, 3.2, -5],
          }}
        >
          <Experience />
        </Canvas>
      </div>
      <div className={stylesHero.hero_col2}>
        <div>
          <Login />
        </div>
      </div>
    </div>
  );
};
