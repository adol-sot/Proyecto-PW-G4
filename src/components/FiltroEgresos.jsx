import React, { useState } from "react";

const FiltroEgresos = ({ token }) => {
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");

  const fetchFilteredExpenses = () => {
    let url = "http://127.0.0.1:8001/api/v1/expenses?";
    if (categoryId) url += `category_id=${categoryId}&`;
    if (dateFrom) url += `date_from=${dateFrom}&`;
    if (dateTo) url += `date_to=${dateTo}&`;
    if (amountMin) url += `amount_min=${amountMin}&`;
    if (amountMax) url += `amount_max=${amountMax}&`;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => setFilteredExpenses(data));
  };

  return (
    <div>
      <h2>Filtrar egresos</h2>
      <input type="text" placeholder="Categoría" value={categoryId} onChange={e => setCategoryId(e.target.value)} />
      <input type="date" placeholder="Desde" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
      <input type="date" placeholder="Hasta" value={dateTo} onChange={e => setDateTo(e.target.value)} />
      <input type="number" placeholder="Monto mínimo" value={amountMin} onChange={e => setAmountMin(e.target.value)} />
      <input type="number" placeholder="Monto máximo" value={amountMax} onChange={e => setAmountMax(e.target.value)} />
      <button onClick={fetchFilteredExpenses}>Filtrar</button>

      <ul>
        {filteredExpenses.map(exp => (
          <li key={exp.id}>
            {exp.expense_date} - {exp.description} - {exp.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FiltroEgresos;