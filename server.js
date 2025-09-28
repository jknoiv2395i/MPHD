import http from 'http';
import fs from 'fs';
import path from 'path';
import url from 'url';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');
const port = 3000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8'
};

function safeResolve(base, target) {
  try {
    const cleaned = decodeURIComponent(String(target || ''))
      .replace(/^\\+/, '')
      .replace(/^\/+/, '')
      .replace(/^(?:\.{2}[\/\\])+/, '');
    const resolvedPath = path.normalize(path.join(base, cleaned));
    if (!resolvedPath.startsWith(base)) return null;
    return resolvedPath;
  } catch (_) {
    return null;
  }
}

function serveFile(filePath, res, statusCode = 200) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error');
      }
      return;
    }
    res.writeHead(statusCode, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname || '/';

  if (pathname === '/') {
    return serveFile(path.join(publicDir, 'index.html'), res, 200);
  }

  const filePath = safeResolve(publicDir, pathname);
  if (!filePath) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('400 Bad Request');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // SPA-style fallback to index.html for unknown routes
        return serveFile(path.join(publicDir, 'index.html'), res, 200);
      }
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('500 Internal Server Error');
    }

    if (stats.isDirectory()) {
      return serveFile(path.join(filePath, 'index.html'), res, 200);
    }

    serveFile(filePath, res, 200);
  });
});

server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${port}/`);
});
