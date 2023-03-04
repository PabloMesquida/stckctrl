import { useTheme } from "next-themes";

export default function Lights() {
  const { theme } = useTheme();
  const ambientIntensity = theme === "dark" ? 0 : 1;
  const directionalIntensity = theme === "dark" ? 1 : 1.5;

  return (
    <>
      <directionalLight
        castShadow
        position={[4, 4, 1]}
        intensity={directionalIntensity}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={20}
        shadow-camera-top={20}
        shadow-camera-right={20}
        shadow-camera-bottom={-20}
        shadow-camera-left={-20}
      />
      <ambientLight intensity={ambientIntensity} />
    </>
  );
}
