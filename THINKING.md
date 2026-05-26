# System Thinking & Architecture Decisions

## Who Uses the System
The primary users of this system are **Hero Cycles Salespersons**. They need a fast, reliable, and error-proof interface to configure custom cycles for customers while standing on the showroom floor or engaging with clients over the phone. They rely on the system to provide completely accurate pricing based on the specific historical or current date, removing the need for manual reference manuals.

## Architecture Decisions
The application uses a cleanly decoupled monolithic **React Frontend** and a modular **Express Backend**.
- **Why React + Vite**: Provides a snappy, single-page application experience with near-instant hot module replacement (HMR) during development.
- **Why Node + Express Modular Architecture**: Separating concerns into `routes`, `services`, and `models` guarantees that as business logic scales (e.g., adding discount rules, taxation, etc.), the core API route files remain clean.
- **Decoupled API Contract**: The backend accepts an array of `parts` alongside a specific `date`. The backend holds all the domain knowledge about price aggregation and grouping. The frontend remains "dumb" to business logic, only handling view-layer concerns.

## Data Model
Since the project constraints forbid the use of a relational database, the data model relies on a static JSON array inside `backend/src/data/pricing.json`.

The core entities are:
1. **Part**: Represents a physical component (e.g., `tubeless_tyre`). It contains its category (e.g., `Wheels`) and its `priceHistory`.
2. **PriceEntry**: Embedded within the Part's `priceHistory`. It dictates what the price of the part is during a specific time period using `validFrom` and `validUntil`.

This structure allows the system to easily iterate over a single part and fetch the specific `PriceEntry` that overlaps with the user's requested date.

## Pricing Strategy
The pricing engine acts dynamically:
- When a POST request arrives at `/calculate-price`, it iterates over every requested `Part ID`.
- It finds the matching `PriceEntry` for the provided date.
- It dynamically aggregates these prices into their top-level categories (e.g., summing Rim + Tyre + Spokes into the `Wheels` bucket).
- It calculates the grand total safely server-side, preventing frontend manipulation of prices.

## Edge Cases Handled
- **Missing Dates**: The API gracefully throws a 400 error if the date or parts array is omitted.
- **Null `validUntil` boundaries**: If a component's current price is indefinitely valid, `validUntil` is set to `null`. The backend engine understands that `null` implies no upper bound on the date range.
- **Invalid parts**: If the frontend sends an unrecognized part ID, the backend safely skips it without crashing the calculation.
