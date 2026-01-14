import { useEffect, useState } from "react";

export default function App() {
  const targetDate = new Date("2026-02-14T00:00:00"); // CHANGE DATE HERE

  const [timeLeft, setTimeLeft] = useState({});
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    // Load confetti script from CDN
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setFinished(true);
        setTimeLeft({});
        setTimeout(() => fireConfetti(), 300);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fireConfetti = () => {
    if (!window.confetti) return;

    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="page">
      <h1>For Shraddha ❤️</h1>

      {!finished ? (
        <>
          <p className="subtitle">Counting every second...</p>
          <div className="countdown">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div className="box" key={label}>
                <div className="number">{value}</div>
                <div className="label">{label}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>🎉 It’s Time! 🎉</h2>
          <p className="subtitle">This moment was worth the wait ❤️</p>
        </>
      )}
    </div>
  );
}
