# Neon PostgREST API Demo

Are you using/considering [Neon](https://neon.tech) (or your own hosted Postgres) - but wish you had the ability to interact with your database via API/SDK like Supabase? Look no further! This project shows you exactly how to recreate the Supabase API and developer experience. [Try the Demo](https://neon-postgrest.zuplopreview.net/).

## Installation

This is just a template so you can clone this repository directly and run it yourself.

First, create a `.env` file and populate `DATABASE_URL` with your Neon database URL. You can find this on the Quickstart tab on the Neon console, under Postgres. Once you have that, proceed to installation. `NEXT_PUBLIC_API_URL` will be set to `http://localhost:3000` if you're running locally. In production, set it to either your gateway URL or directly to your vercel public URL (if you don't want protection).

```bash
npm install
```

```bash
npm run dev
```

## How It Works

![img](./public/diagram.png)

PostgREST requests are sent from the front-end to a catch-all route which invokes a serverless function. That function translates the request into a SQL query and executes it against your Neon database. The results are returned as a JSON.

NOTE: I wouldn't recommend actually performing SQL queries from your front-end - I bundled this together for demonstration purposes. You are essentially providing a door for malicious actors to interact with your database from your front-end. Instead, I would host the PostgREST API in a separate project (and protected behind a gateway), and call it from CRUD RESTful serverless functions on this project. Alternatively, I think you can implement stuff like row-level security and anon keys to make this method more secure, which is what Supabase does.

## Tools

I used the following tools:

1. NextJS Serverless Functions for easy Typescript setup + fast runtime (Cloudflare Workers will also work).
2. Vercel to simplify deployment (you can use Cloudflare pages too).
3. [`@supabase/postgrest-js`](https://www.npmjs.com/package/@supabase/postgrest-js) to construct queries using a Supabase-like SDK. This sends PostgREST requests to your serverless function.
4. [`@subzerocloud/nodejs`](https://www.npmjs.com/package/@subzerocloud/nodejs) to translate the PostgREST requests into Postgres queries.
5. [`@neondatabase/serverless`](https://www.npmjs.com/package/@neondatabase/serverless) for querying your Neon database.
6. (optional) [Zuplo API Gateway](https://zuplo.com) to proxy your serverless function. Good place to add caching, rate limiting, DDOS/bot protection, etc so this doesn't blow up in production. You can find the gateway code [here](https://github.com/zuplo-samples/neon-postgrest-proxy).

## Why Not Use the App Directory?

I tried for several days to get the `app` directory working for the serverless function but Vercel has wayyy too many unaddressed bugs with bundling wasm (which Subzero needs) and standalone builds for me to keep banging my head on it. I included a sample file for what your code would look like if using the app directory.

Created with ❤️ by [Zuplo](https://zuplo.com).
