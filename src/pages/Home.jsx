import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlagIcon from '@mui/icons-material/Flag';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DiamondIcon from '@mui/icons-material/Diamond';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SavingsIcon from '@mui/icons-material/Savings';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import InsightsIcon from '@mui/icons-material/Insights';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = ({ expenses, savings, goal }) => {
  const totalExpenses = useMemo(() => expenses.reduce((s, e) => s + e.amount, 0), [expenses]);
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayCount = useMemo(() => expenses.filter(e => e.date === todayStr).length, [expenses, todayStr]);
  const percent = useMemo(() => goal ? Math.min(100, Math.round((savings / goal) * 100)) : 0, [savings, goal]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>مرحباً بك في حصالتك</h1>
          <p className="hero-subtitle">تطبيق إدارة المصاريف والادخار الأكثر ذكاءً</p>
          <p className="hero-description">
            تتبع مصاريفك، حدد أهدافك، وادخر بذكاء مع أدوات التحليل المتقدمة والرسوم البيانية التفاعلية
          </p>
          <div className="hero-actions">
            <Link to="/expenses" className="hero-btn primary">
              <ReceiptLongIcon />
              إضافة مصروف
            </Link>
            <Link to="/savings" className="hero-btn secondary">
              <SavingsIcon />
              إدارة الادخار
            </Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">{expenses.length}</div>
            <div className="hero-stat-label">معاملة</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{percent}%</div>
            <div className="hero-stat-label">تقدم الهدف</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-number">{new Set(expenses.map(e => e.date)).size}</div>
            <div className="hero-stat-label">يوم نشاط</div>
          </div>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="home-stats">
        <div className="stat-card expenses-card">
          <div className="stat-icon">
            <AttachMoneyIcon fontSize="large" />
          </div>
          <div className="stat-content">
            <h3>إجمالي المصاريف</h3>
            <div className="stat-number">{totalExpenses.toFixed(2)}</div>
            <div className="stat-subtitle">{todayCount} مصروفات اليوم</div>
          </div>
        </div>

        <div className="stat-card savings-card">
          <div className="stat-icon">
            <FlagIcon fontSize="large" />
          </div>
          <div className="stat-content">
            <h3>التقدم نحو الهدف</h3>
            <div className="stat-number">{savings.toFixed(2)} / {goal.toFixed(2)}</div>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${percent}%` }}></div>
            </div>
            <div className="progress-text">{percent}% من الهدف</div>
          </div>
        </div>
      </div>

      {/* الميزات الرئيسية */}
      <div className="features-section">
        <div className="section-header">
          <h2>ميزات التطبيق</h2>
          <p>أدوات متقدمة لإدارة أموالك بذكاء</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <ReceiptLongIcon fontSize="large" />
            </div>
            <h3>تتبع المصاريف</h3>
            <p>سجل مصاريفك اليومية مع التصنيفات والتواريخ لتحليل شامل لعادات الإنفاق</p>
            <Link to="/expenses" className="feature-link">
              ابدأ الآن <ArrowForwardIcon />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <SavingsIcon fontSize="large" />
            </div>
            <h3>إدارة الادخار</h3>
            <p>حدد أهدافك المالية وتتبع تقدمك مع شريط التقدم التفاعلي</p>
            <Link to="/savings" className="feature-link">
              ابدأ الآن <ArrowForwardIcon />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <BarChartIcon fontSize="large" />
            </div>
            <h3>الرسوم البيانية</h3>
            <p>تحليل بصري شامل مع رسوم بيانية تفاعلية لجميع بياناتك المالية</p>
            <Link to="/statistics" className="feature-link">
              عرض الإحصائيات <ArrowForwardIcon />
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <SecurityIcon fontSize="large" />
            </div>
            <h3>أمان البيانات</h3>
            <p>بياناتك محفوظة محلياً في متصفحك مع إمكانية التصدير والاستيراد</p>
            <div className="feature-badge">
              <CheckCircleIcon />
              آمن 100%
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <SpeedIcon fontSize="large" />
            </div>
            <h3>سرعة الأداء</h3>
            <p>واجهة سريعة ومتجاوبة تعمل بسلاسة على جميع الأجهزة</p>
            <div className="feature-badge">
              <CheckCircleIcon />
              سريع جداً
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <InsightsIcon fontSize="large" />
            </div>
            <h3>تحليلات ذكية</h3>
            <p>إحصائيات متقدمة وتحليل الاتجاهات لمساعدتك في اتخاذ قرارات مالية أفضل</p>
            <Link to="/statistics" className="feature-link">
              عرض التحليلات <ArrowForwardIcon />
            </Link>
          </div>
        </div>
      </div>

      {/* إحصائيات إضافية */}
      <div className="home-details">
        <div className="detail-card">
          <div className="detail-icon">
            <BarChartIcon fontSize="medium" />
          </div>
          <div className="detail-info">
            <div className="detail-title">إجمالي المعاملات</div>
            <div className="detail-value">{expenses.length}</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">
            <CalendarTodayIcon fontSize="medium" />
          </div>
          <div className="detail-info">
            <div className="detail-title">أيام النشاط</div>
            <div className="detail-value">{new Set(expenses.map(e => e.date)).size}</div>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">
            <DiamondIcon fontSize="medium" />
          </div>
          <div className="detail-info">
            <div className="detail-title">متوسط المصروف اليومي</div>
            <div className="detail-value">
              {expenses.length > 0 ? (totalExpenses / new Set(expenses.map(e => e.date)).size).toFixed(2) : '0.00'}
            </div>
          </div>
        </div>
      </div>

      {/* قسم الإرشادات */}
      <div className="guide-section">
        <div className="section-header">
          <h2>كيفية الاستخدام</h2>
          <p>دليل سريع لاستخدام التطبيق</p>
        </div>
        
        <div className="guide-steps">
          <div className="guide-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>أضف مصروفاتك</h3>
              <p>ابدأ بتسجيل مصاريفك اليومية مع التصنيف والتاريخ</p>
            </div>
          </div>

          <div className="guide-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>حدد هدف الادخار</h3>
              <p>ضع هدفاً مالياً واضحاً وتتبع تقدمك نحو تحقيقه</p>
            </div>
          </div>

          <div className="guide-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>راقب الإحصائيات</h3>
              <p>استخدم الرسوم البيانية لتحليل عادات الإنفاق وتحسينها</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h2>ابدأ رحلتك المالية الذكية اليوم</h2>
          <p>انضم إلى آلاف المستخدمين الذين يديرون أموالهم بذكاء</p>
          <div className="cta-actions">
            <Link to="/expenses" className="cta-btn primary">
              <ReceiptLongIcon />
              إضافة أول مصروف
            </Link>
            <Link to="/statistics" className="cta-btn secondary">
              <BarChartIcon />
              عرض الإحصائيات
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;