import React, { useEffect, useMemo, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Doughnut, Line, Pie, Radar } from 'react-chartjs-2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CategoryIcon from '@mui/icons-material/Category';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SpeedIcon from '@mui/icons-material/Speed';
import AssessmentIcon from '@mui/icons-material/Assessment';
import TimelineIcon from '@mui/icons-material/Timeline';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const StatisticsPage = ({ expenses, savings, goal }) => {
  // Track current theme (light/dark) so charts recolor instantly when toggled
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    const el = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(el.getAttribute('data-theme') || 'dark');
    });
    observer.observe(el, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isLight = theme === 'light';
  // Pull CSS variables to align with app colors
  const cssVars = getComputedStyle(document.documentElement);
  const colorText = cssVars.getPropertyValue('--text').trim() || (isLight ? '#1e293b' : '#f5f5f5');
  const colorMuted = cssVars.getPropertyValue('--muted').trim() || (isLight ? '#64748b' : '#a3a3a3');
  const gridColor = isLight ? 'rgba(2, 8, 23, 0.08)' : 'rgba(255, 255, 255, 0.1)';

  // حساب الإحصائيات
  const totalExpenses = useMemo(() => expenses.reduce((sum, expense) => sum + expense.amount, 0), [expenses]);
  const uniqueDays = useMemo(() => new Set(expenses.map(expense => expense.date)).size, [expenses]);
  const totalOperations = expenses.length;
  const percent = useMemo(() => goal ? Math.min(100, Math.round((savings / goal) * 100)) : 0, [savings, goal]);

  // بيانات المصاريف حسب التصنيف
  const categoryData = useMemo(() => {
    const categories = {};
    expenses.forEach(expense => {
      categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
    });
    return categories;
  }, [expenses]);

  // بيانات المصاريف حسب التاريخ (آخر 7 أيام)
  const dailyData = useMemo(() => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().slice(0, 10);
      const dayExpenses = expenses.filter(e => e.date === dateStr);
      const total = dayExpenses.reduce((sum, e) => sum + e.amount, 0);
      last7Days.push({
        date: dateStr,
        total,
        count: dayExpenses.length
      });
    }
    return last7Days;
  }, [expenses]);

  // إعدادات الرسوم البيانية
  const categoryChartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        label: 'المبلغ',
        data: Object.values(categoryData),
        backgroundColor: [
          'rgba(6, 182, 212, 0.8)',
          'rgba(34, 211, 238, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderColor: [
          'rgba(6, 182, 212, 1)',
          'rgba(34, 211, 238, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const dailyChartData = {
    labels: dailyData.map(d => new Date(d.date).toLocaleDateString('ar-SA', { weekday: 'short' })),
    datasets: [
      {
        label: 'المصاريف اليومية',
        data: dailyData.map(d => d.total),
        borderColor: 'rgba(6, 182, 212, 1)',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const savingsChartData = {
    labels: ['المدخر', 'المتبقي'],
    datasets: [
      {
        data: [savings, Math.max(0, goal - savings)],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(107, 114, 128, 0.3)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(107, 114, 128, 0.5)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: colorText,
          font: { family: 'ui-sans-serif, system-ui' },
        },
      },
      title: {
        display: true,
        color: colorText,
        font: { family: 'ui-sans-serif, system-ui', size: 16, weight: 'bold' },
      },
      tooltip: {
        titleColor: isLight ? '#0b1220' : '#fff',
        bodyColor: isLight ? '#0b1220' : '#fff',
        backgroundColor: isLight ? 'rgba(255,255,255,0.95)' : 'rgba(30,41,59,0.95)',
        borderColor: isLight ? 'rgba(2,8,23,0.08)' : 'rgba(255,255,255,0.08)',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: colorMuted },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: colorMuted },
        grid: { color: gridColor },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: colorText, font: { family: 'ui-sans-serif, system-ui' } },
      },
      tooltip: chartOptions.plugins.tooltip,
    },
  };

  return (
    <div className="statistics-container">
      {/* عنوان الصفحة */}
      <div className="statistics-header">
        <h1>الإحصائيات والرسوم البيانية</h1>
        <p>تحليل شامل لمصاريفك وادخارك</p>
      </div>

      {/* الإحصائيات السريعة */}
      <div className="quick-stats">
        <div className="quick-stat-card">
          <div className="quick-stat-icon">
            <AttachMoneyIcon fontSize="large" />
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-title">إجمالي المصاريف</div>
            <div className="quick-stat-value">{totalExpenses.toFixed(2)}</div>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon">
            <TrendingUpIcon fontSize="large" />
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-title">عدد العمليات</div>
            <div className="quick-stat-value">{totalOperations}</div>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon">
            <CalendarTodayIcon fontSize="large" />
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-title">أيام النشاط</div>
            <div className="quick-stat-value">{uniqueDays}</div>
          </div>
        </div>

        <div className="quick-stat-card">
          <div className="quick-stat-icon">
            <CategoryIcon fontSize="large" />
          </div>
          <div className="quick-stat-content">
            <div className="quick-stat-title">التصنيفات</div>
            <div className="quick-stat-value">{Object.keys(categoryData).length}</div>
          </div>
        </div>
      </div>

      {/* الرسوم البيانية */}
      <div className="charts-grid">
        <div className="chart-card">
          <h3>المصاريف حسب التصنيف</h3>
          <div className="chart-container">
            <Bar data={categoryChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>المصاريف اليومية (آخر 7 أيام)</h3>
          <div className="chart-container">
            <Line data={dailyChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>تقدم الادخار</h3>
          <div className="chart-container">
            <Doughnut data={savingsChartData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
