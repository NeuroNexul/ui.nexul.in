import React from "react";

export function useFPS() {
  const [fps, setFps] = React.useState(0);

  React.useEffect(() => {
    let frames = 0;
    let lastTime = performance.now();
    let rafId: number;

    const loop = (time: number) => {
      frames++;

      if (time - lastTime >= 1000) {
        setFps(frames);
        frames = 0;
        lastTime = time;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return fps;
}
