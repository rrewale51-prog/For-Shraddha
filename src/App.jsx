import { useEffect, useState } from "react";

export default function App() {
  const targetDate = new Date("2026-02-14T00:00:00"); // CHANGE DATE HERE

  const [timeLeft, setTimeLeft] = useState({});
  const [finished, setFinished] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Load confetti script
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
        setTimeout(() => setShowText(true), 800);
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
        particleCount: 6,
        angle: 60,
        spread: 80,
        origin: { x: 0 },
      });
      window.confetti({
        particleCount: 6,
        angle: 120,
        spread: 80,
        origin: { x: 1 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
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
          <h2 className="reveal-title">🎉 It’s Finally Here 🎉</h2>

          {showText && (
            <div className="reveal-text">
              <p style={{ animationDelay: "0.3s" }}>
                Today is not just a day…
              </p>
              <p style={{ animationDelay: "1s" }}>
                It’s a reminder of how special you are.
              </p>
              <p style={{ animationDelay: "1.7s" }}>
                Every moment waiting for this was worth it.
              </p>
              <p style={{ animationDelay: "2.4s" }}>
                Happy Day, Shraddha ❤️
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
