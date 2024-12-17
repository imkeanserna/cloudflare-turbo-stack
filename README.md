# 🚀 Full-Stack Turborepo Cloudflare SaaS Kit

### <i>Build and deploy monorepo scalable products on Cloudflare with ease.</i>

An opinionated, batteries-included starter kit for quickly building and deploying SaaS products using [Turborepo](https://turbo.build/), [Next.js](https://nextjs.org/), and [Hono](https://hono.dev/) for the backend. This setup leverages Cloudflare Workers for hosting, [Prisma Accelerate Edge](https://www.prisma.io/accelerate) for database access, and integrates a modern UI with [ShadcnUI](https://ui.shadcn.com/).

This is the stack powering next-gen SaaS solutions, optimized for both performance and scalability.

## Stack Includes:
- [Turborepo](https://turbo.build/) for monorepo management
- [Next.js](https://nextjs.org/) for frontend
- [Hono](https://hono.dev/) for serverless backend (Cloudflare Workers)
- [Prisma Accelerate Edge](https://www.prisma.io/accelerate) for database access
- [Cloudflare Workers](https://workers.cloudflare.com/) for hosting the backend
- [ShadcnUI](https://ui.shadcn.com/) as the component library
- [TailwindCSS](https://tailwindcss.com/) for styling
- [NextAuth](https://next-auth.js.org/) for authentication
- [Recoil](https://recoiljs.org/) for state management
- [Websockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) for real-time communication

## Getting Started
1. Make sure that you have [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/#installupdate-wrangler) installed. And also that you have logged in with ``wrangler login`` (You'll need a Cloudflare account)
2. Clone the repository and install dependencies:
```
git clone https://github.com/imkeanserna/cloudflare-turbo-stack.git
cd cloudflare-turbo-stack
pnpm install
```
3. Next Js
```
cd apps/web
cp .env-example .env
add vars in wrangler.toml
pnpm run db:generate
pnpm run db:migrate
pnpm run db:no-engine
pnpm run dev

// To deploy the application, run the following command:
pnpm run deploy 
```
Open http://localhost:3000
</br>
</br>
4. Hono Server
```
cd apps/hono-server
cp .dev.vars-example .dev.vars
add vars in wrangler.toml
pnpm run dev

// To deploy the application, run the following command:
pnpm run deploy 
```
Open http://localhost:8787

## Create a New App From Scratch
### 1. Create a New [Next.js App](https://developers.cloudflare.com/pages/framework-guides/nextjs/ssr/get-started/)
```
pnpm create cloudflare@latest my-next-app --framework=next
```
### 2. Create a New [Hono Server](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hono-site/)
```
pnpm dlx create-hono my-hono-server
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

## Open for Contribution 🤝
Join the community and make an impact! Whether it’s squashing bugs, adding exciting features, or polishing the documentation, your contributions are always valued and appreciated. 💡✨
