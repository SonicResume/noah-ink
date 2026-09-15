# Noah Ink

Noa Ink is an AI-powered writing and content transformation workspace designed to turn rough, incomplete, or unpolished text into finished copy.

## What It Does

Noa Ink provides six specialized content engines:
Use Case: Legal Assistant, Real Estate Listing, Professional Email, Career Tools, Social Media Content, Marketing Strategy, Ad Copy, Customer Support, Flowcharts & Checklists, Comparisons, Video Reviews & Testimonials, Listicles, Seasonal Content, Case Studies & Use Cases, eBooks & Whitepapers, Collaborations & Partnerships, Quote Cards
Tools: Optimize, Expand, Shorten, Fix, Style, Translate
Source Text
Generate Optimization
Optimized Result

### Writing Transformations

Users can:

* Rewrite and improve existing text
* Expand short or incomplete content
* Shorten and summarize
* Correct grammar
* Adjust tone
* Translate content into another language

## Workspace

The main dashboard lets users:

1. Enter or paste source text.
2. Select a content type.
3. Select a transformation.
4. Choose a tone or language when applicable.
5. Generate the transformed content.
6. Copy or download the result.

Supported text-file input includes `.txt` and `.md` files.

The workspace accepts up to 10,000 characters of source text.

## Technology

### Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* Firebase Authentication
* Lucide React

### Backend / Services

The project contains backend service code and integrations for:

* AI processing
* Stripe
* Email delivery
* SQLite
* File processing
* Firebase

The production application connects to its deployed API through the `VITE_API_URL` environment variable.

## Local Development

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the project checks:

```bash
npm run check
```

## Environment Variables

Environment files containing secrets or deployment-specific configuration are intentionally excluded from Git.

Do not commit API keys, Stripe secrets, Firebase service credentials, or other private credentials.

For the frontend, configure:

```text
VITE_API_URL=
```

The deployed environment should provide the appropriate production API URL.

## Runtime Data

Local runtime data such as the user database and generated runtime user data are excluded from Git.

This keeps user-specific data and local state out of the source repository while allowing the application to create its required runtime storage.

## Production Checklist

Before deploying a commercial instance:

* Configure production environment variables.
* Configure Firebase Authentication.
* Configure Stripe products and prices.
* Configure the deployed API URL.
* Configure email delivery.
* Verify AI provider credentials.
* Verify API rate limiting.
* Test authentication and account flows.
* Test Stripe checkout and subscription flows.
* Test file upload and content generation.
* Verify production error handling.
* Confirm no secrets are committed to Git.

## License

MIT
