NutriAI backend
=================

Small Express backend to proxy requests to OpenAI for meal plan & exercise generation. This keeps your API key off the client.

Setup
-----

1. Copy `.env.example` to `.env` and set `OPENAI_API_KEY`.
	- To use Anthropic Claude Sonnet 3.5 instead, set `ANTHROPIC_API_KEY` in the `.env` file. The server will prefer Anthropic when its key is present. You can set `ANTHROPIC_MODEL` to override the model name (default: `claude-sonnet-3.5`).
2. Install dependencies and start the server:

```pwsh
cd server
npm install
npm start
```

By default the server listens on port 5000. In development you can run the React app (port 3000) and this server (5000). The frontend `aiClient` will POST to `/api/generate-meal-plan` (relative path). To use the server in development you can add a proxy in the React app's package.json:

```json
"proxy": "http://localhost:5000"
```

Security & notes
----------------
- Do not commit your `.env` file.
- For production, host the server on a secure environment (Heroku, Vercel serverless function, AWS, etc.) and ensure HTTPS.
- The server will return a deterministic stub when `OPENAI_API_KEY` is not set.
 - If `ANTHROPIC_API_KEY` is set the server will try Anthropic Claude Sonnet 3.5 (or the model set in `ANTHROPIC_MODEL`). If no provider responds, the server falls back to a safe stub response.
