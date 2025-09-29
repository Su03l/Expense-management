import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/main.css';

import Topbar from './components/Topbar';
import Home from './pages/Home';
import ExpensesPage from './pages/ExpensesPage';
import SavingsPage from './pages/SavingsPage';
import StatisticsPage from './pages/StatisticsPage';

function App() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'أكل', amount: 50, date: '2025-09-29', category: 'Food' },
    { id: 2, name: 'مواصلات', amount: 20, date: '2025-09-28', category: 'Transport' },
  ]);

  const [savings, setSavings] = useState(400);
  const [goal, setGoal] = useState(1000);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const exp = localStorage.getItem('expenses');
      const sav = localStorage.getItem('savings');
      const gol = localStorage.getItem('goal');
      if (exp) setExpenses(JSON.parse(exp));
      if (sav) setSavings(parseFloat(sav));
      if (gol) setGoal(parseFloat(gol));
    } catch {}
  }, []);

  // Persist to localStorage when values change
  useEffect(() => {
    try { localStorage.setItem('expenses', JSON.stringify(expenses)); } catch {}
  }, [expenses]);
  useEffect(() => {
    try { localStorage.setItem('savings', String(savings)); } catch {}
  }, [savings]);
  useEffect(() => {
    try { localStorage.setItem('goal', String(goal)); } catch {}
  }, [goal]);

  const handleAddExpense = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handleAddSavings = (amount) => {
    setSavings((prev) => prev + amount);
  };

  const handleSetGoal = (amount) => {
    if (!isNaN(amount) && amount > 0) setGoal(amount);
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Topbar />
        <main className="content container">
          <Routes>
            <Route path="/" element={<Home expenses={expenses} savings={savings} goal={goal} />} />
            <Route path="/expenses" element={<ExpensesPage expenses={expenses} onAddExpense={handleAddExpense} />} />
            <Route path="/savings" element={<SavingsPage savings={savings} goal={goal} onAddSavings={handleAddSavings} onSetGoal={handleSetGoal} />} />
            <Route path="/statistics" element={<StatisticsPage expenses={expenses} savings={savings} goal={goal} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
