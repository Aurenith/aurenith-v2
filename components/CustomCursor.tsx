"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="cursor"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
      <div
        className="cursor-ring"
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />
    </>
  );
}
