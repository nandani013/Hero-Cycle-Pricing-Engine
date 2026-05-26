# Hero Cycle Pricing Engine

A full-stack application for Hero Cycles that allows salespersons to configure cycle components and instantly get historical time-sensitive pricing information.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Data Storage**: Local JSON files (No Database)
- **Testing**: Jest, Supertest

## Setup Instructions

Ensure you have Node.js (v18 or higher) installed on your system.

1. Clone or download the repository.
2. Open your terminal in the root directory.

### Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   node src/index.js
   ```
   *The backend will run on http://localhost:5001*

### Running the Frontend

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on the localhost link provided in your terminal (usually http://localhost:5173)*

### Running Tests

The backend includes a comprehensive Jest test suite to verify the time-sensitive historical pricing logic.

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Run the tests:
   ```bash
   npm test
   ```
