import "./App.css"

function App() {
  return (
    <div className="app">

      <header className="header">
        <div className="logo">💳 BillWise</div>
        <div className="tagline">
          Your bills change. BillWise notices.
        </div>

        <div className="status">
          ● AGENT ACTIVE
        </div>
      </header>

      <main>

        <section className="card">
          <h2>Good morning 👋</h2>
          <p>
            BillWise is autonomously watching for important
            changes in bills, subscriptions and payment technology.
          </p>
        </section>

        <section className="card insight">
          <h2>💡 Latest Insight</h2>

          <h3>Subscription prices are changing</h3>

          <p>
            A recent pricing update may affect recurring
            monthly expenses.
          </p>

          <p>
            <strong>Why BillWise selected this:</strong>
            {" "}It could directly affect everyday spending.
          </p>
        </section>

        <section className="card">
          <h2>🧠 Editorial Activity</h2>

          <div className="stats">

            <div className="stat">
              <strong>12</strong>
              <span>Topics discovered</span>
            </div>

            <div className="stat">
              <strong>7</strong>
              <span>Topics rejected</span>
            </div>

            <div className="stat">
              <strong>2</strong>
              <span>Topics published</span>
            </div>

            <div className="stat">
              <strong>92%</strong>
              <span>Impact score</span>
            </div>

          </div>
        </section>

        <section className="card">
          <h2>📡 Agent Status</h2>

          <p>Last scan: Just now</p>
          <p>Next scan: Automatically scheduled</p>

        </section>

      </main>

    </div>
  )
}

export default App