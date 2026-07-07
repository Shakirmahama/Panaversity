# Personal Expense Tracker

A sleek, purely frontend expense tracking application built securely with React and Vite. Say goodbye to backend setups—this app utilizes your browser's persistent LocalStorage for complete offline functionality mapped automatically to a JSON-like structure.

## Features
- **Frontend-Only Authentication**: Create an account, log in, and securely track your personal sessions directly through local state logic.
- **Glassmorphic Aesthetic**: A cutting-edge dark-glass theme styled entirely via vanilla CSS (no bloaty frameworks).
- **Comprehensive Dashboard**: Auto-calculated summaries of absolute income, month-to-date burns, and net remaining balances seamlessly updating as you go.
- **Dynamic Transaction Control**: Register expenses into discrete categories (Housing, Utilities, Food) effortlessly.

## Technology Stack
- React
- Vite
- purely Vanilla JS/CSS (No Tailwind)
- lucide-react (Premium iconography)

## Getting Started
To get the application up and running locally:

**1. Clone/Download the repository**  
Save the folder to your local machine.

**2. Install dependencies**  
Open a terminal in the project directory and run:
```bash
npm install
```

**3. Run the development server**
```bash
npm run dev
```

**4. Start Tracking!**  
Open `http://localhost:5173/` in your browser. Since it runs completely locally using `localStorage`, you can create a test user right from the sign in panel and start submitting expenditures.

## Architecture
All states mimicking JSON database calls reside in `src/storage.js`. Because true frontend applications cannot execute node streams to overwrite local hard-drive `.json` databases securely, the service simulates backend reads and writes using the `localStorage` web API safely sandboxed in your browser.
