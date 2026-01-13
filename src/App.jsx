import { useEffect, useState } from "react";
import "./App.css";

/*
  ===============================
  🔧 TEST MODE
  ===============================
  true  = skip countdown (for testing)
  false = real countdown (final)
*/
const TEST_MODE = true;

function App() {
  const targetDate = new Date(2026, 0, 20); // Jan 20, 2026

  const [showCelebration, setShowCelebration] = useState(TEST_MODE);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (TEST_MODE) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff <= 0) {
        setShowCelebration(true);
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, "0"),
        hours: String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
        minutes: String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0"),
        seconds: String(Math.floor((diff / 1000) % 60)).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      {showCelebration ? (
        <div className="card">
          <h1 className="title">🎉 Happy Birthday Shraddha 🎉</h1>
          <p className="subtitle">
            This is the unlocked celebration screen.
          </p>

          <button
            className="enter-button"
            onClick={() => alert("Here you will show curtains, photos, message")}
          >
            Enter Celebration 🎂
          </button>
        </div>
      ) : (
        <div className="card">
          <h1 className="title">Birthday Countdown</h1>
          <p className="subtitle">Counting every second…</p>

          <div className="countdown">
            <div className="box">
              <div className="value">{timeLeft.days}</div>
              <div className="label">DAYS</div>
            </div>
            <div className="box">
              <div className="value">{timeLeft.hours}</div>
              <div className="label">HOURS</div>
            </div>
            <div className="box">
              <div className="value">{timeLeft.minutes}</div>
              <div className="label">MINUTES</div>
            </div>
            <div className="box">
              <div className="value">{timeLeft.seconds}</div>
              <div className="label">SECONDS</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
