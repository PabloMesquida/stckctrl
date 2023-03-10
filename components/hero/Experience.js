import { Environment, Text3D } from "@react-three/drei";
import { Physics, Debug, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useEffect, useState } from "react";
import BoxModel from "./BoxStck.js";
import Stckctrl from "./Stckctrl.js";
import Pallet from "./Pallet.js";
import Lights from "./Lights.js";
import BoundsWalls from "./BoundsWalls.js";
import Areas from "./Areas.js";

export default function Experience() {
  const [instances, setInstances] = useState([]);
  const [isAreaActive, setIsAreaActive] = useState({
    circle: false,
    square: false,
    triangle: false,
  });

  const [isLightActive, setIsLightActive] = useState({
    circle: false,
    square: false,
    triangle: false,
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setInstances((prev) => [
        ...prev,
        {
          position: [0, 15, 9],
          rotation: [0, -Math.PI / 2, 0],
          type: Math.floor(Math.random() * 3),
        },
      ]);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Environment preset="city" />

      <Lights />

      <Physics>
        {/* <Debug /> */}
        <group scale={0.2}>
          <Text3D
            font="./fonts/Geo_Regular.json"
            rotation={[0, -Math.PI, 0]}
            position={[3.5, 2.9, -3.9]}
            size={0.75}
          >
            stckctrl
            <meshStandardMaterial />
          </Text3D>
          <Stckctrl rotation={[0, 0, 0]} isLightActive={isLightActive} />
          {instances.map((instance, i) => (
            <BoxModel
              key={i}
              type={instance.type}
              setIsAreaActive={setIsAreaActive}
              setIsLightActive={setIsLightActive}
            />
          ))}
          {/* PALLET */}
          <RigidBody
            colliders="hull"
            type="fixed"
            restitution={0}
            friction={0.2}
          >
            <Pallet receiveShadow castShadow />
          </RigidBody>
          {/* FLOOR */}
          <RigidBody type="fixed" position={[0, 0, 0]}>
            <CuboidCollider
              args={[20, 0.1, 20]}
              position={[0, -2.35, 0]}
              restitution={0}
              friction={0}
            />
          </RigidBody>
          <BoundsWalls />
          <Areas isAreaActive={isAreaActive} />
        </group>
      </Physics>
      {/* </PresentationControls> */}
    </>
  );
}
