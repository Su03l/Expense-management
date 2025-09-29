import React, { useMemo, useState } from 'react';

const Savings = ({ savings, goal, onAddSavings, onSetGoal }) => {
  const [amount, setAmount] = useState('');
  const [goalAmount, setGoalAmount] = useState('');

  const percent = useMemo(() => {
    if (!goal) return 0;
    return Math.min(100, Math.round((savings / goal) * 100));
  }, [savings, goal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    onAddSavings(val);
    setAmount('');
  };

  return (
    <div className="card">
      <h3>الحصالة</h3>
      <div className="grid">
        <div>
          <div className="label">رصيد الحصالة الحالي</div>
          <div className="big-number">{savings.toFixed(2)}</div>
        </div>
        <div>
          <div className="label">الهدف</div>
          <div className="big-number secondary">{goal.toFixed(2)}</div>
        </div>
      </div>

      <div className="progress">
        <div className="bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="progress-meta">{percent}% من الهدف</div>

      <div className="grid two">
        <div className="card sub">
          <h4>إضافة أموال</h4>
          <form className="form inline" onSubmit={handleSubmit}>
            <input
              type="number"
              step="0.01"
              placeholder="أدخل المبلغ"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit" className="btn primary">إضافة</button>
          </form>
        </div>
        <div className="card sub">
          <h4>تحديد الهدف</h4>
          <form className="form inline" onSubmit={(e) => { e.preventDefault(); const v = parseFloat(goalAmount); if (!isNaN(v) && v > 0) { onSetGoal(v); setGoalAmount(''); } }}>
            <input
              type="number"
              step="0.01"
              placeholder="حدد الهدف"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
            <button type="submit" className="btn">حفظ</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Savings;
