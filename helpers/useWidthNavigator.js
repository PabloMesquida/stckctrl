import { useState, useEffect } from "react";

export function useWidthNavigator() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const widthUpdate = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", widthUpdate);
    return () => {
      window.removeEventListener("resize", widthUpdate);
    };
  }, []);

  return width;
}
