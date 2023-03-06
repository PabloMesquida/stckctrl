/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 box.glb --shadows
*/

import React, { useState, useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody, CuboidCollider, Debug } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";

export default function Model({ type }) {
  const [active, setActive] = useState(true);
  const { nodes, materials } = useGLTF("/models/box.glb");

  useEffect(() => {
    console.log("isVisible:", active);
  }, [active]);

  //if (!active) return null;

  const body = useRef();

  const impulseForce = 0.45; //0.83
  const center = 0.25; // -0.05

  useFrame(() => {
    const bodyPosition = body.current.translation();

    if (bodyPosition.y < 0.08 && bodyPosition.z > center) {
      body.current.applyImpulse({ x: 0, y: 0, z: -impulseForce });
    } else if (bodyPosition.z < center) {
      type === 0 && body.current.applyImpulse({ x: 0, y: 0, z: -impulseForce });
      type === 1 && body.current.applyImpulse({ x: impulseForce, y: 0, z: 0 });
      type === 2 && body.current.applyImpulse({ x: -impulseForce, y: 0, z: 0 });
    }

    if (bodyPosition.x > 2) {
      setActive(false);
    }
    if (bodyPosition.x < -2) {
      setActive(false);
    }
    if (bodyPosition.z < -2) {
      setActive(false);
    }

    //console.log(bodyPosition);
  });

  return (
    <>
      <group visible={active}>
        <RigidBody
          position={[0, 10, 9]}
          rotation={[0, -Math.PI / 2, 0]}
          ref={body}
          mass={1}
          restitution={0}
        >
          <group dispose={null}>
            <mesh
              visible={type === 0}
              castShadow
              receiveShadow
              geometry={nodes.Simbol_01.geometry}
              material={materials.SimbolMaterial01}
              scale={[0.45, 0.45, 1.05]}
            />

            <mesh
              visible={type === 1}
              castShadow
              receiveShadow
              geometry={nodes.Simbol_02.geometry}
              material={materials.SimbolMaterial02}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[0.45, 1.05, 0.45]}
            />

            <mesh
              visible={type === 2}
              castShadow
              receiveShadow
              geometry={nodes.Simbol_03.geometry}
              material={materials.SimbolMaterial03}
              rotation={[Math.PI / 2, 0, 0]}
              scale={[0.5, 1.05, 0.5]}
            />

            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube.geometry}
              material={materials.BoxMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_1.geometry}
              material={materials.LabelMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_2.geometry}
              material={materials.ZipMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_3.geometry}
              material={materials.CornerMaterial}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_4.geometry}
              material={materials.InfoMaterial}
            />
            <CuboidCollider
              args={[0.5, 0.5, 0.5]}
              restitution={0}
              friction={0.1}
            />
          </group>
        </RigidBody>
      </group>
    </>
  );
}
