import { useEffect, useState } from "react";

export default function App() {
  const targetDate = new Date("2026-02-14T00:00:00"); // CHANGE DATE HERE

  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({});
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

  return (
    <div className="page">
      <h1>For Shraddha ❤️</h1>
      <p className="subtitle">Counting every second...</p>

      <div className="countdown">
        {Object.keys(timeLeft).length > 0 ? (
          Object.entries(timeLeft).map(([label, value]) => (
            <div className="box" key={label}>
              <div className="number">{value}</div>
              <div className="label">{label}</div>
            </div>
          ))
        ) : (
          <h2>🎉 The Day Is Here 🎉</h2>
        )}
      </div>
    </div>
  );
}
