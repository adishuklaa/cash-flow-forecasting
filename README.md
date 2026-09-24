# Cash Flow Forecasting Prototype

## Product Overview
An interactive cash-flow forecasting application built with React, TypeScript, and Tailwind CSS. It empowers users to visualize their projected financial runway over 90 days, integrating recurring incomes, expenses, and one-off expenditures. The unique value proposition is the interactive "what-if" scenario modeling, allowing users to toggle specific transactions and adjust macroscopic multipliers to simulate optimistic and conservative market conditions.

## Why I Built This
Cash flow is the lifeblood of both individual households and small businesses. Existing tools either offer static, retrospective views (like standard budgeting apps) or are too complex (enterprise ERPs). I built this to bridge the gap: a forward-looking, highly interactive simulation tool that instantly answers questions like "What if I lose this client?" or "Can I afford to buy this laptop next week without my balance dropping below $1,000?"

## Problem Statement
Users lack a simple, interactive way to project their future bank balance based on current recurring transactions and one-time planned expenses. It is difficult to visualize the compounding impact of minor financial changes (like a 10% rent increase or canceling a subscription) over a 3-month horizon.

## Target Users
1. **Freelancers / Solopreneurs**: Managing irregular income and fixed monthly SaaS expenses.
2. **Small Business Owners**: Need to ensure they have enough runway to make payroll in 60 days.
3. **Proactive Personal Finance Managers**: Individuals planning major purchases while maintaining a safety buffer.

## User Personas
- **Alex, the Freelancer**: Has variable monthly income but fixed costs. Needs to know if taking a month off will dip their balance below the comfort zone.
- **Sam, the Startup Founder**: Needs to quickly model a "conservative" scenario where revenue drops by 20% to see when they would run out of cash.

## Product Goals
- Provide a clear, visual 90-day trajectory of cash balance.
- Enable instantaneous "what-if" scenario testing without changing core data.
- Alert the user when their projected balance drops below a critical threshold.

## Hypothesis
If users can visually and interactively toggle their financial inputs on a timeline, they will make more confident financial decisions and avoid accidental overdrafts.

## Key Features
- **Transaction Management**: View recurring and one-time incomes/expenses.
- **Forecast Chart**: 90-day interactive line chart projecting daily balances.
- **Scenario Simulation**: Pre-built (Optimistic, Conservative) and Custom (Multiplier-based) scenarios.
- **Interactive Toggles**: Turn specific transactions on/off to see immediate impact on the forecast.
- **Low-Balance Alerts**: Automated warnings if the projected balance dips below a user-defined threshold.

## User Journey
1. **Onboarding**: User lands on the dashboard populated with current balance and active transactions.
2. **Analysis**: User reviews the 90-day projection chart to ensure healthy runway.
3. **Simulation**: User tests scenarios—clicks "Conservative Case" or toggles off "Side Hustle" income.
4. **Insight**: The chart instantly updates, and an alert may appear indicating a cash flow crisis on Day 45.
5. **Action**: User decides to delay the "New Laptop" purchase to maintain their safety net.

## Workflow
State -> Custom Hook (Calculates Daily Deltas) -> Array of Data Points -> Recharts Engine -> Dashboard UI.

## Requirements
- Render a responsive 90-day line chart.
- Calculate daily balances considering weekly, monthly, and yearly recurrences.
- Support real-time recalculation upon state changes.
- Provide clear visual indicators for alerts and warnings.

## User Stories
- As a user, I want to see my projected balance over the next 90 days so I can plan my finances.
- As a user, I want to disable a specific expense to see how much money I'd save.
- As a user, I want to simulate a 10% drop in income to prepare for worst-case scenarios.
- As a user, I want to be warned if my balance will drop below $1,000 at any point.

## Acceptance Criteria
- Chart must update in <100ms when a transaction is toggled.
- "Optimistic" scenario must increase income by 10% and decrease expenses by 10%.
- "Conservative" scenario must decrease income by 10% and increase expenses by 10%.
- A red alert box must appear if the minimum balance in the 90-day array is < $1,000.
- All forecasts must be explicitly labeled as simulated estimates.

## Tradeoffs
- **Client-Side Calculation**: For a 90-day forecast with a dozen transactions, client-side is fast and avoids server round-trips. For a multi-year forecast with thousands of entries, this would need to move to a backend service or use Web Workers.
- **Simplified Recurrence**: Currently, "monthly" is simplified to matching the day of the month. More complex rules (e.g., "last Friday of the month") are excluded for the MVP.

## AI/Automation Approach
- Currently entirely deterministic. Future iterations could use machine learning to predict variable income based on historical bank feeds, automatically suggesting customized "Conservative" multipliers based on past volatility.

## Data/Assumptions
- **Base Date**: Today's date is used as day 0.
- **Initial Balance**: Hardcoded to $3,500 for the prototype.
- **Synthetic Data**: Uses mock transactions to demonstrate capability without needing actual Plaid integration.

## Architecture
- **React Frontend**: Single Page Application (SPA).
- **Custom Hooks (`useCashFlow`)**: Encapsulates all business logic, daily iterations, and scenario application.
- **Recharts**: For SVG-based, responsive charting.
- **Tailwind CSS**: For utility-first, rapid UI styling.

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Recharts (Charting)
- Lucide React (Icons)
- date-fns (Date manipulation)

## UX Decisions
- **Dark Mode Default**: Provides a modern, "fintech dashboard" aesthetic that highlights the chart colors.
- **Immediate Feedback**: Toggling a transaction grays it out and instantly redraws the chart, establishing a strong cause-and-effect mental model.
- **Prominent Alert**: The low-balance alert sits above the fold, ensuring it's never missed.

## KPI Framework
- **Engagement**: Average time spent interacting with scenario toggles per session.
- **Utility**: Percentage of users who utilize the "Custom Simulation" sliders vs. pre-sets.
- **Retention**: Weekly active users returning to check their updated runway.

## MVP
The current state of the repository represents the MVP. It successfully demonstrates the core value proposition (interactive forecasting and scenario planning) using synthetic data without backend dependencies.

## Roadmap
- **Phase 1 (Current)**: Interactive client-side simulation with synthetic data.
- **Phase 2**: Allow users to CRUD their own transactions and persist to LocalStorage.
- **Phase 3**: Backend integration for persisting user profiles and Plaid API integration for live bank syncing.
- **Phase 4**: AI-driven cash flow insights and anomaly detection.

## Future Opportunities
- **Goal Tracking**: Integrate specific savings goals into the timeline.
- **Multiple Accounts**: Aggregate cash flows across checking, savings, and credit cards.

## Screenshots
*(Screenshots will be added by the parent agent to the `screenshots/` directory)*
- `screenshots/dashboard.png`

## Getting Started

### Environment Variables
No environment variables are required for this MVP prototype.

### Running Locally

```bash
git clone https://github.com/adishuklaa/cash-flow-forecasting.git
cd cash-flow-forecasting
npm install
npm run dev
```

### Project Structure
- `/src/components`: React UI components (Dashboard, ForecastChart).
- `/src/hooks`: Business logic and state management (`useCashFlow`).
- `/src/types`: TypeScript interfaces.
- `/src/data`: Mock initial state and constants.

## Limitations
- Projections are simplified estimates and do not account for leap years, exact banking holidays, or complex conditional recurrences.

## Future Improvements
- Add robust date-math library for precise financial scheduling.
- Implement a backend (Node/Express or Next.js API routes) to persist user scenarios.
