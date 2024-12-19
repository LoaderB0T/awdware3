import * as crypto from 'crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import helmet from 'helmet';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': ["'unsafe-inline' 'self' *.fontawesome.com *.awdware.de *.awdtest.de"],
        'script-src-attr': ["'unsafe-inline'"],
        'default-src': ["'self' *.fontawesome.com *.awdware.de *.awdtest.de"],
      },
    },
  })
);

const angularApp = new AngularNodeAppEngine();

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

type CacheEntry = {
  user: string;
  repo: string;
  data: any;
  timestamp: number;
};

const githubCache: CacheEntry[] = [];

if (existsSync('.github-cache.json')) {
  const cacheStr = readFileSync('.github-cache.json', 'utf-8');
  const cache = JSON.parse(cacheStr) as CacheEntry[];
  githubCache.push(...cache);
}

app.use((_req, res, next) => {
  // Asynchronously generate a unique nonce for each request.
  crypto.randomBytes(32, (err, randomBytes) => {
    if (err) {
      // If there was a problem, bail.
      next(err);
    } else {
      // Save the nonce, as a hex string, to `res.locals` for later.
      res.locals['cspNonce'] = randomBytes.toString('hex');
      next();
    }
  });
});

app.get('/api/github/:user/:repo', async (req, res) => {
  const { user, repo } = req.params;

  // GitHub API has a limit of 60 requests per hour, so we need to cache the results for an hour
  const cacheEntry = githubCache.find(entry => entry.user === user && entry.repo === repo);
  if (cacheEntry) {
    if (Date.now() - cacheEntry.timestamp < 1000 * 60 * 60) {
      return res.json(cacheEntry.data);
    } else {
      githubCache.splice(githubCache.indexOf(cacheEntry), 1);
    }
  }

  const url = `https://api.github.com/repos/${user}/${repo}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from GitHub' });
    return null;
  }

  if (!response || !response.ok) {
    res.status(500).json({ error: 'Failed to fetch data from GitHub' });
    return;
  }
  const json = await response.json();
  githubCache.push({ user, repo, data: json, timestamp: Date.now() });
  writeFileSync('.github-cache.json', JSON.stringify(githubCache, null, 2));
  res.json(json);
  return;
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  })
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then(response => (response ? writeResponseToNodeResponse(response, res) : next()))
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
