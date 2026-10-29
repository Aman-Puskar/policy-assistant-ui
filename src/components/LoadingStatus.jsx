import { useEffect, useState } from "react";

const STEPS = [
  "Connecting to the assistant...",
  "Understanding your question...",
  "Searching relevant policy information...",
  "Reviewing scheme details...",
  "Organizing the key points...",
  "Finishing up...",
  "Finishing up...",
];

export default function LoadingStatus() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setStep((current) => Math.min(current + 1, STEPS.length - 1)),
      2400
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="row row--assistant" role="status" aria-live="polite">
      <div className="wave-loader" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="loading__label" key={step}>{STEPS[step]}</p>
    </div>
  );
}
