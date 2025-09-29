import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ expenses }) => {
  return (
    <>
      <h3>قائمة المصاريف</h3>
      {expenses?.length ? (
        <div className="expense-list">
          {expenses.map((e) => (
            <ExpenseItem key={e.id} item={e} />
          ))}
        </div>
      ) : (
        <em>لا توجد مصاريف بعد</em>
      )}
    </>
  );
};

export default ExpenseList;
