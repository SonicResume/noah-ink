# Noa Ink

Noa Ink is an AI-powered writing workspace for turning rough, messy, or incomplete text into polished, usable copy.

## What it does

Noa Ink provides six focused content engines from one dashboard:

- Career Matrix — resumes, cover letters, and professional histories
- Email Protocol — professional emails, pitches, and corporate communications
- Legal Scope — objective legal-style arguments, notices, and policy summaries
- Product Block — product descriptions, landing-page copy, and advertising hooks
- Property Frame — polished real-estate listing copy
- Social Vault — social hooks, structured posts, and hashtag-ready content

Each engine supports:

- Rewrite / improve
- Expand
- Shorten / summarize
- Grammar correction
- Tone adjustment
- Translation

## Workspace

Users can enter or paste source text, select a content type and transformation, choose a tone or language when applicable, generate a result, then copy or download it.

Text and Markdown file input are also supported.

## Technology

- React
- Vite
- TypeScript
- Node.js
- Express
- AI processing
- Firebase Authentication
- Stripe subscriptions
- SQLite / better-sqlite3
- Tailwind CSS
- Lucide React

## Local development

Install frontend dependencies:

    npm install

Start the frontend:

    npm run dev

Install backend dependencies:

    cd backend
    npm install

Start the backend:

    npm start

## Production build

From the project root:

    npm run build

## Environment variables

Secrets and environment-specific configuration belong in .env files and must not be committed.

## Runtime data

User databases and runtime user data are intentionally excluded from Git. The backend initializes its SQLite database automatically when required.

## Commercial deployment

Before production release:

- Configure production API URLs.
- Configure production Firebase authentication.
- Configure Stripe production products and checkout settings.
- Configure production AI credentials securely.
- Configure email delivery credentials.
- Review legal, privacy, and terms pages.
- Verify authentication and authorization flows.
- Run the production build and deployment checks.

## License

MIT License
