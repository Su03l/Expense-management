import React, { useState } from 'react';

const initialForm = { name: '', amount: '', date: '', category: '' };

const ExpenseForm = ({ onAddExpense }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.date || !form.category) return;
    const expense = {
      id: Date.now(),
      name: form.name,
      amount: parseFloat(form.amount),
      date: form.date,
      category: form.category,
    };
    onAddExpense(expense);
    setForm(initialForm);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="grid">
        <div className="field">
          <label>الاسم</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="مثال: غداء" />
        </div>
        <div className="field">
          <label>المبلغ</label>
          <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} placeholder="50" />
        </div>
        <div className="field">
          <label>التاريخ</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="field">
          <label>التصنيف</label>
          <select  name="category" value={form.category} onChange={handleChange}>
            <option value="">اختر...</option>
            <option value="Food">أكل</option>
            <option value="Transport">مواصلات</option>
            <option value="Bills">فواتير</option>
            <option value="Other">أخرى</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary">إضافة</button>
    </form>
  );
};

export default ExpenseForm;
