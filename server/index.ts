import { routes } from './routes'
import * as next from 'next';
import * as fastify from 'fastify';
import { join } from 'path';

import health from './actuator/health';

const port = parseInt(process.env.PORT as string) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: join(__dirname, '..') });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = fastify({
    ignoreTrailingSlash: true,
    logger: true,
  });

  server.get('/actuator/health', health);

  server.get('/*', (req, res: any) => {
    handle(req.req, res.res);
  });

  server.listen(port, '0.0.0.0', (err) => {
    if (err) {
      throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
  });
});
