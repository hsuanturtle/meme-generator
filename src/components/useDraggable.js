import { useState, useEffect } from "react";

export default function useDraggable(e) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseDown = (e) => {
      const startX = e.clientX - offset.x;
      const startY = e.clientY - offset.y;
      console.log(e.clientX, e.clientY, offset.x, offset.y);

      const handleMouseMove = (e) => {
        const newX = e.pageX - startX;
        const newY = e.pageY - startY;
        setOffset({ x: newX, y: newY });
      };
      document.addEventListener("mousemove", handleMouseMove);

      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", handleMouseMove);
        },
        { once: true }
      );
    };

    e.current.addEventListener("mousedown", handleMouseDown);
    return () => {
      e.current.removeEventListener("mousedown", handleMouseDown);
    };
  }, [offset.x, offset.y]);

  useEffect(() => {
    e.current.style.transform = `translate(${offset.x}px,${offset.y}px)`;
  }, [offset.x, offset.y]);
}
