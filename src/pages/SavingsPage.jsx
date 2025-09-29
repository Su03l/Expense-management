import React, { useMemo, useState } from 'react';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlagIcon from '@mui/icons-material/Flag';

const SavingsPage = ({ savings, goal, onAddSavings, onSetGoal }) => {
  const [amount, setAmount] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const percent = useMemo(() => {
    if (!goal) return 0;
    return Math.min(100, Math.round((savings / goal) * 100));
  }, [savings, goal]);

  const submitAdd = (e) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) {
      onAddSavings(val);
      setAmount('');
    }
  };

  const submitGoal = (e) => {
    e.preventDefault();
    const val = parseFloat(goalAmount);
    if (!isNaN(val) && val > 0) {
      onSetGoal(val);
      setGoalAmount('');
    }
  };

  return (
    <div className="savings-container">
      {/* عنوان الحصالة */}
      <div className="savings-header">
        <h2>الحصالة</h2>
        <div className="savings-info">
          <div className="current-amount">{savings.toFixed(2)}</div>
          <div className="goal-amount">من أصل {goal.toFixed(2)}</div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${percent}%` }}></div>
          </div>
          <div className="progress-text">{percent}% من الهدف</div>
        </div>
      </div>

      {/* أقسام إضافة الأموال وتحديد الهدف */}
      <div className="savings-actions">
        <div className="action-card">
          <div className="action-header">
            <AttachMoneyIcon fontSize="medium" />
            <h3>إضافة أموال</h3>
          </div>
          <form onSubmit={submitAdd}>
            <input
              type="number"
              step="0.01"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">إضافة</button>
          </form>
        </div>

        <div className="action-card">
          <div className="action-header">
            <FlagIcon fontSize="medium" />
            <h3>تحديد هدف</h3>
          </div>
          <form onSubmit={submitGoal}>
            <input
              type="number"
              step="0.01"
              placeholder="حدد الهدف"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
            <button type="submit" className="btn-secondary">حفظ</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;
