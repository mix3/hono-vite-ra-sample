import { Hono } from 'hono';
import { renderToString } from 'react-dom/server';
import { getRoles } from './role';

const app = new Hono();

app.get('/', async (c) => {
  return c.html(
    renderToString(
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vite + React + TS</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          EMBED:ROLES
          {import.meta.env.PROD ? (
            <script type="module" src="/static/main.js"></script>
          ) : (
            <script type="module" src="/src/main.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>,
    ).replace(
      'EMBED:ROLES',
      `<script type="module">window.roles = ${JSON.stringify(getRoles(c.req.header()['x-authenticated-user'] ?? (import.meta.env.PROD ? '' : 'dummy@hoge.com')))};</script>`,
    ),
  );
});

export default app;
