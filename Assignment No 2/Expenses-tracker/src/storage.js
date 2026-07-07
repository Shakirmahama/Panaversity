const USERS_KEY = 'expenses_users';
const CURRENT_USER_KEY = 'expenses_current_user';
const DATA_KEY = 'expenses_user_data';

export const storage = {
  // Authentication
  getUsers: () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]'),
  
  register: (username, password) => {
    const users = storage.getUsers();
    if (users.find(u => u.username === username)) {
      throw new Error('User already exists');
    }
    users.push({ username, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Initialize user data
    const data = storage.getAllData();
    data[username] = { income: 0, expenses: [] };
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  },
  
  login: (username, password) => {
    const users = storage.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    localStorage.setItem(CURRENT_USER_KEY, username);
    return username;
  },
  
  logout: () => {
    localStorage.removeItem(CURRENT_USER_KEY);
  },
  
  getCurrentUser: () => {
    return localStorage.getItem(CURRENT_USER_KEY);
  },

  // Data mapping
  getAllData: () => JSON.parse(localStorage.getItem(DATA_KEY) || '{}'),
  
  getUserData: (username) => {
    const data = storage.getAllData();
    return data[username] || { income: 0, expenses: [] };
  },

  saveUserData: (username, userData) => {
    const data = storage.getAllData();
    data[username] = userData;
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
  },

  // Income & Expenses
  updateIncome: (amount) => {
    const username = storage.getCurrentUser();
    if (!username) return;
    const userData = storage.getUserData(username);
    userData.income = amount;
    storage.saveUserData(username, userData);
  },

  addExpense: (expense) => {
    const username = storage.getCurrentUser();
    if (!username) return;
    const userData = storage.getUserData(username);
    userData.expenses.push({ 
      id: Date.now().toString(), 
      ...expense,
      date: new Date().toISOString()
    });
    storage.saveUserData(username, userData);
  },

  deleteExpense: (id) => {
    const username = storage.getCurrentUser();
    if (!username) return;
    const userData = storage.getUserData(username);
    userData.expenses = userData.expenses.filter(e => e.id !== id);
    storage.saveUserData(username, userData);
  }
};
