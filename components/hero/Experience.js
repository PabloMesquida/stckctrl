import Box from "./BoxStck.js";
import Stckctrl from "./Stckctrl.js";
import Pallet from "./Pallet.js";
import Lights from "./Lights.js";
import {
  PresentationControls,
  Environment,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
} from "@react-three/drei";
import { Physics, Debug, RigidBody, CuboidCollider } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <Environment preset="city" />

      <Lights />

      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[0, 0]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
      >
        <Physics>
          {/* <Debug /> */}
          <group scale={0.2}>
            <Stckctrl rotation={[0, 0, 0]} />
            <RigidBody position={[0, 5, 9]} rotation={[0, -Math.PI / 2, 0]}>
              <Box receiveShadow castShadow />
              <CuboidCollider args={[0.5, 0.5, 0.5]} mass={2} restitution={0} />
            </RigidBody>
            {/* PALLET */}
            <RigidBody colliders="hull" type="fixed">
              <Pallet receiveShadow castShadow />
            </RigidBody>{" "}
            {/* FLOOR */}
            <RigidBody type="fixed" position={[0, 0, 0]}>
              <CuboidCollider
                args={[20, 0.1, 20]}
                position={[0, -2.35, 0]}
                restitution={0}
                friction={1}
              />
            </RigidBody>
          </group>
        </Physics>
      </PresentationControls>
    </>
  );
}
