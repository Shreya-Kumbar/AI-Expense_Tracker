import { useEffect, useState } from "react";

function App() {
  const [exp, setExp] = useState([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  const fetchExp = async () => {
    const res = await fetch("http://localhost:5000/expenses");
    const data = await res.json();
    setExp(data);
  };

  useEffect(() => {
    fetchExp();
  }, []);

  const addExp = async () => {
    await fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        amount,
        category
      })
    });

    setTitle("");
    setAmount("");
    setCategory("Food");

    fetchExp();
  };

  const deleteExp = async (id) => {
    await fetch(`http://localhost:5000/expenses/${id}`, {
      method: "DELETE"
    });

    fetchExp();
  };

  const total = exp.reduce((sum, item) => {
    return sum + Number(item.amount);
  }, 0);

  return (
    <div style={{
      padding: "30px",
      margin: "30px",
      backgroundColor: "#cbabef",
      borderRadius: "6px",
      boxShadow: "0px 2px 4px",
      fontSize: "20px",
      textAlign: "center"}}>

      <h1 style = {{color: "#0009b8"}}><u>Expense Tracker System</u></h1>
      <h2>Total Expenses: ₹{total}</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter title..."
        style = {{ fontSize: "17px" }}
      />
      <br/>

      <input
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount..."
        style = {{ fontSize: "17px" }}
      />
      <br/>

      {/* <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Enter category..."
        style = {{fontSize: "17px"}}
      /> */}

      <p>Category: </p>
      <select value = {category} onChange = {(e) => setCategory(e.target.value)}>
        <option value = "Food">Food</option>
        <option value = "Travel">Travel</option>
        <option value = "Monthly Expenses">Monthly Expenses</option>
      </select>
      <br/>

      <button
        onClick={addExp}
        style = {{fontSize: "17px", backgroundColor: "#93f1b1", borderRadius: "5px" }}>
          Add Expense
      </button>

      <ul style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            justifyItems: "center",
            padding: "30px",
          }}>

        {exp.map((u) => (
          <li key={u.id}
          style={{
        backgroundColor: "#abefd5",
        boxShadow: "0px 2px 4px",
        borderRadius: "6px",
        width: "300px",
        padding: "30px",
        listStyle: "none",
      }}
          >

            <b>Title: </b> {u.title}
            <br />

            <b>Amount: </b> {u.amount}
            <br />

            <b>Category: </b> {u.category}
            <br />

            <button
              onClick={() => deleteExp(u.id)}
              style={{marginLeft: "10px",backgroundColor: "#f7897c",borderRadius: "4px", fontSize: "14px"}}>
              Delete
            </button>
            <br />

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;