import { useState, useEffect } from "react";

export function useCountUp(targetValue: number, duration = 800) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let startValue = current;
    let startTime: number | null = null;
    const difference = targetValue - startValue;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCurrent(Math.floor(startValue + difference * progress));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [targetValue]);

  return current;
}
