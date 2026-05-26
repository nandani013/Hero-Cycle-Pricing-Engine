# UI & UX Decisions

## UX Decisions
The interface was heavily inspired by modern, premium configurators (like Tesla's custom-order pages). 
- **Glassmorphism & Theming**: Built using Tailwind CSS, featuring a clean "slate" background with a striking "primary red" accent to match the Hero Cycles brand identity.
- **Sticky Sidebar**: The pricing summary panel is pinned to the right side of the screen on desktop displays. This allows the user to see the real-time financial impact of their choices immediately without having to scroll to the bottom of the page.
- **Category Grouping**: Dropdowns are grouped into logical, distinct cards (Frame, Brakes, Wheels, etc.) reducing cognitive load.

## Repetitive Salesperson Usage Optimization
Salespeople will use this tool hundreds of times a week. Optimizations include:
- **Zero Page Reloads**: As a React SPA, the user never waits for the page to navigate or reload. 
- **Native Selectors**: Utilizing native `<select>` dropdowns ensures maximum compatibility, keyboard-navigation support (tabbing through fields quickly), and native mobile-picker interfaces.
- **Real-time Price Updates**: A `useEffect` hook listens to any change in component selection or date selection and automatically fetches the updated price. There is no manual "Calculate" button to press.

## Invalid Combination Handling
The system includes a dedicated validation engine inside the frontend `App.jsx` React state.
- **Tubeless Tyre Rule**: If a user selects a "Tubeless Tyre", but leaves the Rim set to "Standard Rim", the system detects the incompatible combination.
- **Graceful Degradation**: Instead of crashing or showing a popup alert, a contextual red warning box appears directly underneath the invalid section explaining the error. Furthermore, the "Save Configuration" button is disabled and visually muted until the user fixes the conflict, preventing bad data from entering downstream systems.

## Future Improvements
1. **Caching**: Implementing React Query or SWR on the frontend to cache identical historical pricing queries.
2. **Visual Assets**: Adding dynamic image renders of the bicycle that update in real-time as components are changed (e.g., swapping to a fat tyre updates the image).
3. **Save/Load Configurations**: Allowing a salesperson to generate a unique link or PDF quote to email directly to the customer based on their specific configuration.
