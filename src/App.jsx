import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:3000";

function App() {
  const [expenses, setExpenses] = useState([]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Mobile");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Monthly");

  async function loadExpenses() {
    try {
      const response = await fetch(`${API}/api/expenses`);

      if (!response.ok) {
        throw new Error("Could not load expenses");
      }

      const data = await response.json();

      setExpenses(data.expenses || []);
    } catch (error) {
      console.error("Load error:", error);
    }
  }

  useEffect(() => {
    loadExpenses();
  }, []);

  async function addExpense(e) {
    e.preventDefault();

    if (!name.trim() || !amount) {
      alert("Please enter expense name and amount.");
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/expenses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: name.trim(),
            category,
            amount: Number(amount),
            frequency
          })
        }
      );

      if (!response.ok) {
        throw new Error("Could not save expense");
      }

      const data = await response.json();

      setExpenses((current) => [
        ...current,
        data.expense
      ]);

      setName("");
      setAmount("");
      setCategory("Mobile");
      setFrequency("Monthly");

    } catch (error) {
      console.error("Save error:", error);
      alert("Could not save expense.");
    }
  }

  async function deleteExpense(id) {
    try {
      const response = await fetch(
        `${API}/api/expenses/${id}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Could not delete expense");
      }

      setExpenses((current) =>
        current.filter(
          (expense) => expense.id !== id
        )
      );

    } catch (error) {
      console.error("Delete error:", error);
      alert("Could not delete expense.");
    }
  }

  const monthlyTotal = expenses.reduce(
    (total, expense) => {
      if (expense.frequency === "Monthly") {
        return total + expense.amount;
      }

      return total + expense.amount / 12;
    },
    0
  );

  return (
    <div className="app">

      <header className="header">

        <div className="logo">
          💳 BillWise
        </div>

        <div className="tagline">
          Your bills change. BillWise notices.
        </div>

        <div className="status">
          ● READY
        </div>

      </header>

      <main>

        <section className="card">

          <h2>
            Track your monthly expenses 👋
          </h2>

          <p>
            Add your recurring expenses and
            subscriptions to keep everything
            in one place.
          </p>

        </section>


        <section className="card">

          <h2>➕ Add Expense</h2>

          <form onSubmit={addExpense}>

            <label>
              Expense Name
            </label>

            <input
              type="text"
              placeholder="Eg: Airtel Recharge"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <label>
              Category
            </label>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>Mobile</option>
              <option>Internet</option>
              <option>Entertainment</option>
              <option>Software</option>
              <option>Electricity</option>
              <option>Insurance</option>
              <option>Shopping</option>
              <option>Other</option>
            </select>

            <label>
              Amount (₹)
            </label>

            <input
              type="number"
              min="0"
              placeholder="Eg: 299"
              value={amount}
              onChange={(e) =>
                setAmount(e.target.value)
              }
            />

            <label>
              Frequency
            </label>

            <select
              value={frequency}
              onChange={(e) =>
                setFrequency(e.target.value)
              }
            >
              <option>Monthly</option>
              <option>Yearly</option>
            </select>

            <button type="submit">
              Add Expense
            </button>

          </form>

        </section>


        <section className="card insight">

          <h2>💰 Monthly Total</h2>

          <div className="total">
            ₹{Math.round(monthlyTotal).toLocaleString("en-IN")}
          </div>

          <p>
            Estimated monthly recurring expenses.
          </p>

        </section>


        <section className="card">

          <h2>📋 My Expenses</h2>

          {expenses.length === 0 ? (

            <p>
              No expenses added yet.
            </p>

          ) : (

            <div className="expense-list">

              {expenses.map((expense) => (

                <div
                  className="expense-item"
                  key={expense.id}
                >

                  <div>

                    <h3>
                      {expense.name}
                    </h3>

                    <p>
                      {expense.category} •{" "}
                      {expense.frequency}
                    </p>

                  </div>

                  <div className="expense-right">

                    <strong>
                      ₹{expense.amount.toLocaleString("en-IN")}
                    </strong>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() =>
                        deleteExpense(expense.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>

    </div>
  );
}

export default App;