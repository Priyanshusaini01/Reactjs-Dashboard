# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# React Content Dashboard

A modern, fully responsive React dashboard for content management and SEO optimization.

## Authentication Setup

This application uses [Clerk](https://clerk.com/) for authentication. To get started with authentication:

1. Create an account on [clerk.com](https://clerk.com/)
2. Create a new application in Clerk's dashboard
3. Get your publishable key from the Clerk dashboard
4. Create a `.env.local` file in the root directory with the following content:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Replace `your_clerk_publishable_key` with the key from your Clerk dashboard.

## Running Locally

1. Install dependencies
```bash
npm install
```

2. Start the development server
```bash
npm run dev
```

3. Open your browser and navigate to the local URL shown in the terminal (typically http://localhost:5173/)

## Authentication Features

- User sign-up and sign-in
- Social login options (through Clerk)
- Protected routes
- User profile management
- Session management
