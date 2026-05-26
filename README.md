# Hero Cycle Pricing Engine

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)](README.md)

A full‑stack application for Hero Cycles that allows salespersons to configure cycle components and instantly get historical time‑sensitive pricing information.

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React, Vite, Tailwind CSS |
| **Backend** | Node.js, Express |
| **Data Storage** | Local JSON files (no database) |
| **Testing** | Jest, Supertest |

## Features

- Configure cycle parts and view price breakdown.
- Save configuration with instant visual feedback.
- Dark‑mode support with glass‑morphism UI.
- Time‑sensitive pricing based on historical data.

## Setup Instructions

### Prerequisites

- Node.js **v18** or higher.

### Backend

```bash
cd backend
npm install
node src/index.js   # runs on http://localhost:5001
```

### Frontend

```bash
cd frontend
npm install
npm run dev         # runs on http://localhost:5173
```

### Running Tests

```bash
cd backend
npm test
```

## Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request.

## License

This project is licensed under the MIT License.
