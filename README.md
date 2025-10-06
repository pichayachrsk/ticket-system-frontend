## Getting Started

First,

```bash
npm install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## API base URL

The app expects an endpoint available at the following endpoints:

- GET  /tickets - To display all tickets
- GET  /tickets/:id - To display ticket detail by params id
- POST /tickets - To create ticket

In development you can set `NEXT_PUBLIC_API_HOST` in a `.env.local` file to point to a remote API (for example `http://localhost:3001`). If unset, the app will call relative paths like.
