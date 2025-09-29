import React from 'react';

const ExpenseItem = ({ item }) => {
  return (
    <div className="expense-item">
      <div className="info">
        <div className="name">{item.name}</div>
        <div className="meta">
          <span className="category">{item.category}</span>
          <span className="date">{item.date}</span>
        </div>
      </div>
      <div className="amount">{item.amount.toFixed(2)}</div>
    </div>
  );
};

export default ExpenseItem;
