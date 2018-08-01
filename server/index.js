import express from 'express';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import logger from './services/logger';

(async () => {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', true);
  app.use(express.json({
    limit: '20mb',
  }))
    .use(morgan(':method :url :status - :response-time ms', {
      skip: (req, res) => res.statusCode < 400, stream: process.stderr,
    }))
    .use(morgan(':method :url :status - :response-time ms', {
      skip: (req, res) => res.statusCode >= 400, stream: process.stdout,
    }))
    .use(express.static(path.join(process.cwd(), './public'), {
      maxAge: (60 * 60 * 24 * 7) * 1000,
    }));

  const router = new express.Router();
  router.get('/', (req, res) => {
    res.redirect('/index.html');
  });

  app.use(router);

  const httpServer = http.createServer(app);

  httpServer.listen(process.env.PORT || 3000, () => {
    logger.info(`Express HTTP server started: ${JSON.stringify(httpServer.address())}`);
  });
})();
