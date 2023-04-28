import { useEffect, useState } from "react";
export const DrawerWidth = () => {
  const getWindowDimensions: any = () => {
    const width = window.innerWidth;
    return width;
  };
  const [windowDimensions, setWindowDimensions] = useState<number>(
    getWindowDimensions()
  );
  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowDimensions(getWindowDimensions());
    });
    return () =>
      window.removeEventListener("resize", () => {
        setWindowDimensions(getWindowDimensions());
      });
  }, [windowDimensions]);
  return windowDimensions;
};
