# Hypermid API Playground

Interactive API explorer for the [Hypermid Partner API](https://api.hypermid.io). Test endpoints, view responses, and generate cURL commands — all from the browser.

## Quick Start

**Option 1 — Just open it:**

```
open index.html
```

**Option 2 — Serve locally:**

```
npx serve
```

Then visit `http://localhost:3000`.

## Features

- Dark-themed interactive API explorer
- All Hypermid API endpoints grouped by category (Core Swap, Execute, On-Ramp, Partner, Webhooks, Health)
- Auto-populated form fields for each endpoint
- "Load Example" prefills realistic values
- Syntax-highlighted JSON response viewer
- HTTP status code with color coding
- Response time measurement
- cURL command generator
- API key management (persisted in localStorage)
- Request history (last 10 requests, click to replay)
- Keyboard shortcut: Ctrl+Enter to send
- Fully responsive — works on mobile
- Zero dependencies — vanilla HTML/CSS/JS

## Screenshot

<!-- Add a screenshot here -->

## API Documentation

Full API docs: [https://docs.hypermid.io](https://docs.hypermid.io)

## Tech Stack

- Vanilla HTML, CSS, JavaScript
- No build step, no npm install needed
- Fetch API for HTTP requests
- localStorage for API key and history persistence
