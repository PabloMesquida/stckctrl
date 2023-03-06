import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const Areas = ({ isAreaActive }) => {
  const circleRef = useRef();
  const triangleRef = useRef();
  const squareRef = useRef();

  useFrame(() => {
    isAreaActive.circle
      ? circleRef.current.material.color.set("yellow")
      : circleRef.current.material.color.set("red");
    isAreaActive.triangle
      ? triangleRef.current.material.color.set("yellow")
      : triangleRef.current.material.color.set("red");
    isAreaActive.square
      ? squareRef.current.material.color.set("yellow")
      : squareRef.current.material.color.set("red");
  });

  return (
    <>
      <mesh
        ref={circleRef}
        position={[10.5, -2.4, -0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <ringBufferGeometry args={[2, 1, 32]} />
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        ref={triangleRef}
        position={[-10, -2.4, -0.5]}
        rotation={[-Math.PI / 2, 0, Math.PI]}
        receiveShadow
      >
        <ringBufferGeometry args={[2, 1, 3]} />
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <mesh
        ref={squareRef}
        position={[0, -2.4, -9.5]}
        rotation={[-Math.PI / 2, 0, Math.PI / 4]}
        receiveShadow
      >
        <ringBufferGeometry args={[2, 1, 4]} />
        <meshStandardMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
};

export default Areas;
