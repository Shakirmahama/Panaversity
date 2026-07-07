import { useState, useEffect } from 'react';
import { storage } from './storage';
import { LogOut, Plus, Wallet, TrendingDown, RefreshCw, Home, Coffee, Car, Heart } from 'lucide-react';

const CATEGORY_ICONS = {
  'Housing & Utilities': Home,
  'Food & Dining': Coffee,
  'Transportation': Car,
  'Personal & Leisure': Heart
};

const CATEGORY_COLORS = {
  'Housing & Utilities': 'var(--cat-housing)',
  'Food & Dining': 'var(--cat-food)',
  'Transportation': 'var(--cat-transport)',
  'Personal & Leisure': 'var(--cat-personal)'
};

export default function Dashboard({ username, onLogout }) {
  const [data, setData] = useState({ income: 0, expenses: [] });
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  
  // Income Form
  const [incomeInput, setIncomeInput] = useState('');
  
  // Expense Form
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Housing & Utilities');

  useEffect(() => {
    loadData();
  }, [username]);

  const loadData = () => {
    const userData = storage.getUserData(username);
    // Sort expenses by date descending
    userData.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    setData(userData);
  };

  const handleUpdateIncome = (e) => {
    e.preventDefault();
    if (!incomeInput || isNaN(incomeInput)) return;
    storage.updateIncome(parseFloat(incomeInput));
    setIncomeInput('');
    setShowIncomeModal(false);
    loadData();
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseAmount || !expenseTitle || isNaN(expenseAmount)) return;
    storage.addExpense({
      title: expenseTitle,
      amount: parseFloat(expenseAmount),
      category: expenseCategory
    });
    setExpenseAmount('');
    setExpenseTitle('');
    setExpenseCategory('Housing & Utilities');
    setShowExpenseModal(false);
    loadData();
  };

  const handleLogout = () => {
    storage.logout();
    onLogout();
  };

  const handleDelete = (id) => {
    storage.deleteExpense(id);
    loadData();
  };

  // Calculations
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const mtdExpenses = data.expenses
    .filter(e => {
        const d = new Date(e.date);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBlock = data.income - totalExpenses;

  // Formatting formatting
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div className="container fade-in">
      {/* Header */}
      <header className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome, {username}</h1>
          <p className="text-secondary">Here's your financial overview</p>
        </div>
        <button onClick={handleLogout} className="btn btn-outline">
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Overview Cards */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '2rem' }}>
        <div className="glass stat-card success">
          <div className="flex justify-between items-center">
            <span className="stat-title">Total Income</span>
            <Wallet size={20} color="var(--success)" />
          </div>
          <span className="stat-value">{formatMoney(data.income)}</span>
          <button 
            onClick={() => { setShowIncomeModal(true); setIncomeInput(data.income); }} 
            className="btn btn-outline"
            style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', marginTop: '0.5rem', width: 'fit-content' }}
          >
            Update Income
          </button>
        </div>

        <div className="glass stat-card warning">
          <div className="flex justify-between items-center">
            <span className="stat-title">Month-To-Date Expenses</span>
            <TrendingDown size={20} color="var(--warning)" />
          </div>
          <span className="stat-value">{formatMoney(mtdExpenses)}</span>
        </div>

        <div className="glass stat-card">
          <div className="flex justify-between items-center">
            <span className="stat-title">Remaining Balance</span>
            <RefreshCw size={20} color="var(--accent-secondary)" />
          </div>
          <span className="stat-value" style={{ color: remainingBlock >= 0 ? 'var(--success)' : 'var(--danger)' }}>
            {formatMoney(remainingBlock)}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="glass glass-panel">
        <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
          <h2>Recent Transactions</h2>
          <button onClick={() => setShowExpenseModal(true)} className="btn btn-primary">
            <Plus size={18} /> Add Expense
          </button>
        </div>

        {data.expenses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <p>No expenses recorded yet. Start tracking today!</p>
          </div>
        ) : (
          <div className="transaction-list">
            {data.expenses.map(expense => {
              const Icon = CATEGORY_ICONS[expense.category] || Heart;
              return (
                <div key={expense.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-icon" style={{ background: CATEGORY_COLORS[expense.category] }}>
                      <Icon size={20} />
                    </div>
                    <div className="transaction-details">
                      <span className="transaction-title">{expense.title}</span>
                      <span className="transaction-date">
                        {new Date(expense.date).toLocaleDateString()} • {expense.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center" style={{ gap: '1rem' }}>
                    <span className="transaction-amount amount-negative">-{formatMoney(expense.amount)}</span>
                    <button 
                      onClick={() => handleDelete(expense.id)}
                      className="btn btn-danger"
                      style={{ padding: '0.4rem', borderRadius: '8px' }}
                      title="Delete"
                    >
                      <LogOut size={14} style={{ transform: 'rotate(90deg)' }}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Income Modal */}
      {showIncomeModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowIncomeModal(false) }}>
          <div className="glass glass-panel modal-content">
            <div className="modal-header">
              <h2>Update Total Income</h2>
              <button className="close-btn" onClick={() => setShowIncomeModal(false)}>✕</button>
            </div>
            <form onSubmit={handleUpdateIncome} className="flex flex-col" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Total Absolute Income ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-input"
                  value={incomeInput}
                  onChange={(e) => setIncomeInput(e.target.value)}
                  placeholder="e.g. 5000"
                  autoFocus
                />
              </div>
              <button type="submit" className="btn btn-primary">Save Income</button>
            </form>
          </div>
        </div>
      )}

      {/* Expense Modal */}
      {showExpenseModal && (
        <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowExpenseModal(false) }}>
          <div className="glass glass-panel modal-content">
            <div className="modal-header">
              <h2>Add New Expense</h2>
              <button className="close-btn" onClick={() => setShowExpenseModal(false)}>✕</button>
            </div>
            <form onSubmit={handleAddExpense} className="flex flex-col" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Expense Title</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="e.g. Groceries"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Amount ($)</label>
                <input 
                  type="number" 
                  step="0.01"
                  className="form-input"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  placeholder="e.g. 50.00"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select 
                  className="form-input"
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  style={{ appearance: 'none' }}
                >
                  {Object.keys(CATEGORY_ICONS).map(cat => (
                    <option key={cat} value={cat} style={{ color: 'black' }}>{cat}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>Add Expense</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
