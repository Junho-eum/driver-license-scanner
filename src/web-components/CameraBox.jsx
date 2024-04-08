import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";

export default function CameraBox() {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const boxStyles = {
    position: "sticky",
    top: "0",
    outlineStyle: "solid",
    outlineColor: "red",
    width: "222px",
    minHeight: "150px",
  };

  return (
    <div style={boxStyles} id="camera_box">
      <Webcam />
    </div>
  );
}
