import "./App.css";

function App() {
  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Birthday Countdown</h1>
        <p className="subtitle">Counting every second…</p>

        <div className="countdown">
          <div className="box">
            <div className="value">12</div>
            <div className="label">DAYS</div>
          </div>

          <div className="box">
            <div className="value">08</div>
            <div className="label">HOURS</div>
          </div>

          <div className="box">
            <div className="value">45</div>
            <div className="label">MINUTES</div>
          </div>

          <div className="box">
            <div className="value">22</div>
            <div className="label">SECONDS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
