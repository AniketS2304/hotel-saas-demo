# Current Session & Project State

This file tracks the current state, progress milestone, technical debt, and next steps for **HotelOS**. AI agents must update this document at the end of every task execution.

---

## 1. Current Objective
Create permanent documentation guidelines, technical blueprints, and custom rules to establish the repository as a self-sufficient single source of truth for subsequent development.

---

## 2. Current Milestone
- **Milestone 3 (Documentation & Architecture Sync)**: Transition the codebase to be fully self-contained, data-driven, and B2B ready. Ensure compilation, screenshots, and sales deck PDF compilation are verified.

---

## 3. Feature Matrix Status

### Completed Features (High-Fidelity)
- **Marketing Website**: Premium landing sections, booking forms, and dynamic gallery lightboxes.
- **Customer QR Ordering**: Welcome screens, searchable menu categories, customize food, smart shopping cart, coupons checkout, and live order status.
- **Kitchen Display System**: Dark theme dashboard with order cards, prep countdown timers, and chef bump features.
- **Staff FLOOR POS**: 20-table visual floor map with waiter calls and UPI/Cash billing checkouts.
- **Owner Admin Dashboards**: KPI stats, Recharts reporting, menu managers, customer list, inventory counts, tables, employee duty rosters, coupon lists, loyalty tiers, WhatsApp template managers, and setup configs.
- **Sales Presentation Deck**: Landscape PDF (`HotelOS_Sales_Presentation.pdf`) incorporating captured app screenshots.

### Features In Progress
- **None**: All core experiences build, link, and compile successfully.

### Pending Features (Future Roadmap)
- **Multi-Hotel Consolidation**: Enable owners to register multiple properties and toggle views in the admin suite.
- **Live WebSocket Service**: Connect mock state mutations to an active server-side socket backend.

---

## 4. Technical Debt & Notes
- **Mock State Reset**: Currently, simulated orders and revenue increments reset on full browser refresh. Context values can be persisted to local storage for persistent demo flows.
- **Playwright C-extension Support**: The Python 3.14 environment on Windows throws a DLL load error with Playwright's `greenlet` package. Screenshots were successfully automated using Puppeteer Node.js instead.

---

## 5. Recent Key Decisions
- **Vite ESM Configuration**: Updated `package.json` to `"type": "module"` and introduced standard start/build commands.
- **PostCSS @tailwindcss/postcss Upgrade**: Swapped standard tailwindcss loaders for Tailwind CSS v4 PostCSS compatibility to ensure compilation of custom layers.
- **Collapsible Sidebar Layout**: Enforced a responsive collapsible layout in the admin dashboard for visual optimization.

---

## 6. Next Recommended Task
- Establish local storage caching in `DemoContext` to allow presenters to refresh the admin dashboard during pitches without losing active order statuses and revenue data.
