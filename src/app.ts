import { Hono } from 'hono';
import type { Serve } from 'bun';
import { zValidator } from '@hono/zod-validator';
import { createBunWebSocket, serveStatic } from 'hono/bun';

import { type Body, body } from './schema';
import { Home, NewPopup, Entries } from './components';

export const factory = (port: number): Serve<any> => {
  const entries: Body[] = [];

  const { upgradeWebSocket, websocket } = createBunWebSocket();
  const app = new Hono();

  app.get('/', async (c) => c.html(Home));
  app.get('/ok', async (c) => c.text('OK'));

  app.get('/new', async (c) => c.html(NewPopup));
  app.post('/new', zValidator('form', body), async (c) => {
    entries.push(c.req.valid('form'));
    return c.text('OK');
  });

  app.use("/assets/*", serveStatic({
    root: "./assets",
    rewriteRequestPath: (path) => path.replace(/^\/assets/, ''),
    onFound: (_path, c) => c.header('Cache-Control', 'max-age=3600')
    ,
  }));

  app.get(
    '/ws',
    upgradeWebSocket((c) => {
      let intervalId: Timer;
      return {
        onOpen(_event, ws) {
          intervalId = setInterval(() => {
            ws.send(Entries(entries).toString());
          }, 500);
        },
        onMessage(event, ws) {
          console.log(event.data);
        },
        onClose() {
          clearInterval(intervalId);
        },
      };
    }),
  );

  return {
    fetch: app.fetch,
    websocket,
    port,
  };
};
