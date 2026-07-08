import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  duration = 900,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) {
  const [display, setDisplay] = useState(0);

  const fromRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;

    const start = performance.now();

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);

      const eased = 1 - Math.pow(1 - progress, 3);

      const current = from + (to - from) * eased;

      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      fromRef.current = to;
    };
  }, [value, duration]);

  const formatted = display.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}