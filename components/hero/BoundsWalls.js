import React from "react";
import { RigidBody, CuboidCollider } from "@react-three/rapier";

const BoundsWalls = () => {
  return (
    <>
      <RigidBody type="fixed" position={[0, 0, -12]}>
        <CuboidCollider
          args={[5, 5, 1]}
          position={[0, 0, 0]}
          restitution={0}
          friction={0}
        />
      </RigidBody>
      <RigidBody type="fixed" position={[-12, 0, 0]}>
        <CuboidCollider
          args={[1, 5, 5]}
          position={[0, 0, 0]}
          restitution={0}
          friction={0}
        />
      </RigidBody>
      <RigidBody type="fixed" position={[12, 0, 0]}>
        <CuboidCollider
          args={[1, 5, 5]}
          position={[0, 0, 0]}
          restitution={0}
          friction={0}
        />
      </RigidBody>
    </>
  );
};

export default BoundsWalls;
