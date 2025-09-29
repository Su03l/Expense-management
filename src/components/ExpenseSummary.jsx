import React, { useMemo } from 'react';

const ExpenseSummary = ({ expenses }) => {
  const total = useMemo(() => expenses.reduce((sum, e) => sum + (e.amount || 0), 0), [expenses]);
  return (
    <div className="card">
      <h3>إجمالي المصاريف</h3>
      <div className="big-number">{total.toFixed(2)}</div>
    </div>
  );
};

export default ExpenseSummary;
