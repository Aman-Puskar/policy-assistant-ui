import { useEffect, useState } from "react";

const CHARS_PER_TICK = 50;
const TICK_MS = 16;

export function useTypewriter(text, enabled = true) {
  const [count, setCount] = useState(enabled ? 0 : text.length);

  useEffect(() => {
    if (!enabled) {
      setCount(text.length);
      return undefined;
    }

    setCount(0);
    const timer = window.setInterval(() => {
      setCount((current) => Math.min(current + CHARS_PER_TICK, text.length));
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [text, enabled]);

  return { shown: text.slice(0, count), done: count >= text.length };
}
