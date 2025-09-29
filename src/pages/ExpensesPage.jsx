import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';

const ExpensesPage = ({ expenses, onAddExpense }) => {
  // حساب الإحصائيات
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const uniqueDays = new Set(expenses.map(expense => expense.date)).size;
  const totalOperations = expenses.length;

  return (
    <div className="expenses-container">
      {/* صف الإحصائيات */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-title">إجمالي المصاريف</div>
          <div className="stat-number">{totalExpenses.toFixed(2)}</div>
        </div>
        <div className="stat-item">
          <div className="stat-title">عدد الأيام</div>
          <div className="stat-number">{uniqueDays}</div>
        </div>
        <div className="stat-item">
          <div className="stat-title">عدد العمليات</div>
          <div className="stat-number">{totalOperations}</div>
        </div>
      </div>

      {/* صف المحتوى الرئيسي */}
      <div className="content-row">
        <div className="form-section">
          <h3>إضافة مصروف</h3>
          <ExpenseForm onAddExpense={onAddExpense} />
        </div>
        
        <div className="list-section">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
