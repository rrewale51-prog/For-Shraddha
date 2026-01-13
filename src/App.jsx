import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // SET TARGET DATE (YYYY, MM - 1, DD)
  const targetDate = new Date(2026, 0, 13); // example: Jan 1, 2026

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate.getTime() - now;

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
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
    </div>
  );
}

export default App;
