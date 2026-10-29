# Government Policy Assistant

A React and Vite chat interface for questions about government schemes, eligibility, benefits, and applications.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Backend

The UI sends a `GET` request to `VITE_API_URL` (defaults to `https://policy-assistant-backed-1.onrender.com/response`) with the question in the `query` URL parameter. Questions must be 2–300 characters:

```text
https://policy-assistant-backed-1.onrender.com/response?query=your%20question
```

The backend may return a Markdown/plain-text answer, a JSON-encoded string, or a JSON response. Markdown tables are converted into numbered entries with labeled bullet points; headings, lists, and links are rendered in the chat:

```json
{ "answer": "Markdown response" }
```

Copy `.env.example` to `.env.local` to configure the endpoint. If using FastAPI, enable CORS for the Vite development origin.
