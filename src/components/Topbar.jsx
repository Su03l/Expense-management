import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SavingsIcon from '@mui/icons-material/Savings';
import BarChartIcon from '@mui/icons-material/BarChart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  const toggle = () => setOpen((o) => !o);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  const handleNavClick = () => setOpen(false);

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <div className="brand-icon">
            <AccountBalanceWalletIcon fontSize="large" />
          </div>
          <div className="brand-text">
            <span className="brand-title">حصالتك</span>
            <span className="brand-subtitle">إدارة المصاريف</span>
          </div>
        </div>
        
        
        <nav className={`topnav ${open ? 'open' : ''}`}>
          <NavLink end to="/" onClick={handleNavClick} className={({ isActive }) => isActive ? 'topnav-link active' : 'topnav-link'}>
            <HomeIcon className="icon" />
            <span>الرئيسية</span>
          </NavLink>
          <NavLink to="/expenses" onClick={handleNavClick} className={({ isActive }) => isActive ? 'topnav-link active' : 'topnav-link'}>
            <ReceiptLongIcon className="icon" />
            <span>المصاريف</span>
          </NavLink>
          <NavLink to="/savings" onClick={handleNavClick} className={({ isActive }) => isActive ? 'topnav-link active' : 'topnav-link'}>
            <SavingsIcon className="icon" />
            <span>الحصالة</span>
          </NavLink>
          <NavLink to="/statistics" onClick={handleNavClick} className={({ isActive }) => isActive ? 'topnav-link active' : 'topnav-link'}>
            <BarChartIcon className="icon" />
            <span>الإحصائيات</span>
          </NavLink>
        </nav>
        <div className="topbar-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="تبديل الثيم">
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
          <button className="hamburger" aria-label="القائمة" onClick={toggle}>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
